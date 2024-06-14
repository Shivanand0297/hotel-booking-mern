import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// config constants
import { CONFIG } from "../../config/config";

// importing auth context to get user
import { AuthContext } from "../../context/AuthContext";

// to make api calls
import axios from "axios";
import "./payment.css";
import { toast } from "react-toastify";


/***********************************************************************************************************************************
 * @Description
 * This code is a React component that implements a payment system using Razorpay. 
 * It imports the React library and the useContext and useLocation hooks from React Router. 
 * It also imports config constants, the AuthContext, and axios for making API calls. 
 * The Payment function uses the useLocation hook to access the current location, 
 * then uses useContext to get the user from AuthContext. 
 * It also sets up paymentOptions with an amount and currency. 
 * 
 * The loadScript function is used to dynamically load a script tag into the DOM when a link is clicked. 
 * The displayRazorpay function makes an API call to get data from the backend, 
 * then sets up options for a Razorpay popup window. 
 * The handler function is called when payment is successful and collects response data such as payment ID, order ID, and signature. 
 * The prefill option sets up information about the user such as name, email, and contact number. 
 * Finally, it opens up the Razorpay popup window with these options.
 **********************************************************************************************************************************/

const Payment = () => {
  // to get the amount
  const location = useLocation();
  const { state } = location

  // 
  const navigate = useNavigate()

  // getting user from the auth context
  const {user} = useContext(AuthContext)

  // payment options for the request to backend
  const paymentOptions = {
    amount: state?.price,  //in rupees
    currency: "INR"
  }

  // 1️⃣ loading this script dynamically in dom whenever we are clicking on the link
  const loadScript = (src) => {

    return new Promise((resolve) => {
      const script = document.createElement("script"); // creating a script tag
      script.src = src; // "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script); //apending the script tag in the body
    });
  };

  // const DEV = document.domain === "localhost";

  const displayRazorpay = async () => {
    // 2️⃣ loading script dynamically
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    // if res not found then return from the function otherwise continue
    if (!res) {
      return alert("Razorpay SDK faild to load are you online?");
    }

    const {data} = await axios.post(`${CONFIG.REACT_APP_HOST}/api/${CONFIG.REACT_APP_V}/razorpay/payment`, 
      paymentOptions, 
      {
        headers: {
          "authorization" : `Bearer ${JSON.parse(localStorage.getItem("authorization"))}`
        }
      }
    )

    // options for the popup
    const options = {
      // if in production take production key otherwise take test keys
      key: CONFIG.REACT_APP_RAZORPAY_KEY,
      amount: data.amount, //taking amount from the response data
      currency: data.currency,
      order_id: data.id,
      name: "Hotel Booking",
      description: "Thankyou for booking",
      image: "https://example.com/your_logo",

      // on successful payment
      handler: async function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)

        // TODO: make a api call to update user

        const {data} = await axios.put(`${CONFIG.REACT_APP_HOST}/api/${CONFIG.REACT_APP_V}/users/${user._id}`, 
        {
          paymentId: response.razorpay_payment_id
        }, 
        {
          credentials: "include",
          headers: {
            "authorization" : `Bearer ${JSON.parse(localStorage.getItem("authorization"))}`
          }
        })

        // user updated
        toast(data.message, {
          position: "bottom-center",
          type: "success",
          theme: "dark"
        })

         // success message
         toast("Payment successful", {
          position: "bottom-center",
          type: "success",
          theme: "dark"
        })

        navigate("/")

      },
      prefill: {
        name: user.username,
        email: user.email,
        contact: "9865126510",
      },
    };

      const paymentObject = new window.Razorpay(options);

    // handling payment error
      paymentObject.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      paymentObject.open();
      

  };

  return (
    <div className="bookingContainer">
      <div className="bookingcontents">
        <span>{`Proceed to pay ₹ ${paymentOptions.amount}`}</span>
        <button className="payment" onClick={displayRazorpay}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
