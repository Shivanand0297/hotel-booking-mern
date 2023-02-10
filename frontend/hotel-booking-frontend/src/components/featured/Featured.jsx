import React from 'react'
import useFetch from '../../hooks/useFetch.js'
import "./featured.css"
import { host, v } from '../../config/config.js'



const Featured = () => {

     const {data, loading} = useFetch(`${host}/api/${v}/hotels/city/countByCity?cities=newdelhi,bangalore,channai,jaipur`) //custom hook


  return (
    <div className='featured' >

        
      { loading ? "loading..." : (
        <> 
            <div className="featuredItem">
                <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" alt="New delhi"/>
                <div className="featuredTitle">
                    <h1>New Delhi</h1>
                    <h2>{data[0]} Properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="bangalore"/>
                <div className="featuredTitle">
                    <h1>Bangalore</h1>
                    <h2>{data[1]} Properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=" alt="Channai" />
                <div className="featuredTitle">
                    <h1>Channai</h1>
                    <h2>{data[2]} Properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img className='featuredImg' src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" alt="Jaipur"/>
                <div className="featuredTitle">
                    <h1>Jaipur</h1>
                    <h2>{data[3]} Properties</h2>
                </div>
            </div>
        </>
        )}
    </div>
  )
}

export default Featured