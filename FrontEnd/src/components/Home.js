import React from 'react';
import jwtDecode from 'jwt-decode'
import Login from './Login'
import {Redirect,Link,useHistory} from 'react-router-dom'

const Home = () => {
    const history = useHistory()
    const token=localStorage.getItem('userToken')
    if(token){
        console.log(jwtDecode(token))
    }
    const logout=()=>{
        localStorage.removeItem('userToken')       
        history.push('/login')
    }
    
    return (
        <div>
            <h1 className="text-center">
                {token?<button className="btn btn-danger" onClick={logout}>Logout</button>:<Link to='/login'>Log In</Link>}
            </h1>
        </div>
    );
};

export default Home;