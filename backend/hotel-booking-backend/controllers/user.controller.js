import User from "../models/User.schema.js"
import { errorHandler } from "../utils/errorHandler.js"

/********************************
 * @UPDATE_USER
 * @type - PUT
 * @desc - update the User in the db
 * @return - updated User
 ********************************/

export const updateUser = async (req, res, next)=>{
    try {

        if(!(req.user.id === req.params.id || req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        const user = await User.findByIdAndUpdate(req.params.id, 
            {$set: req.body}, //mongodb update operator
            {new: true})
        res.status(200).json({
            message: "User Updated Successfully",
            user
        })

    } catch (err) {
        next(err)
    }
}


/********************************
 * @DELETE_USER
 * @type - DELETE
 * @desc - delete the User in the db
 * @return - delete message
 ********************************/

export const deleteUser = async (req, res, next)=>{
    try {

        if(!(req.user.id === req.params.id || req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted.")
    } catch (err) {
        next(err)
    }
}

/********************************
 * @GET_USER
 * @type - GET
 * @desc - to get specific User
 * @return - User obj
 ********************************/

export const getUser = async (req, res, next)=>{
    try {

        if(!(req.user.id === req.params.id || req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

/********************************
 * @GET_ALL
 * @type - GET
 * @desc - to get all User
 * @return - Users obj
 ********************************/

export const getAllUser = async (req, res, next)=>{
    try {

        if(!(req.user.isAdmin)){
            return next(errorHandler(401, "Not authorized"))
        }

        const user = await User.find()
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}