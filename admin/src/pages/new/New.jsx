import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { v } from "../../config/config";
import "./new.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");


  // for taking user inputs
  const [info, setInfo] = useState({})

  const handleChange = (e) =>{
    setInfo(prev=>({ ...prev, [e.target.id]: e.target.value  }))
    console.log(info)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    // transforming file into form data
    const data = new FormData()
    
    // adding key values pairs
    data.append("file", file)
    data.append("upload_preset", "upload")
    try{
      // uploading on cloudinary
      const uploadResponse = await axios.post("https://api.cloudinary.com/v1_1/shiva10/image/upload", data)

      // extracting img url
      const {url} = uploadResponse.data

      const newUser = {
        ...info, img: url
      }

      const res = await axios.post(`/api/${v}/auth/register`, newUser, {
        credentials: "include"
      })

      setInfo({})

      toast(res.data.message, {
        position: "bottom-center",
        type: "success",
        autoClose: 2000,
        theme: "dark"
    })

    }catch(err){
      console.log(err)
    }
  }

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
                      id={input.id}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  </div>
                );
              })}
              <button type="submit" onClick={handleSubmit} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
