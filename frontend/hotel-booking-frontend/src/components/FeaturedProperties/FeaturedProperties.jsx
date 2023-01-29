import React from 'react'
import useFetch from '../../hooks/useFetch';
import "./featuredProperties.css"
import { v } from "../../config/config.js"

const FeaturedProperties = () => {

  const {data, loading, error} = useFetch(`/api/v1/hotels?featured=true&limit=4&min=10&max=200`) //custom hook



    return (
        <div className="fp">


          {
            loading ? "Loading" : (
          <>
            {data && data.map(item=>(
              <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt="fraturedimg"
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              { item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
            ))}
          </>
         ) }
        </div>
      );
}

export default FeaturedProperties