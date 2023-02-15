import React from 'react'
import { useLocation } from 'react-router-dom'
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/FeaturedProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from "../../components/propertylist/PropertyList"
import "./home.css"

const Home = () => {

  const {state} = useLocation()

  return (
    <div>
      <Navbar isAdmin={state?.isAdmin} />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className='homeTitle' >Browse By Property Type</h1>
        <PropertyList/>
        <h1 className='homeTitle' >Home Guest Love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home