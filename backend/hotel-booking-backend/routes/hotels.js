import express from "express"
import { countByCity, countByType, creatHotel, deleteHotel, getAllHotel, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

// create
router.post("/", verifyToken, creatHotel)    // only admin can create hotel
router.put("/:id", verifyToken, updateHotel) // only admin can update hotel
router.delete("/:id", verifyToken, deleteHotel) // only admin can delete hotel
router.get("/:id", getHotel) // everybody can view a hotel
router.get("/", getAllHotel) // everybody can view all hotel
router.get("/city/countByCity", countByCity)    // getting hotels by city name 
router.get("/city/countByType", countByType)    // getting hotels by type 
router.get("/room/:id", getHotelRooms)        

export default router