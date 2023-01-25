import React from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'

const List = () => {
  return (
    <div>
      <Navbar/>
      {/* we only want to render top header section not the bottom one so passing the props to put the logic */}
      <Header type="list" />
    </div>
  )
}

export default List