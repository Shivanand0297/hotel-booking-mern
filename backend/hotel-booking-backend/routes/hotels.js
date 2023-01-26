import express from "express"
import Hotel from "../models/Hotel.schema.js"
const router = express.Router()

/********************************
 * @createhotel
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

export default router