import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Updateform() {
    const { id } = useParams();
    const [valuess, setValuess] = useState({});
    const token = localStorage.getItem('token')
    // const [email, setEmail] = useState('');
    // const [contact, setContact] = useState('');
    // const [password, setPassword] = useState('');
    // const [errorN, setErrorN] = useState('');
    // const [errorE, setErrorE] = useState('');
    // const [errorC, setErrorC] = useState('');
    // const [errorP, setErrorP] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        getuserbyId(id);
        // console.log(valuess.uname, "VALUESSSSSSSSSSSS");
    }, [])

    async function getuserbyId(id) {
        try {

            await axios.get('http://localhost:8000/userbyparamId?'+ new URLSearchParams({
                id:id
            })).then((result) => {
                setValuess(result.data[0])
                console.log(result,'ressss');
               
            })

        }
        catch (error) {
            console.log(error);
        }
    }


    async function update(values) {

        try {
            let config = {
                url: 'http://localhost:8000/update',
                method: 'POST',
                data: {
                    "uname": values.username,
                    "email": values.email,
                    "contact": values.contact,
                    "password": values.password
                },
                headers: { 'Authorization': token, 'Content-Type': 'application/json' }
            }
            axios.request(config).then((res) => {
                console.log(res);
                console.log("update");
                if (typeof (res.data) == 'string') {
                    console.log(`${res.data}`);
                } else {
                    navigate(`/home`)
                }

            })
        }
        catch (error) {
            console.log(error)
        }
        // }

    }

    // return (
    //     <div className='container'>
    //         <div className='row' >
    //             <div className='col-md-3' ></div>
    //             <div className='col-md-6 py-5 text-center' >
    //                 <form name="signup" onSubmit={update} >
    //                     <label >Username</label><br></br>
    //                     <input type="text" name="username" value={username} onChange={(e) => setName(e.target.value)} />
    //                     <p style={{ color: "red", fontSize: "15px" }}>{errorN}</p>
    //                     <br></br>
    //                     <label>Email</label><br></br>
    //                     <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //                     <p style={{ color: "red", fontSize: "15px" }}>{errorE}</p>
    //                     <br></br>
    //                     <label>Contact Number</label><br></br>
    //                     <input type="phone" name="contact" value={contact} maxLength={10} onKeyUp={(e) => handlecontact(e)} onChange={(e) => setContact(e.target.value)} />
    //                     <p style={{ color: "red", fontSize: "15px" }}>{errorC}</p>
    //                     <br></br>
    //                     <label>Password</label><br></br>
    //                     <input type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //                     <p style={{ color: "red", fontSize: "15px" }}>{errorP}</p>
    //                     <br></br>

    //                     <button className='btn btn-dark' type='submit'>Update</button>

    //                 </form>
    //             </div>
    //             <div className='col-md-3' ></div>
    //         </div>
    //     </div>
    // )

    return (
        <div className='container'>
            <div className='row' >
                <div className='col-md-3' ></div>
                <div className='col-md-6 py-5 text-center' >
                    {console.log(valuess, "vaaaaaaaaaaaa")}
                   {valuess? <Formik
                        enableReinitialize={true}
                        initialValues={{
                            username:  valuess.uname ? valuess.uname :"",
                            email: valuess.email ? valuess.email : "",
                            contact: valuess.contact ? valuess.contact : "",
                            password: valuess.password ? valuess.password : ""
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string()
                                .max(15, 'Must be 15 characters or less')
                                .required('Required'),
                            email: Yup.string().email('Invalid email address').required('Required'),
                            contact: Yup.number()
                                .typeError("That doesn't look like a phone number")
                                .positive("A phone number can't start with a minus")
                                .integer("A phone number can't include a decimal point")
                                .min(10)
                                .required('A phone number is required'),
                            password: Yup.string().required("Please provide a valid password")
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                update(values)
                                setSubmitting(false);
                            }, 400);
                        }}

                    >
                        <Form>
                            <label htmlFor="username">User Name</label>
                            <Field type="text" name="username"></Field>
                            <ErrorMessage name="username" component="div" /><br></br><br></br>

                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email"></Field>
                            <ErrorMessage name="email" component="div" /><br></br><br></br>

                            <label htmlFor="contact">Contact</label>
                            <Field type="phone" name="contact"></Field>
                            <ErrorMessage name="contact" component="div" /><br></br><br></br>

                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" /><br></br><br></br>
                            <button type="submit" >
                                Submit
                            </button>

                        </Form>
                    </Formik>:<div>Loading...</div>}
                </div>
            </div>
            <div className='col-md-3' ></div>
        </div>
    )
}