import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { v } from '../../config/config'
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
        // starting login
        try {
            const res = await axios.post(`/api/${v}/auth/register`, inputs, {
                credentials: "include"
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
        </div>
    </div>
  )
}

export default Register