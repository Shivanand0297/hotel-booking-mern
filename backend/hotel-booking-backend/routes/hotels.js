import express from "express"
import { creatHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

// create
router.post("/",verifyToken, creatHotel)    // only admin can create hotel
router.put("/:id",verifyToken, updateHotel) // only admin can update hotel
router.delete("/:id",verifyToken, deleteHotel) // only admin can delete hotel
router.get("/:id",verifyToken, getHotel) // everybody can view a hotel
router.get("/",verifyToken, getAllHotel) // everybody can view all hotel

export default router