// for making express app
import express from "express";

// for connecting to mongodb
import mongoose from "mongoose";
import config from "./config/index.js";

// app routes
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";
import paymentRoute from "./routes/payment.js";

// cookieParser to read cookies
import cookieParser from "cookie-parser";

// to enable cross origin request
import cors from "cors"

mongoose.set("strictQuery", true);
const app = express();

// api version
const v = config.v;

// mongoose connection
const connect = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

// incase of disconnection we want to retry again for the connection
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected!");
});

/** @middlewares */ 
// to accept json date from frontend
app.use(express.json())

// to accept nested json values
app.use(express.urlencoded({extended: true}))

// to read cookies
app.use(cookieParser())

// cors middleware
app.use(
    cors({
      origin: [
        "https://hotel-booking-mern-flame.vercel.app", 
        "https://hotel-booking-admin-delta.vercel.app/",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
      credentials: true
    })
);

// routes
app.get("/", (_req, res)=>{
  res.send("welcome home")
})
app.use(`/api/${v}/auth`, authRoute); //"auth" endpoint for authRoute
app.use(`/api/${v}/hotels`, hotelsRoute); //"hotels" endpoint for hotelsRoute
app.use(`/api/${v}/rooms`, roomsRoute); //"rooms" endpoint for roomsRoute
app.use(`/api/${v}/users`, usersRoute); //"users" endpoint for usersRoute
app.use(`/api/${v}/razorpay`, paymentRoute); 

// error handler middleware
app.use((err, _req, res, next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


// backend server
app.listen(config.PORT, () => {
  connect(); // connected with mongodb
  console.log("Connected to backend");
});
