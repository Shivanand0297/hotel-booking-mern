import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { host } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'
import "./login.scss"

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const { loading, error, dispatch } = useContext(AuthContext)
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
            const {data} = await axios.post(`${host}/api/v1/auth/login`, credentials, {
                credentials: "include"
                })

            if(data.isAdmin){

              dispatch({ type: "LOGIN_SUCCESS", payload: data.details }) 
              
            //   saving user detail to local storage
              localStorage.setItem("user", JSON.stringify(data.details))

            //   saving auth token in local storage
              localStorage.setItem("authorization", JSON.stringify(data.token))
              
              toast(data.message, {
                position: "bottom-center",
                type: "success",
                autoClose: 2000,
                theme: "dark"
              })
              navigate("/") // admin home page
            }else{
              dispatch({ type: "LOGIN_FAILURE", payload: {message: "You are not allowed"}})
            }
              
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
        <div className='lContainer' >
            <input type="text" name='email' id='email' className="lemail"
            onChange={handleChange}
            placeholder="Your Email"
            />
            
            <input type="password" name='password' className="lpassword"
            onChange={handleChange}
            placeholder="Your Password"        
            />

            <button disabled={loading} className='lButton' onClick={handleLogin}>Login</button>
            { error && <span>{error}</span>
            }
        </div>
    </div>
  )
}

export default Login