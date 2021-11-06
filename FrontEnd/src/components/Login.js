import React, { useState } from 'react';
import Input from './Input'
import {NavLink, Redirect, useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios'
const Login = () => {
    
    const toastMsg = (msg)=>{
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            }); 
    }
    const history = useHistory()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const onChangeHandler = event => {
        setUser((oldValue) => {
            return {
                ...oldValue,
                [event.target.name]: event.target.value
            }
        })
    }
    const onSubmitHandler = event => {
        
        event.preventDefault()
        const {email,password} = user
        if(!email || !password ){
            return toastMsg('All Fields Are Required')
        }else{
            axios.post('http://localhost:4444/users/login',user)
            .then((res)=>{
                const token = res.data.token
                localStorage.setItem('userToken',token)
                window.location.href = "/dashboard"
            })
            .catch((e)=>{
                
                if(e.response.status===400){
                    
                    return toastMsg(e.response.data)
                }
                if(e.response.status===404){
                    
                    return toastMsg('Server error')
                }
                if (e.response && e.response.data) {
                    const obj = e.response.data[Object.keys(e.response.data)[0]]
                    
                    return toastMsg(obj)
                }
            })
        }
        
    }
    return (
        <div>
            <section className="testimonial py-5" id="testimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 py-5 bg-primary text-white text-center ">

                            <div className="card-body">
                                <img src="http://www.ansonika.com/mavia/img/registration_bg.svg" style={{ width: "30%" }} />
                                <h2 className="py-3">Registration</h2>
                                <p>Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel.

                                </p>
                            </div>

                        </div>
                        <div className="col-md-7 py-5 border">
                            <h4 className="pb-4">Please fill with your details</h4>
                            <form onSubmit={onSubmitHandler}>
                               
                                <Input value={user.email} name="email"  handler={onChangeHandler}  msg = 'Enter Your Email'  />
                                <Input value={user.password} name="password"  handler={onChangeHandler}  msg = 'Enter Your Password'  />
                            

                                <div className="form-row ml-2 mt-2 float-left">
                                    <NavLink style={{textDecoration : 'none'}} to='/register'>Don't Have Account? Register First</NavLink>
                                </div>
                                <div className="form-row float-right">
                                    <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    );
};

export default Login;