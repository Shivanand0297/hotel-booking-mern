import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import "./sidebar.scss"
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Apartment, Bed } from '@mui/icons-material';
import axios from 'axios';
import { host, v } from '../../config/config';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { dispatch } = useContext(ThemeContext)
  const navigate = useNavigate()

  const {_id} = JSON.parse(localStorage.getItem("user"))
  
  const handleLogout = async () =>{
    localStorage.clear("user")
    localStorage.clear("authorization")

    try{
      const { data } = await axios.get(`${host}/api/${v}/auth/logout`, {
        credentials: "include"
      })

      toast(data.message, {
        position: "bottom-center",
        type: "success"
      })
      window.location.reload()
      navigate("/login")
    }catch(err){
      toast(err.message, {
        position: "bottom-center",
        type: "success"
      })
    }
  }

  return (
    <div className="sidebar" >
      <div className="top">

        <Link to="/" className='link' >
          <span className="logo">Hotel Admin</span>
        </Link>

      </div>
      <hr/>
      <div className="center">
        <ul>
          <p>Main</p>
          <Link to="/" className='link' >
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p>List</p>

          <Link to="/users" className='link' >
            <li>
              <PersonIcon  className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/hotels" className='link' >
            <li>
              <Apartment className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" className='link' >
            <li>
              <Bed className="icon" />
              <span>Rooms</span>
            </li>
          </Link>
          <p>User</p>
          <Link to={`/users/${_id}`} className='link' >
            <li>
              <AssignmentIndIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout} >
            <LogoutIcon  className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottomTheme">
        <span>Theme</span>
        <div className="theme">
          <div className="colorOption light" onClick={()=>dispatch({ type: "LIGHT"})} ></div>
          <div className="colorOption dark" onClick={()=>dispatch({ type: "DARK"})} ></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar