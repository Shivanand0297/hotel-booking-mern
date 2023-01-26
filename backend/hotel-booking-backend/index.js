import express from "express"
import mongoose from "mongoose"
mongoose.set('strictQuery', true);
import config from "./config/index.js"
const app = express()

// mongoose connection
const connect = async () =>{
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Connected to mongodb");
    } catch (error) {
        throw error
    }
}

// incase of disconnection we want to retry again for the connection
mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected!");
})

mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected!");
})


// backend server
app.listen(config.PORT, ()=>{
    connect()   // connected with mongodb
    console.log("Connected to backend");
})