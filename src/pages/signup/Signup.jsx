import React from 'react'
import './Signup.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../../config/firebase"
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            if(password === confirmPass){
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
            }
            else{
                alert("Passwords do not match!")
            }
        } catch(error){
            console.error(error)
        }
    }

   


  return (
    <div className = "signup-page">
        <div className = "signup-container">
            <h1>Sign Up</h1>
            <form onSubmit = {handleSubmit} className = "signup-form">

                <label className = "signup-label" htmlFor= "signup-email">Email</label>
                <input
                className = "signup-input"
                type = "email"
                placeholder = "Email"
                id = "signup-email"
                onChange = {(e) => setEmail(e.target.value)}
                />

                <label className = "signup-label" htmlFor = "signup-password">Password</label>
                <input
                className = "signup-input"
                type = "password"
                placeholder = "Password"
                id = "signup-password"
                onChange = {(e) => setPassword(e.target.value)}
                />

                <label className = "signup-label" htmlFor = "signup-confirmPass">Confirm Password</label>
                <input
                className = "signup-input"
                type = "password"
                placeholder = "Confirm Password"
                id = "signup-confirmPass"
                onChange = {(e) => setConfirmPass(e.target.value)}
                />

                <button className = "signup-button">Sign Up</button>

                <p className = "signup-redirect">Already have an account? <Link className = "login-link"to = "/login">Sign in</Link> </p>
            </form>
        </div>
    </div>
  )
}

export default Signup