import express from "express"
import { 
    createRoom, 
    deleteRoom, 
    getAllRoom, 
    getRoom, 
    updateRoom, 
    updateRoomAvailablity 
} from "../controllers/room.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

// create
router.post("/:hotelId", verifyToken, createRoom)    // only admin can create room
router.put("/:id", verifyToken, updateRoom) // only admin can update room
router.put("/availability/:id", verifyToken, updateRoomAvailablity)
router.delete("/:id/:hotelId", verifyToken, deleteRoom) // only admin can delete room
router.get("/:id", verifyToken, getRoom) // everybody can view a room
router.get("/", verifyToken, getAllRoom) // everybody can view all room

export default router