import express from "express"
import { creatHotel, deleteHotel, getAllHotel, getHotel, updateHotel } from "../controllers/hotel.controller.js"
const router = express.Router()

router.post("/", creatHotel)
router.put("/:id", updateHotel)
router.delete("/:id", deleteHotel)
router.get("/:id", getHotel)
router.get("/", getAllHotel)

export default router