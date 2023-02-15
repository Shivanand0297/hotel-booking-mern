import dotenv from "dotenv"
dotenv.config()

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    v: process.env.v,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    RAZORPAY_ID: process.env.RAZORPAY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
}
export default config