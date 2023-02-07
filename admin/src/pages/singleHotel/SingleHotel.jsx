import "./singleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { v } from "../../config/config";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useRef } from "react";

const SingleHotel = () => {

  const scroll = useRef()
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const {data} = useFetch(`/api/${v}/hotels/${id}`, {
    credentials: "include"
  })

  const handleScroll = (direction) =>{
    const {current} = scroll
    if(direction === "left"){
      current.scrollLeft -= 300;
    }else{
      current.scrollLeft += 300;
    }
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">

          <div className="hotelInfo">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="imgwrapper">
                <img
                  src={data.photos ? data.photos[0] : "" }
                  alt="avatar"
                  className="itemImg"
                />
              </div>
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{data.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Desc:</span>
                  <span className="itemValue">{data.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{data.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distance from the city capital:</span>
                  <span className="itemValue">{data.distance}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rooms</span>
                  <span className="itemValue">{data.rooms?.length}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price</span>
                  <span className="itemValue">{data.cheapestPrice}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Featured</span>
                  <span className="itemValue">{data.featured ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="bottom">
          <ArrowBackIosNew 
          className="leftArrow"
          onClick={()=>handleScroll("left")} 
          />

          <ArrowForwardIos 
          className="rightArrow"
          onClick={()=>handleScroll("right")} 
          />
          <div className="photoWrapper" ref={scroll} >
            {data.photos && data.photos.map(photoSrc=>(
              <div className="photoCard">
                <img src={photoSrc} alt="hotel images" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
