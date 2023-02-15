import React from 'react'
import useFetch from '../../hooks/useFetch';
import "./featuredProperties.css"
import { host, v } from "../../config/config.js"
import { Link } from 'react-router-dom';

const FeaturedProperties = () => {

  const {data, loading} = useFetch(`${host}/api/${v}/hotels?featured=true&limit=4&min=10&max=1000`) //custom hook



    return (
        <div className="fp">

          {
            loading ? "Loading..." : (
          <>
            {data && data.map(item=>(
              <Link className='link' to={`/hotels/${item._id}`} key={item._id}>
                <div className="fpItem">
                <img
                  src={item.photos[0]}
                  alt="fraturedimg"
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
                { item.rating && <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>}
              </div>
            </Link>
            ))}
          </>
         ) }
        </div>
      );
}

export default FeaturedProperties