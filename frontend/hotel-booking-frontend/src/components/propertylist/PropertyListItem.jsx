import React from 'react'

const PropertyListItem = ({src, type, count}) => {
  return (
    <div className="pListItem">
        <img
          src={src}
          alt="propertyImg"
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{type}</h1>
          <h2>{count}</h2>
        </div>
      </div>
  )
}

export default PropertyListItem