import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"

const Navbar = () => {

  const { user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () =>{
    navigate("/login")
  }

  const handleLogout = () =>{
    
    localStorage.removeItem("user")
    dispatch({
      type: "LOGOUT"
    })
    navigate("/")

  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{color: "inherit", textDecoration: "none" }} >
          <span className="logo">Booking</span>
        </Link>
        
        { user ? (<span>
          {user.username }
          <button className="navButton" onClick={handleLogout} >Logout</button>
        </span>  ): 
          
          (<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton" onClick={handleLogin} >Login</button>
          </div>)}
      </div>
    </div>
  );
};

export default Navbar;
