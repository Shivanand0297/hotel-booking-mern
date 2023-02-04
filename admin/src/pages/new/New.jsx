import { UploadFile } from "@mui/icons-material";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <label htmlFor="upload" >
            <img
              src={
                file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="user-avatar"
              />
            </label>
            <input
                  type="file"
                  id="upload"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="upload">
                  Upload image <UploadFile className="icon" />
                </label>
                <input
                  type="file"
                  id="upload"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => {
                return (
                  <div className="formInput" key={input.id}>
                    <label htmlFor={input.label}>{input.label}</label>
                    <input
                      type={input.type}
                      id={input.label}
                      placeholder={input.placeholder}
                    />
                  </div>
                );
              })}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
