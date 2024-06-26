import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CONFIG } from '../../config/config'
import "./register.css"

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const handleChange = e =>{
        setInputs(prev=>({
                ...prev, [e.target.name]: e.target.value
            })
        )
    }

    const handleRegister = async (e) =>{
        e.preventDefault()
        // starting register
        try {
            const res = await axios.post(`${CONFIG.REACT_APP_HOST}/api/${CONFIG.REACT_APP_V}/auth/register`, inputs, {
                credentials: "include",
                headers: {
                    "authorization" : `Bearer ${JSON.parse(localStorage.getItem("authorization"))}`
                  }
                })

            toast(res.data.message, {
                position: "bottom-center",
                type: "success",
                autoClose: 2000,
                theme: "dark"
            })

            navigate("/login")

        } catch (err) {
            const errorMessage = err.response?.data?.message
            toast(errorMessage, {
                position: "bottom-center",
                type: "error",
                autoClose: 2000,
                theme: "dark"
            })
        }
    }

  return (
    <div className="register">
        <div className='rContainer' >
            <input type="text" name='username' id='username' className="rUsername"
            onChange={handleChange}
            placeholder="Enter username"
            />

            <input type="email" name='email' id='email' className="rEmail"
            onChange={handleChange}
            placeholder="Your Email"
            />
            
            <input type="password" name='password' className="rPassword"
            onChange={handleChange}
            placeholder="Your Password"        
            />

            <button className='rButton' onClick={handleRegister}>Register</button>
            <Link className='registerLink' to="/login">Already have an account?. Click to login</Link>
        </div>
    </div>
  )
}

export default Register