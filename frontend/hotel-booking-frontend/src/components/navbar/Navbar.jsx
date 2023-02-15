import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"

const Navbar = ({isAdmin=false}) => {

  const { user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleRegister = () =>{
    navigate("/register")
  }

  const handleLogin = () =>{
    navigate("/login")
  }

  const handleLogout = () =>{
    
    localStorage.removeItem("user")
    localStorage.removeItem("authorization")
    dispatch({
      type: "LOGOUT"
    })
    navigate("/")

  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none" }} >
          <span className="logo">Booking</span>
        </Link>
        
        { user ? (<span>
          {user.username }
          {
            isAdmin && 
            <Link to="https://hotel-admin-dashboard.netlify.app" target="_blank" 
            style={{color: "inherit", textDecoration: "none", marginLeft: "20px" }} >
              Dashboard
            </Link>
          }
          <button className="navButton" onClick={handleLogout} >Logout</button>
        </span>  ): 
          
          (<div className="navItems">
          <button className="navButton" onClick={handleRegister} >Register</button>
          <button className="navButton" onClick={handleLogin} >Login</button>
          </div>)}
      </div>
    </div>
  );
};

export default Navbar;
