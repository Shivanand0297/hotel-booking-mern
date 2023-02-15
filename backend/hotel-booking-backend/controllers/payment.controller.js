import crypto from "crypto";
import Razorpay from "razorpay";
import config from "../config/index.js";

/********************************
 * @MAKE_PAYMENT_TO_RAZORPAY
 * @type - POST
 * @desc - create razorpay order with the supplied options
 * @return - JSON response containing order id, amount, and currency
 ********************************/
export const payment = async (req, res, next) => {

  const razorpay = new Razorpay({
    key_id: config.RAZORPAY_ID,
    key_secret: config.RAZORPAY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100,  //Paisa
    currency: req.body.currency,
    receipt: crypto.randomBytes(5).toString("hex")
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      
    });
  } catch (err) {
    next(err)
  }
};


export const verification = async (req, res)=>{

  // validation
  const WEB_HOOK_SECRET = "sPm6u3wG2d#w#m6" // we need secret keys because anybody can hit this endpoint and can say that payment is successfull

  // consoling the data send by razorpay webhook
  console.log(req.body) // this request containes x-razorpay-signature header like hash token
  // so in order to validation the payment we need to make the hash on our own and matches with the razorpay one
  // id it matches then the payment is valid

  /**@creating hash */
  const shasum = crypto.createHmac("sha256", WEB_HOOK_SECRET) // creating hash with secrect key
  shasum.update(JSON.stringify(req.body)) // adding the body payload
  const digest = shasum.digest("hex")

  console.log(digest, req.headers["x-razorpay-signature"])

  if(digest === req.headers["x-razorpay-signature"]){
    // process it
    /**@mandatory  responding razorpay server with status code 200*/
    res.status(200).json({
      status: "Payment successfull"
    })

    console.log("request is legit")

    //TODO: updating the user database with the order_id
    // console.log(req.body.payload?.payment?.entity)

  }else{
    res.status(500)
  }

}
