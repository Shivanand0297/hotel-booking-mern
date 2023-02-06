import Room from "../models/Room.schema.js"
import Hotel from "../models/Hotel.schema.js"
import { errorHandler } from "../utils/errorHandler.js"

export const createRoom = async(req, res, next)=>{
    try {

        // only admin can update Room
        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        // taking inputs
        const { title, price, maxPeople, desc, roomNumbers} = req.body

        // validate inputs
        if(!(title && price && maxPeople && desc && roomNumbers)) return next(errorHandler(400, "All fields are required"))

        // creating room
        const room = await Room.create({
            title,
            price,
            maxPeople,
            desc,
            roomNumbers
        })

        if(!room) return next(errorHandler(400, "Room was not created"))

        // storing the room _id in the hotel schema
       const hotel = await Hotel.findByIdAndUpdate(req.params.hotelId, {
            $push: {
                rooms: room._id
            }
        })

        if(!hotel) return next(errorHandler(400, "Room was not added in the hotel"))

        res.status(200).json({
            message: "Room Created successfully",
            room
        })
    } catch (err) {
        next(err)
    }
}



/********************************
 * @UPDATE_Room
 * @type - PUT
 * @desc - update the Room in the db
 * @return - updated Room
 ********************************/

export const updateRoom = async (req, res, next)=>{
    try {
        // only admin can update Room
        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        const room = await Room.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body
            }, //mongodb update operator
            {
                new: true
            })

        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}


/********************************
 * @DELETE_Room
 * @type - DELETE
 * @desc - delete the Room in the db
 * @return - delete message
 ********************************/

export const deleteRoom = async (req, res, next)=>{
    try {

        // only admin can delete Room
        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        // checking if room is present or not
        const room = await Room.findById(req.params.id)
        if(!room) return next(errorHandler(400, "Room not found"))

        // deleting room 
        await Room.findByIdAndDelete(req.params.id)

        // removing the roomid from the hotel
         const hotel = await Hotel.findByIdAndUpdate(req.params.hotelId, {
        $pull: { 
            rooms: req.params.id
        }
       })

       if(!hotel) return next(errorHandler(400, "Cannot update the deleted room in the hotel db"))

        res.status(200).json("Room has been deleted.")
    } catch (err) {
        next(err)
    }
}

/********************************
 * @GET_Room
 * @type - GET
 * @desc - to get specific Room
 * @return - Room obj
 ********************************/

export const getRoom = async (req, res, next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

/********************************
 * @GET_ALL
 * @type - GET
 * @desc - to get all Room
 * @return - Rooms obj
 ********************************/

export const getAllRoom = async (_req, res, next)=>{
    try {
        const room = await Room.find()
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
}

/********************************
 * @UPDATE_ROOM_AVAILABLITY
 * @type - PUT
 * @desc - update the availableDates[] in the room db
 * @return - updated message
 ********************************/

export const updateRoomAvailablity = async (req, res, next)=>{
    try {
        // finding room numbers id
         await Room.updateOne({"roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates" : req.body.dates // $ because we are updating nested properties
            }
        })

        res.status(200).json("Room has been updated")
    } catch (err) {
        next(err)
    }
}