import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import { v } from '../../config/config'
import useFetch from '../../hooks/useFetch'
import "./hotel.css"

const Hotel = () => {

  // to to set the slide no.
  const [slideNumber, setSlideNumber] = useState(0)
    // console.log(slideNumber);

  // to open and close the slide modal
  const [openImgModal, setOpenImgModal] = useState(false)

  const location = useLocation()

  // using useLocation to get the hotel id from the url
  const id = location.pathname.split("/")[2]

  const { data, loading } = useFetch(`/api/${v}/hotels/${id}`)


  const handleImgModal = (index) =>{
    setSlideNumber(index)
    setOpenImgModal(true)
  }

  const handleArrow = (operation) =>{
    if((operation === "d" && slideNumber === 0)
    ){
      setSlideNumber(data.photos?.length-1)
    }else if((operation === "i" && slideNumber === data.photos?.length-1)){
      setSlideNumber(0)
    }
    else if(operation === "d"){
      setSlideNumber(slideNumber-1)
    }else {
      setSlideNumber(slideNumber+1)
    } 
  }

  return (
    <div>
      <Navbar/>
      <Header type="list" />
      {loading ? "Loading" :(
       <>
        <div className="hotelContainer">
          {/* img slider */}

        { openImgModal && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} 
            className="close"
            onClick={()=>setOpenImgModal(false)} 
            />
            <FontAwesomeIcon icon={faCircleArrowLeft} 
            className="arrow" 
            onClick={()=>handleArrow("d")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="sliderimg" className="sliderImg"/>
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} 
            className="arrow" 
            onClick={()=>handleArrow("i")}
            />
          </div>
          }

          <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot}/>
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">{data.distance}</span>
            <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
            <div className="hotelImages">
              {data.photos?.map((photo, index)=>(
                <div className="hotelImgWrapper" key={index} >
                  <img src={photo} onClick={()=>{handleImgModal(index)}} className="hotelImg" alt="hotelimg"/>
                </div>
              ))}
            </div>
            <div className="hotelDetails">

            <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
              </div>

              <div className="hotelDetailsPrice">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>$945</b> (9 nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>

            </div>
          </div>
          <MailList/>
          <Footer/>
        </div>
      </>
      )}
    </div>
  )
}

export default Hotel