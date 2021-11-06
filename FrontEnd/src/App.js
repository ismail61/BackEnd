import jQuery from 'jquery'
import './App.css';
import './js/main.js';

import { Switch, Link, Route,useHistory } from 'react-router-dom'
/*import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Nav from './components/Navbar/Nav'
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken' */

//DipanNita 
import Navbar from './components/dipannita/Navbar'
import Topbar from './components/dipannita/Topbar'
import Sidebar from './components/dipannita/Sidebar'

function App() {
/*   const history = useHistory()
  const token = localStorage.getItem('userToken')
  if (token) {
    jwt.verify(token.substring(7), 'secretKey', (err, decode) => {
      const { exp } = jwtDecode(token)     
      const expirationTime = (exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        localStorage.clear();
        history.push('/login');
      }
    })
    {/*  <Nav token={token}/>
      <Route path='/' exact component={Home}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/dashboard' component={Dashboard}></Route> */ 
  return (
    <div className="App">
        
          <Navbar />
          <Topbar />
          <Sidebar />
        
    </div>
  );
}

export default App;
