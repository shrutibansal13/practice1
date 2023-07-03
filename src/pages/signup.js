import React,{useState} from 'react';
import './signup.css';
import Login from './login';
import '../images/images.jpg';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function signup() {
    const[username,setName]= useState('');
    const[email,setEmail]= useState('');
    const[contact,setContact]= useState('');
    const[password,setPassword]= useState('');
    const[errorN,setErrorN]= useState('');
    const[errorE,setErrorE]= useState('');
    const[errorC,setErrorC]= useState('');
    const[errorP,setErrorP]= useState('');

    function handlecontact(event){
        let phone=event.target.value;
   
    if(phone.length !== 10 ){
        setErrorC(`**Invalid contact`);
        return;
       
    }else{
        setContact(phone);
        setErrorC(``);
        
        return ;
    }
    }

    function submit(event) {
        let regemail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        event.preventDefault()

        if(username ===""){
            setErrorN('Enter Username');
        }else if(email===""){
            setErrorE('Enter Email');
        }else if(!regemail.test(email)){
            setErrorE('Invalid Email')
        }else if(contact.length!==10){
            setErrorC('Invalid Mobile Number')
        }else if(password===""){
            setErrorP('Creat Password')
        }else{
            // const formdata ={username,email,contact,password} 
            let config={
                url:'http://localhost:8000/post',
                method: 'POST',
                data:{
                    "uname":username,
                    "email":email,
                    "contact": contact,
                    "password":password
                },
                headers:{'Content-Type': 'application/json'}
            }
            axios.request(config).then((res)=>{
                console.log(res);
            }).catch((error)=>{
                console.log(error);
            })

            setContact('');
            setEmail('');
            setName('');
            setPassword('');
            setErrorC('');
            setErrorN('');
            setErrorE('');
            setErrorP('');

            console.log('Submitted');
        }
    }

  return (
    <div className='row py-5 px-5'>
    <div className='col-md-6'>
        <div className='card '>
            <div className='card-body text-center'>
            <div className='card-title'><h4> Let's Get Started!</h4></div>
            <br></br>
            <div className=' row '>
                <div className='col-md-3'></div>

                <div className='col-md-6 '>
                    <form name="signup" onSubmit={submit} >
                        <label >Username</label><br></br>
                        <input type="text" name="username" value={username} onChange={(e)=>setName(e.target.value)}/>
                        <p style={{color:"red", fontSize:"15px"}}>{errorN}</p>
                        <br></br>
                        <label>Email</label><br></br>
                        <input type="email" name="email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
                        <p style={{color:"red", fontSize:"15px"}}>{errorE}</p>
                        <br></br>
                        <label>Contact Number</label><br></br>
                        <input type="phone" name="contact"value={contact}  maxLength={10} onKeyUp={(e)=>handlecontact(e)} onChange={(e)=>setContact(e.target.value)}/>
                        <p style={{color:"red", fontSize:"15px"}}>{errorC}</p>
                        <br></br>
                        <label>Password</label><br></br>
                        <input type="password" name="Password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
                        <p style={{color:"red", fontSize:"15px"}}>{errorP}</p>
                        <br></br>
                        
                        <button className='btn btn-dark' type='submit'>Sign Up</button>
                        <div><h6>Already have an account?</h6>
                        {/* <span as={Link} to={"/login"}>Login</span> */}
                        <Link to='/login'>Login</Link>
                        </div>
                    </form>
                </div>
                <div className='col-md-3'></div>
                </div>
            </div>
        </div>
    </div>

    <div className='col-md-6 container '>
        <div className='mainimg'></div>
    </div>
</div>

  )
}
