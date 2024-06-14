import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import Reserve from '../../components/reserve/Reserve'
import { CONFIG } from '../../config/config'
import { AuthContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SearchContext'
import useFetch from '../../hooks/useFetch'
import "./hotel.css"

const Hotel = () => {

  // to to set the slide no.
  const [slideNumber, setSlideNumber] = useState(0)
    // console.log(slideNumber);

  // to open and close the slide modal and book modal
  const [openImgModal, setOpenImgModal] = useState(false)
  const [openBookModal, setOpenBookModal] = useState(false)

  // using useLocation to get the hotel id
  const location = useLocation()
  const navigate = useNavigate()

  // using useLocation to get the hotel id from the url
  const id = location.pathname.split("/")[2]

  const { data, loading } = useFetch(`${CONFIG.REACT_APP_HOST}/api/${CONFIG.REACT_APP_V}/hotels/${id}`)

  // using useContext to get the values and using them to calculate the price
  const { date, options } = useContext(SearchContext)
  // console.log(options)

  // to get the logged in user
  const { user } = useContext(AuthContext)

  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
  const dateDifference = (date1, date2) =>{
     const timeDiff = Math.abs(date2.getTime() - date1.getTime())
     const dateDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
     return dateDiff
  }

  // calculating night stay
  const nightStay = dateDifference(date[0].endDate, date[0].startDate)

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

  const handleBook = () =>{
    // if user is logged in then allow him to book
    if(user){
      setOpenBookModal(true)
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar/>
      <Header type="list" />
      {loading ? "Loading..." :(
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
          <button className="bookNow" onClick={handleBook} >Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot}/>
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">{data.distance}</span>
            <span className="hotelPriceHighlight">Book a stay over ₹{data.cheapestPrice} at this property and get a free airport taxi</span>
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
                <h1>Perfect for a {nightStay}-night stay!</h1>
                <span>
                  Located in the real heart of city, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                {/* useContext to access date here */}
                  <b>₹{nightStay * data.cheapestPrice * options.rooms}</b> ({nightStay} nights)
                </h2>
                <button onClick={handleBook}>Reserve or Book Now!</button>
              </div>

            </div>
          </div>
          <MailList/>
          <Footer/>
        </div>
      </>
      )}
      { openBookModal && 
      <Reserve 
      setOpenBookModal={setOpenBookModal} 
      hotel_id={id}
      price={nightStay * data.cheapestPrice * options.rooms}
      />
      }
    </div>
  )
}

export default Hotel