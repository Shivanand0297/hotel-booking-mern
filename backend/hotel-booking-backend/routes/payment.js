import express from "express"
import { payment, verification } from "../controllers/payment.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()

router.post("/payment", verifyToken, payment)
router.post("/verification", verifyToken, verification)

export default router