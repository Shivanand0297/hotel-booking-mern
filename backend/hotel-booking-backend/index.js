import express from "express";
import mongoose from "mongoose";
import config from "./config/index.js";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

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

// routes
app.use(`/api/${v}/auth`, authRoute); //"auth" endpoint for authRoute
app.use(`/api/${v}/hotels`, hotelsRoute); //"auth" endpoint for hotelsRoute
app.use(`/api/${v}/rooms`, roomsRoute); //"auth" endpoint for roomsRoute
app.use(`/api/${v}/users`, usersRoute); //"auth" endpoint for usersRoute


// backend server
app.listen(config.PORT, () => {
  connect(); // connected with mongodb
  console.log("Connected to backend");
});
