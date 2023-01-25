import React from 'react'

const PropertyListItem = ({src, title, subtitle}) => {
  return (
    <div className="pListItem">
        <img
          src={src}
          alt="propertyImg"
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
  )
}

export default PropertyListItem