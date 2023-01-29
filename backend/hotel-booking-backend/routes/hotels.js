import express from "express"
import { countByCity, countByType, creatHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

// create
router.post("/", verifyToken, creatHotel)    // only admin can create hotel
router.put("/:id", verifyToken, updateHotel) // only admin can update hotel
router.delete("/:id", verifyToken, deleteHotel) // only admin can delete hotel
router.get("/:id", verifyToken, getHotel) // everybody can view a hotel
router.get("/", verifyToken, getAllHotel) // everybody can view all hotel


router.get("/city/countByCity", verifyToken, countByCity)    // getting hotels by city name 
router.get("/city/countByType", verifyToken, countByType)    // getting hotels by type 

export default router