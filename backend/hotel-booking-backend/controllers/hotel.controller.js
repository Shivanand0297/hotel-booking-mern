import Hotel from "../models/Hotel.schema.js"


/********************************
 * @CREATE_HOTEL
 * @type - GET
 * @desc - creates hotel into db
 * @return - created hotel
 ********************************/

export const creatHotel = async (req, res, next)=>{
    try {
        // only admin can create hotel
        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        const hotel = await Hotel.create(req.body)
        res.status(200).json(hotel)
    } catch (error) {
        next(err)
    }
}

/********************************
 * @UPDATE_HOTEL
 * @type - PUT
 * @desc - update the hotel in the db
 * @return - updated hotel
 ********************************/

export const updateHotel = async (req, res, next)=>{
    try {
        // only admin can update hotel
        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        const hotel = await Hotel.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, //mongodb update operator
            {new: true})
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}


/********************************
 * @DELETE_HOTEL
 * @type - DELETE
 * @desc - delete the hotel in the db
 * @return - delete message
 ********************************/

export const deleteHotel = async (req, res, next)=>{
    try {

        // only admin can delete hotel
        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (err) {
        next(err)
    }
}

/********************************
 * @GET_HOTEL
 * @type - GET
 * @desc - to get specific hotel
 * @return - hotel obj
 ********************************/

export const getHotel = async (req, res, next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

/********************************
 * @GET_ALL
 * @type - GET
 * @desc - to get all hotel
 * @return - hotels obj
 ********************************/

export const getAllHotel = async (_req, res, next)=>{
    try {
        const hotel = await Hotel.find()
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}