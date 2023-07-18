import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Updateform() {
    const { id } = useParams();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [errorN, setErrorN] = useState('');
    const [errorE, setErrorE] = useState('');
    const [errorC, setErrorC] = useState('');
    const [errorP, setErrorP] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getuserbyId(id);
    }, [])

    function handlecontact(event) {
        let phone = event.target.value;

        if (phone.length !== 10) {
            setErrorC(`**Invalid contact`);
            return;

        } else {
            setContact(phone);
            setErrorC(``);

            return;
        }
    }

    async function getuserbyId(id) {
        try {
            await axios.get('http://localhost:8000/userbyId?' + new URLSearchParams({
                id: id
            })).then((result) => {

                setContact(result.data.contact);
                setEmail(result.data.email);
                setName(result.data.uname);
                setPassword(result.data.password);

            })

        }
        catch (error) {
            console.log(error);
        }
    }


    async function update(event) {
        let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        event.preventDefault()

        if (username === "") {
            setErrorN('Enter Username');
        } else if (email === "") {
            setErrorE('Enter Email');
        } else if (!regemail.test(email)) {
            setErrorE('Invalid Email')
        } else if (contact.length !== 10) {
            setErrorC('Invalid Mobile Number')
        } else if (password === "") {
            setErrorP('Enter Password')
        } else {

            try {
                let config = {
                    url: 'http://localhost:8000/update',
                    method: 'POST',
                    data: {
                        "id": id,
                        "uname": username,
                        "email": email,
                        "contact": contact,
                        "password": password
                    },
                    headers: { 'Content-Type': 'application/json' }
                }
                axios.request(config).then((res) => {
                    console.log(res);
                    console.log("update");
                    navigate(`/home`)

                })
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <div className='container'>
            <div className='row' >
                <div className='col-md-3' ></div>
                <div className='col-md-6 py-5 text-center' >
                    <form name="signup" onSubmit={update} >
                        <label >Username</label><br></br>
                        <input type="text" name="username" value={username} onChange={(e) => setName(e.target.value)} />
                        <p style={{ color: "red", fontSize: "15px" }}>{errorN}</p>
                        <br></br>
                        <label>Email</label><br></br>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p style={{ color: "red", fontSize: "15px" }}>{errorE}</p>
                        <br></br>
                        <label>Contact Number</label><br></br>
                        <input type="phone" name="contact" value={contact} maxLength={10} onKeyUp={(e) => handlecontact(e)} onChange={(e) => setContact(e.target.value)} />
                        <p style={{ color: "red", fontSize: "15px" }}>{errorC}</p>
                        <br></br>
                        <label>Password</label><br></br>
                        <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p style={{ color: "red", fontSize: "15px" }}>{errorP}</p>
                        <br></br>

                        <button className='btn btn-dark' type='submit'>Update</button>

                    </form>
                </div>
                <div className='col-md-3' ></div>
            </div>
        </div>
    )
}