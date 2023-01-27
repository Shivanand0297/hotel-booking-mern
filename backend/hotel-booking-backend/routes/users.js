import express from "express"
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const router = express.Router()


router.put("/:id",verifyToken, updateUser)  //both admin and user can do this
router.delete("/:id",verifyToken, deleteUser) //both admin and user can do this
router.get("/:id",verifyToken, getUser) //both admin and user can do this
router.get("/",verifyToken, getAllUser) // only admin can do this

export default router