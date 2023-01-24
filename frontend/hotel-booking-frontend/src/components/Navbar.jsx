import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-900 h-[50px] w-full px-4 text-white'>
        <div class="max-w-5xl mx-auto h-full flex flex-row justify-between items-center">
            <span class="font-bold">Booking</span>
            <div class="navitems flex flex-row items-center gap-3">
                <button className='border-none rounded-sm px-[10px] py-[5px] bg-white text-blue-800' >Register</button>
                <button className='border-none rounded-sm px-[10px] py-[5px] bg-white text-blue-800' >Login</button>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar