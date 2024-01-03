const { ObjectId } = require('mongodb');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const OtId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const helpers= require('../utils/helpers')

const saltRounds = 10;
let dbpassword = '';
let flag = true;


async function getusers() {
    try {
        const data = await User.find({role:'User'});
        console.log(data,"data");
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
        return `Could not fetch data ${error}`;
    }
}
async function getuserbyId(id) {
    try {
      
        const data = await User.findById({ "_id": new OtId(id) });
        console.log(data);
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}

async function searchuser(search) {
    console.log(typeof (search));
    try {
        const data = await User.find({ "uname": search });
        return data;
    } catch (error) {
        console.log(`Could not fetch data ${error}`)
    }
}

async function createusers(data) {
    try {
       
        const check = await User.find({ email: data.email })
        console.log(data,"datatta");
        if (data.role === 'Superadmin') {
            const rolecheck = await User.find({ role: data.role })
            if (rolecheck.length > 0) {
                flag = false;
            } else {
                flag = true
            }
        }

        if (check.length > 0 && flag) {
            return "User already Exists";
        } else if (flag) {
            bcrypt.hash(data.password, saltRounds, async function (err, hash) {
                dbpassword = hash;
                const Userdetails = User({
                    uname: data.uname,
                    email: data.email,
                    contact: data.contact,
                    password: dbpassword,
                    role: data.role
                })

                const result = await Userdetails.save();
                console.log("result>>>>>>>>>.", result)

            });
            return check;
        }
        else {
            return `${data.role}  created`;
        }



    } catch (err) {
        console.error(err);
    }
}

async function update(data,id) {
    try {
        // const id = helpers(req);
        // console.log(id,"iddddddd");
        var hash = bcrypt.hashSync(data.password, saltRounds);  
        const results = await User.updateOne({ "_id": id }, {
            $set: {
                uname: data.uname,
                email: data.email,
                contact: data.contact,
                password: hash
            }
        })
        return results;
    } catch (err) {
        console.error(err);
        return err;
    }
}

async function loginguser(logs) {
    try {
        const loginData = await User.find({ email: logs.email })
        console.log(loginData);
        if (loginData.length>0) {
            const userPassword = loginData[0].password;
            const role = loginData[0].role;
            const response = await bcrypt.compare(logs.password, userPassword);
            if (response) {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                const token = jwt.sign(loginData[0].toJSON(), jwtSecretKey);
                return {token,role};
            } else {
                return 'Password does not match'
            }
        } else {
            return 'Email already exists'
        }
    } catch (error) {
        return `Could not fetch data ${error}`;
    }

}

async function deletebyId(id) {
    console.log(typeof (id));
    try {
        const data = await User.deleteOne({ "_id": new OtId(id) });
        console.log(data);
        return data;
    } catch (error) {
        return `Could not fetch data ${error}`;
    }
}

async function pagingusers(search, page, limit) {
    var offset = (page - 1) * (limit)
    try {
        const data = await User.find({ uname: search }).skip(offset).limit(limit);
        return data;
    } catch (error) {
        return `Could not fetch data ${error}`;
    }
}



module.exports = {
    getusers,
    getuserbyId,
    createusers,
    update,
    loginguser,
    deletebyId,
    pagingusers,
    searchuser
}
