import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router'
import {NavLink,Redirect} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Nav.css'
const Nav = () => {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [userName,setUserName] = useState()
    const [isLogin,setIsLogin] = useState()
    const token = localStorage.getItem('userToken')
    useEffect(async () => {
        fetchUser()       
    },[])
    async function fetchUser(){
        if(token){
            
            const TokenUser = await jwtDecode(token)
            await setUser(TokenUser)
            setUserName(TokenUser.name)
            setIsLogin('Logout')
        };
    }

    const logout = () =>{
        localStorage.removeItem('userToken');
        setUserName('')
        history.push('/login')
        //window.location.href = "/login"   
    }
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand">Money Management App</a>
                    <div className="d-flex">
                        <NavLink exact activeStyle={{color : 'pink'}} className="py-2 px-3"
                         to="/">Home</NavLink>
                        {token?(<NavLink onClick={logout} activeStyle={{color : 'pink'}} className="py-2 px-3 " to="/login" >Logout</NavLink>):(<NavLink activeStyle={{color : 'pink'}} className="py-2 px-3 " to="/login">Login</NavLink>)}
                        <NavLink activeStyle={{color : 'pink'}} className="py-2 px-3 " to="/register">Register</NavLink>
                        {token?(<NavLink  exact activeStyle={{color:'pink'}} className="py-2 px-3 "
                         to='/dashboard'>{userName}</NavLink>):null}
                        
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;