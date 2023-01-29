import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from "date-fns"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'
import {v} from "../../config/config"

const List = () => {

  const location = useLocation()
  // storing the payload from the location object
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [options, setOptions] = useState(location.state.options)

  // to open and close date options
  const [openDate, setOpenDate] = useState(false)

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const { data, loading, error, reFetch} = useFetch(`/api/${v}/hotels?city=${destination}&min=${minPrice || 1}&max=${maxPrice || 888}`)

  const handleSearch = () =>{
    reFetch()
  }

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
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min Price <small>per night</small>
                </span>
                <input type="number"  onChange={e=>setMinPrice(e.target.value)} className='lsOptionInput'/>
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max Price <small>per night</small>
                </span>
                <input type="number" onChange={e=>setMaxPrice(e.target.value)}  className='lsOptionInput'/>
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adult
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Children
                </span>
                <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
              </div>

              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Room
                </span>
              <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
              </div>
              <button className='lsOptionSearch' onClick={handleSearch} >Search</button>
            </div>
          </div>
          <div className="listResult">
            { loading ? "Loading" :( 
            <>
            { data && data.map(item=>(
                <SearchItem item={item} key={item._id} />
            )) }
            </>
          )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default List