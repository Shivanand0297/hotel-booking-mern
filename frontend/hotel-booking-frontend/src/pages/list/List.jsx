import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from "date-fns"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { DateRange } from 'react-date-range'

const List = () => {

  const location = useLocation()
  console.log(location);
  // storing the payload from the location object
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [options, setOptions] = useState(location.state.options)

  // to open and close date options
  const [openDate, setOpenDate] = useState(false)

  return (
    <div>
      <Navbar/>
      {/* we only want to render top header section not the bottom one so passing the props to put the logic */}
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor='destination' >Destination</label>
              <input id='destination' placeholder={destination} type="text"/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              {/* here we want to display the date which the user searched in the search bar from the home page */}
              <span onClick={()=>{setOpenDate(!openDate)}} >
                {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")} `}
              </span>
              {/* Showing date options on clicking */}
              { openDate && <DateRange
              onChange={item=>setDate([item.selection])}
              minDate={new Date()} // to prevent the selection of back date
              ranges={date}
              />
              }
            </div>
            <div class="lsItem">
              <label>Options</label>
              <div class="lsOptionItem">
                <span class="lsOptionText">
                  Min Price <small>per night</small>
                </span>
                <input type="number" className='lsOptionInput'/>
              </div>

              <div class="lsOptionItem">
                <span class="lsOptionText">
                  Max Price <small>per night</small>
                </span>
                <input type="number" className='lsOptionInput'/>
              </div>

              <div class="lsOptionItem">
                <span class="lsOptionText">
                  Adult
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
              </div>

              <div class="lsOptionItem">
                <span class="lsOptionText">
                  Children
                </span>
                <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
              </div>

              <div class="lsOptionItem">
                <span class="lsOptionText">
                  Room
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
              </div>
              <button className='lsOptionSearch' >Search</button>
            </div>
          </div>
          <div className="listResult">

          </div>
        </div>
      </div>
    </div>
  )
}

export default List