import React, { useState } from 'react';
import Input from './Input'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
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
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        const { name, email, password, confirmPassword } = user
        if(!name && !email && !password && !confirmPassword){
            return  toastMsg('All Fields Are Required')
        }else{
            axios.post('http://localhost:4444/users/register', { name, email, password, confirmPassword })
            .then(() => {
                return history.push('/login')
            }).catch(e => {
                console.log(e.response)
                if(e.response.status===404){
                    return toastMsg(e.response.data)
                }
                if (e.response && e.response.data) {
                    const obj = e.response.data[Object.keys(e.response.data)[0]]
                    if(obj==='I'){
                        return toastMsg('Invalid Credentials')
                    }
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
                                <Input value={user.name} name="name" handler={onChangeHandler} msg='Enter Your Name' />
                                <Input value={user.email} name="email" handler={onChangeHandler} msg='Enter Your Email' />
                                <Input value={user.password} name="password" handler={onChangeHandler} msg='Enter Your Password' />
                                <Input value={user.confirmPassword} name="confirmPassword" handler={onChangeHandler} msg='Enter Your Password' />
                                <div className="form-row ml-2 my-2 float-left">
                                    <NavLink style={{ textDecoration: 'none' }} to='/login'>Already Have Account? Please Login</NavLink>
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
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />

        </div>
    );
};

export default Register;