import React from "react";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import PropertyListItem from "./PropertyListItem";
import { CONFIG } from '../../config/config.js'

const PropertyList = () => {

  const {data, loading} = useFetch(`${CONFIG.REACT_APP_HOST}/api/${CONFIG.REACT_APP_V}/hotels/city/countByType`) //custom hook

  const images = [
    {
      src: "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
    },
    {
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
    },
    {
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
    },
    {
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
    },
    {
      src: "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
    }
  ]


  return (
    <div className="pList">

      {loading ? "loading..." :(
    <>
      { data && images.map((img, i)=>(
        <PropertyListItem
        key={i} 
        src={img.src} 
        type={data[i]?.type} 
        count={data[i]?.count} 
        />
       ))}
    </>
    )}
    </div>
  );
};

export default PropertyList;
