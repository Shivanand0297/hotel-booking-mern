import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { host, v } from "../../config/config";
import useFetch from "../../hooks/useFetch";
import { hotelInputs } from "../new/formSource";
import "./newHotel.scss";

const NewHotel = () => {
  const [files, setFiles] = useState("");

  // for taking hotel details
  const [info, setInfo] = useState({});

  // for taking user selectedOptions
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };

  // fetching all the rooms to select
  const { data, loading } = useFetch(`${host}/api/${v}/rooms/`);

  const handleSelect = (e) => {
    // e.target.selectedOptions will give html collections, so making array out of it
    const selectedArray = Array.from(
      e.target.selectedOptions,
      (element) => element.value
    ); // callback because we only want option values
    setRooms(selectedArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // first uploading all the images
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          // transforming file into form data
          const data = new FormData();

          // adding key values pairs
          data.append("file", file);
          data.append("upload_preset", "upload");

          // uploading on cloudinary
          const uploadResponse = await axios.post(
            "https://api.cloudinary.com/v1_1/shiva10/image/upload",
            data
          );

          // extracting img url
          const { url } = uploadResponse.data;
          
          return url;   // for each image we are returning the url from map method
        })
      );

      const newHotel = {
        ...info,
        rooms: rooms,
        photos: list
      }
   
      const res = await axios.post(`${host}/api/${v}/hotels`, newHotel, {
        credentials: "include",
        headers: {
          "authorization" : `Bearer ${JSON.parse(localStorage.getItem("authorization"))}`
        }
      })

      toast(res.data.message, {
        position: "bottom-right",
        type: "success",
        autoClose: 1000,
        theme: "dark"
    }) 

    } catch (err) {
      console.log(err.message)
      
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <label htmlFor="upload">
              <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="user-avatar"
              />
            </label>
            <input
              type="file"
              id="upload"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              style={{ display: "none" }}
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="upload">
                  Upload image <UploadFile className="icon" />
                </label>
                <input
                  type="file"
                  id="upload"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {hotelInputs.map((input) => {
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
              <div className="formInput">
                <label htmlFor="featured">Featured</label>
                <select name="featured" id="featured" onClick={handleChange} >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="selectRooms">
                <label htmlFor="rooms">Rooms</label>
                <select
                  name="rooms"
                  id="rooms"
                  multiple
                  onChange={handleSelect}
                >
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;
