import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {

  const login = async () =>{


    const userData = {
      email: "admin@gmail.com",
      password: "admin",
    }

    const response = await axios.post("/api/v1/auth/login", userData, {
        credentials: "include"
      })
      console.log(response.data);
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{color: "inherit", textDecoration: "none" }} >
          <span className="logo">Booking</span>
        </Link>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton" onClick={login} >Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
