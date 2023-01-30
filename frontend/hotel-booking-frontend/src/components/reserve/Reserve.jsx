import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { v } from "../../config/config";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpenBookModal, hotel_id }) => {
    const { data } = useFetch(`/api/${v}/hotels/room/${hotel_id}`);
    const [selectRooms, setSelectRooms] = useState([]);
    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectRooms(
            checked
                ? [...selectRooms, value]
                : selectRooms.filter((room) => room !== value)
        );
    };
    
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
                        {room.roomNumbers?.map((item) => (
                            <div className="room">
                                <label>{item.number}</label>
                                <input
                                    type="checkbox"
                                    name="id"
                                    id="id"
                                    value={item._id}
                                    onChange={handleSelect}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reserve;
