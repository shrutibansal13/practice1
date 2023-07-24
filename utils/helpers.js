// import authenticate from "../middleware/authenticate"

module.exports=(req,res) =>{
    const userId=  req.decoded._id;

    return userId;
}