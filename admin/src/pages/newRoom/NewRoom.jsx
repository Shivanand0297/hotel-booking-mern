import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { host, v } from "../../config/config";
import useFetch from "../../hooks/useFetch";
import { roomInputs } from "../new/formSource";
import "./newRoom.scss";

const NewRoom = () => {


  // for taking hotel details
  const [info, setInfo] = useState({});

  // for taking user selectedOptions
  const [hotelID, setHotelID] = useState("");

  // for taking room numbers
  const [roomNo, setRoomNo] = useState([])

  // fetching all the rooms to select
  const { data, loading } = useFetch(`${host}/api/${v}/hotels`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const roomNumbers = roomNo.split(",").map(room=>({number: room}))
    try{
      const res = await axios.post(`${host}/api/${v}/rooms/${hotelID}`, {...info, roomNumbers}, {credentials: "include"})
      
      toast(res.data.message, {
        position: "bottom-center",
        type: "success",
        autoClose: 2000,
        theme: "dark"
    }) 

    }catch(err){
      toast(err.message, {
        position: "bottom-center",
        type: "error",
        autoClose: 2000,
        theme: "dark"
    }) 
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New rooms</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit} >
              {roomInputs.map((input) => {
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
                  <label htmlFor="rooms">Rooms</label>
                  <textarea id="room" cols="30" rows="10" placeholder="give comma between room numbers"
                  onChange={e=>setRoomNo(e.target.value)}
                  />
                </div>
                <div className="formInput">
                  <label htmlFor="hotels">Hotels</label>
                  <select name="hotels" id="hotels" onChange={e=>setHotelID(e.target.value)}>
                    {loading ? "loading" : data && data.map(hotel=>(
                        <option value={hotel._id} key={hotel._id}>{hotel.name}</option>
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

export default NewRoom;
