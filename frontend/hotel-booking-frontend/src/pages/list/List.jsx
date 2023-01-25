import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"

const List = () => {

  const location = useLocation()
  console.log(location);

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
              <label>Destination</label>
              <input type="text"/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              {/* here we want to display the date which the user searched in the search bar from the home page */}

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