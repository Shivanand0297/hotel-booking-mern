import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { host, v } from "../../config/config";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext"
import "./reserve.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpenBookModal, hotel_id }) => {
    const { data } = useFetch(`${host}/api/${v}/hotels/room/${hotel_id}`);
    const { date } = useContext(SearchContext)
    const navigate = useNavigate()
    // to store the selected room id's
    const [selectRooms, setSelectRooms] = useState([]);
    // storing selectRooms id
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectRooms(
            checked
                ? [...selectRooms, value]
                : selectRooms.filter((room) => room !== value)
        );
    };
    
    // dates are in range so getting individual dates
    const datesInRange = (startDate, endDate)=>{
        let start = new Date(startDate)
        let end = new Date(endDate)
        let date = new Date(start.getTime())
        let dateList = []
        while(date <= end){
            dateList.push(new Date(date).getTime())  // will be easy to compare dates
            date.setDate(date.getDate()+1)  // increment by one day
        }
        return dateList
    }

    const allDates = datesInRange(date[0].startDate, date[0].endDate);

    // checking room availablity
    const isAvailable = (roomNumber) =>{
        const isFound = roomNumber.unavailableDates.some(date=>(
            allDates.includes(new Date(date).getTime())
        ))
        return !isFound // although it is present in the allDates but we want to show it as unavailable
    }

    const handleReserve = async () =>{
        // pushing booking dates in the unavailable dates array
        try {
            await Promise.all(selectRooms.map( async (room_id)=>{
                await axios.put(`${host}/api/${v}/rooms/availability/${room_id}`, 
                {
                    dates: allDates
                }, 
                {   credentials: "include",
                    headers: {
                        "authorization" : `Bearer ${JSON.parse(localStorage.getItem("authorization"))}`
                    }
                })
                // success message
                toast("Room booked successfully", {
                    position: "bottom-center",
                    type: "success"
                })
                setOpenBookModal(false)
                navigate("/")

            }))


        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="reserve">
            <div className="rcontainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rclose"
                    onClick={() => setOpenBookModal(false)}
                />
                <span>Select your rooms:</span>
                {data.roomList?.map((room) => (
                    <div className="rItem" key={room._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">Title: {room.title}</div>
                            <div className="rDesc">desc: {room.desc}</div>
                            <div className="rMax">
                                max people: <b>{room.maxPeople}</b>
                            </div>
                            <div className="rPrice">Price: {room.price}</div>
                        </div>
                        {room.roomNumbers?.map((roomNumber) => (
                            <div className="room" key={roomNumber._id}>
                                <label>{roomNumber.number}</label>
                                <input
                                    type="checkbox"
                                    name="id"
                                    id="id"
                                    value={roomNumber._id}
                                    onChange={handleSelect}
                                    disabled={!isAvailable(roomNumber)} 
                                />
                            </div>
                        ))}
                    </div>
                ))}
                <button className="rButton" onClick={handleReserve} >Reserve Now!</button>
            </div>
        </div>
    );
};

export default Reserve;
