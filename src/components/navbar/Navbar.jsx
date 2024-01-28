import './Navbar.css'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    if(!token){
        navigate("/login");
    }

    const user = JSON.parse(localStorage.getItem('user'))

    const handleLogout = async() => {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login")
    }

  return (
    <div className = "navbar-container">
        <h1 className = "navbar-header">Expense Tracker</h1>
        <div className = "navbar-user">
            <h3>{user.email}</h3>
            <button className = "navbar-logout-button" onClick = {handleLogout}>Logout</button>
        </div>
        

    </div>
  )
}

export default Navbar