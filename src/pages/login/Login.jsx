import React from 'react'
import './Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../../config/firebase"
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('')

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
        } catch(error){
            alert("Incorrect email or password entered");
            console.error(error)
            setEmail("");
            setPassword("");
        }
    }



  return (
    <div className = "login-page">
        <div className = "login-container">
            <h1>Login</h1>
            <form className = "login-form" onSubmit = {handleSubmit}>
            <label className = "login-label" htmlFor = "login-email">Email</label>
            <input
            className = "login-input"
            name = "email"
            type = "email"
            id = "login-email"
            placeholder = "Email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            />
            <label className = "login-label" htmlFor = "login-password">Password</label>
            <input
            className = "login-input"
            name = "password"
            type = "password"
            id = "password"
            placeholder = "Password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
            <button className = "login-button">Login</button>
            <p className = "login-redirect">Don't have an account? <Link to = "/signup">Register</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login