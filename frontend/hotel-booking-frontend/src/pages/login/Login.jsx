import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'
import "./login.css"

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const { user, loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = e =>{
        setCredentials(prev=>({
                ...prev, [e.target.name]: e.target.value
            })
        )
    }

    const handleLogin = async (e) =>{
        e.preventDefault()
        // starting login
            dispatch({ type: "LOGIN_START"})
        
        try {
            const res = await axios.post(`/api/${v}/auth/login`, credentials, {
                credentials: "include"
                })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user })    
            toast(res.data.message, {
                position: "bottom-center",
                type: "success",
                autoClose: 2000,
                theme: "dark"
            })

            navigate("/")

        } catch (err) {
            console.log(err);
            const errorMessage = err.response?.data?.message
            dispatch({ type: "LOGIN_FAILURE", payload: errorMessage})
            toast(errorMessage, {
                position: "bottom-center",
                type: "error",
                autoClose: 2000,
                theme: "dark"
            })
        }
    }

  return (
    <div className="login">
        <div className='lcontainer' >
            <input type="text" name='email' id='email' className="lemail"
            onChange={handleChange}
            />
            
            <input type="password" name='password' className="lpassword"
            onChange={handleChange}        
            />

            <button disabled={loading} className='lButton' onClick={handleLogin}>Login</button>
            { error && <span>{error}</span>
            }
        </div>
    </div>
  )
}

export default Login