import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    async function logged(event) {
        let regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        event.preventDefault()
        if (email === "" || password === "") {
            setError('Enter valid Credentials')
        } else if (!regemail.test(email)) {
            setError('Invalid Email')
        } else {
            console.log(email, password)

            try {
                const a = await axios.post('http://localhost:8000/check', { email, password })
                console.log(a, "response<<<");
               
                    if (a.data==='Password does not match') {
                       setError('Password does not match');
                    }else{
                        const token = a.data.data.token;
                        const role = a.data.data.role;
                        localStorage.setItem('role',role)
                        console.log(a.data,'tokennnnnnnnnnn');
                        localStorage.setItem('token',token)
                        navigate(`/home`)
                    }

            }
            catch (error) {
                console.log(error)
            }
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div>
            <div className='row py-5 px-5'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='card-body  text-center'>
                            <div className='card-title'><b>Login</b></div>
                            <form onSubmit={logged}>
                                <label>Email</label>
                                <br></br>
                                <input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <br></br>
                                <label>Password</label>
                                <br></br>
                                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <br></br><br></br>

                                <button className='btn btn-dark' type='submit'>Log In</button>
                                <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>
                             
                                <div><h6>New User?</h6>
                                <Link to='/signup'>Signup</Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div className='col-md-4'></div>
            </div>
        </div>
    )

}
