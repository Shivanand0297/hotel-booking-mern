import React from 'react'
import "./mailList.css"

const MailList = () => {
  return (
    <div className='mail' >

        <h1 class="mailTitile">Save time, save money!</h1>
        <span class="mailDesc">Sign up and we'll send the best deals to you</span>
        <div class="mailInputContainer">
            <input type="email" placeholder='Your Email'/>
            <button>Subscribe</button>
        </div>
        
    </div>
  )
}

export default MailList