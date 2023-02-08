import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { LightModeOutlined } from "@mui/icons-material";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(ThemeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="items">
          {darkMode ? (
            <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
              <DarkModeOutlinedIcon className="icon" />
            </div>
          ) : (
            <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
              <LightModeOutlined className="icon" />
            </div>
          )}
          <div className="item">
            <img
              src={JSON.parse(localStorage.getItem("user")).img}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
