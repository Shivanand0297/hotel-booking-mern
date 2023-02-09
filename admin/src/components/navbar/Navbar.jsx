import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { LightModeOutlined } from "@mui/icons-material";
import "./navbar.scss";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(ThemeContext);
  
  return (
    <div className="navbar">
      <div className="wrapper">
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
              src={JSON.parse(localStorage.getItem("user"))?.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
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
