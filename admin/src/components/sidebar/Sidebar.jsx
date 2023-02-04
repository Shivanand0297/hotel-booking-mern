import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LogoutIcon from '@mui/icons-material/Logout';
import "./sidebar.scss"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = () => {

  const { dispatch } = useContext(ThemeContext)

  return (
    <div className="sidebar" >
      <div className="top">

        <Link to="/" className='link' >
          <span className="logo">ShivaAdmin</span>
        </Link>

      </div>
      <hr/>
      <div className="center">
        <ul>
          <p>Main</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p>List</p>

          <Link to="/users" className='link' >
            <li>
              <PersonIcon  className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" className='link' >
            <li>
              <InventoryIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>
          <p>Useful</p>
          <li>
            <QueryStatsIcon  className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsActiveIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <MonitorHeartIcon  className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyIcon  className="icon" />
            <span>Logs</span>
          </li>
          <p>System</p>
          <li>
            <SettingsIcon  className="icon" />
            <span>Settings</span>
          </li>
          <p>User</p>
          <li>
            <AssignmentIndIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
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