import React from "react";
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

const Header = ({type}) => {
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
    room: 1
  })

  // for changing the hotel options
  const handleChange = (person, operation) =>{
    setOptions(prev=>({
      ...prev, [person]: operation === "i" ? options[person] + 1 : options[person] - 1
    }))
  }

  return (
    <div className="header">
      <div class={ type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div class="headerList">
          <div class="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div class="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div class="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div class="headerListItem">
            <FontAwesomeIcon icon={faMapLocation} />
            <span>Attractions</span>
          </div>
          <div class="headerListItem">
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
        <button className="headerBtn">Sign in / Register</button>
        <div class="headerSearch">
          <div class="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are your going"
              className="headerSearchInput"
            />
          </div>

          <div class="headerSearchItem"
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
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
            />}
          </div>

          <div class="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span 
            className="headerSearchText" onClick={()=>{setOpenOptions(!openOptions)}} >
              {`${options.adult} Adult, ${options.children} Children, ${options.room} Room`}
            </span>
            { openOptions && <div class="options">
              <div class="optionItems">
                <span class="optionItemText">Adult</span>
                <div class="optionCounter">
                  <button class="optionCounterButton"  disabled={options.adult <=1} onClick={()=>{handleChange("adult", "d")}} >-</button>
                  <span class="optionCounterNumber">{options.adult}</span>
                  <button class="optionCounterButton" onClick={()=>{handleChange("adult", "i")}} >+</button>
                </div>
              </div>
              <div class="optionItems">
                <span class="optionItemText">Children</span>
                <div class="optionCounter">
                  <button class="optionCounterButton" disabled={options.children <=0} onClick={()=>{handleChange("children", "d")}} >-</button>
                  <span class="optionCounterNumber">{options.children}</span>
                  <button class="optionCounterButton" onClick={()=>{handleChange("children", "i")}} >+</button>
                </div>
              </div>
              <div class="optionItems">
                <span class="optionItemText">Room</span>
                <div class="optionCounter">
                  <button class="optionCounterButton" disabled={options.room <=1}  onClick={()=>{handleChange("room", "d")}} >-</button>
                  <span class="optionCounterNumber">{options.room}</span>
                  <button class="optionCounterButton" onClick={()=>{handleChange("room", "i")}} >+</button>
                </div>
              </div>
            </div>
            }
            
          </div>

          <div class="headerSearchItem">
            <button class="headerBtn">Search</button>
          </div>
        
        </div>
        </>
        }
      </div>
    </div>
  );
};

export default Header;
