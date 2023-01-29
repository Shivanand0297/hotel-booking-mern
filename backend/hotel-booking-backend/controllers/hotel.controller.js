import Hotel from "../models/Hotel.schema.js"
import { errorHandler } from "../utils/errorHandler.js"


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
    } catch (err) {
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


/********************************
 * @GET_HOTEL_BY_CITY_NAME
 * @type - GET
 * @desc - to get all hotel by city name
 * @return - hotels obj
 ********************************/

export const countByCity = async (req, res, next)=>{
    try {
        // http://127.0.0.1:8800/api/v1/hotels/countByCity?cities=newdelhi,bangalore,channai,jaipur

        const cities = req.query.cities.split(",")

        //finding hotel for each cities so we need Promise.all
        const list = await Promise.all(cities.map(city=>{

           /**@costly_operation  return Hotel.find({city: city}).length this is costly operation, because it will look in all the properties of the documents */

           return Hotel.countDocuments({city: city})    // mongodb operation, much faster
        })) 

        if(!list) return next(errorHandler(400, "Result not found"))

        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}


export const countByType = async (_req, res, next)=>{
    try {
        
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})

        res.status(200).json([
            { type: "Hotels", count: hotelCount},
            { type: "Apartments", count: apartmentCount},
            { type: "Resorts", count: resortCount},
            { type: "Villas", count: villaCount},
            { type: "Cabins", count: cabinCount}
        ])
    } catch (err) {
        next(err)
    }
}