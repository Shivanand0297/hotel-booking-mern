import React, { useContext } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faMapLocation,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";

// date range picker from npm 
import { DateRange } from "react-date-range";
import { format } from "date-fns" //to convert js date object into readable date format

// css for date component
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

// header css
import "./header.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {

  // for taking date inputs
  const [date, setDate] = useState([
    {
      startDate: new Date(),  //to formate into date formate we need format function of datefns
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // to open and close date picker
  const [openDate, setOpenDate] = useState(false)

  // to open and close options
  const [openOptions, setOpenOptions] = useState(false)

  // user options to select room etc..
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    rooms: 1
  })

  // to set Destination
  const [destination, setDestination] = useState("")

  // for changing the hotel options
  const handleChange = (person, operation) =>{
    setOptions(prev=>({
      ...prev, [person]: operation === "i" ? options[person] + 1 : options[person] - 1
    }))
  }

  // using search context to dispatch search and save it
  const { dispatch } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

// using navigate to move to the search result page with the search inputs in state
  const navigate = useNavigate()

  const handleSearch = () =>{
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        destination,
        date,
        options
      }
    })

    // navigate to /hotels route with this information because we want to show this in the list
    navigate("/hotels", { state: {
      destination, 
      date,
      options
    }})
  }

  return (
    <div className="header">
      <div className={ type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faMapLocation} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        { type !== "list" && 
        <>
        <h1 className="headerTitle">A lifetime of discount? It's Genius</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock instant saving of 10% or more
          with free booking
        </p>
        <p><b className="headerDesc">
          Currently serving in newdelhi, mumbai, jaipur, chennai and Bengaluru.
        </b></p>
        { !user && <button className="headerBtn">Sign in / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are your going"
              className="headerSearchInput"
              value={destination}
              onChange={e=>(setDestination(e.target.value))}
            />
          </div>

          <div className="headerSearchItem"
          >
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            {/* this will be dynamic */}
            <span 
            className="headerSearchText"
            onClick={()=>{setOpenDate(!openDate)}}
            > 
            {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")} `} 
            </span>

            { openDate && <DateRange
              editableDateInputs={true} //whether dates can be edited in the Calendar's input fields
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}  // to prevent the selection of back date

              ranges={date} //Defines ranges. array of range object
              className="date"
            />}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span 
            className="headerSearchText" onClick={()=>{setOpenOptions(!openOptions)}} >
              {`${options.adult} Adult, ${options.children} Children, ${options.rooms} Room`}
            </span>
            { openOptions && <div className="options">
              <div className="optionItems">
                <span className="optionItemText">Adult</span>
                <div className="optionCounter">
                  <button className="optionCounterButton"  disabled={options.adult <=1} onClick={()=>{handleChange("adult", "d")}} >-</button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button className="optionCounterButton" onClick={()=>{handleChange("adult", "i")}} >+</button>
                </div>
              </div>
              <div className="optionItems">
                <span className="optionItemText">Children</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" disabled={options.children <=0} onClick={()=>{handleChange("children", "d")}} >-</button>
                  <span className="optionCounterNumber">{options.children}</span>
                  <button className="optionCounterButton" onClick={()=>{handleChange("children", "i")}} >+</button>
                </div>
              </div>
              <div className="optionItems">
                <span className="optionItemText">Room</span>
                <div className="optionCounter">
                  <button className="optionCounterButton" disabled={options.rooms <=1}  onClick={()=>{handleChange("rooms", "d")}} >-</button>
                  <span className="optionCounterNumber">{options.rooms}</span>
                  <button className="optionCounterButton" onClick={()=>{handleChange("rooms", "i")}} >+</button>
                </div>
              </div>
            </div>
            }
            
          </div>

          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch} >Search</button>
          </div>
        
        </div>
        </>
        }
      </div>
    </div>
  );
};

export default Header;
