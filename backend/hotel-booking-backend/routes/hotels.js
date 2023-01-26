import express from "express"
import Hotel from "../models/Hotel.schema.js"
const router = express.Router()

/********************************
 * @CREATE_HOTEL
 * @type - GET
 * @desc - creates hotel into db
 * @return - created hotel
 ********************************/

router.post("/", async (req, res)=>{
    try {
        const hotel = await Hotel.create(req.body)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

/********************************
 * @UPDATE_HOTEL
 * @type - PUT
 * @desc - update the hotel in the db
 * @return - updated hotel
 ********************************/

router.put("/:id", async (req, res)=>{
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, //mongodb update operator
            {new: true})
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

/********************************
 * @DELETE_HOTEL
 * @type - DELETE
 * @desc - delete the hotel in the db
 * @return - delete message
 ********************************/

router.delete("/:id", async (req, res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (error) {
        res.status(500).json(error)
    }
})

/********************************
 * @GET_HOTEL
 * @type - GET
 * @desc - to get specific hotel
 * @return - hotel obj
 ********************************/

router.get("/:id", async (req, res)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

/********************************
 * @GET_ALL
 * @type - GET
 * @desc - to get all hotel
 * @return - hotels obj
 ********************************/

router.get("/", async (req, res)=>{
    try {
        const hotel = await Hotel.find()
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router