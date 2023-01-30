import axios from 'axios'
import React, { useContext, useState } from 'react'
import { v } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'
import "./login.css"

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const { user, loading, error, dispatch } = useContext(AuthContext)

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
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })    
            console.log(res.data);

        } catch (err) {
            console.log(err);
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data?.message})
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

            <button className='lButton' onClick={handleLogin}>Login</button>
            { error && <span>{error}</span>
            }
        </div>
    </div>
  )
}

export default Login