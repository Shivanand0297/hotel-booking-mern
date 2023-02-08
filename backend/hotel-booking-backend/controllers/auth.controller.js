import User from "../models/User.schema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/errorHandler.js";
import config from "../config/index.js";

/********************************
 * @REGISTER_USER
 * @type - POST
 * @desc - creates User into db
 * @return - created User
 ********************************/

export const register = async (req, res, next)=>{
    try {
        // taking input from the user
        const { username, email, password } = req.body;

        // validating the input
        if(!username || !email || !password){
            return next(errorHandler(400, "All fields are required"))
        }

        // checking for already present user with the same email
        const alreadyPresent = await User.findOne({email})
        if(alreadyPresent){
            return next(errorHandler(400, "User already present with the same email"))
            
        }
        
        // encrypting the password before creating
        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            ...req.body,
            password: encryptedPassword, 
        })

        user.password = undefined;
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        })

    } catch (err) {
        next(err)
    }
}

/********************************
 * @LOGIN_USER
 * @type - POST
 * @desc - login User into db
 * @return - login message
 ********************************/

export const login = async (req, res, next)=>{
    try {
        // taking input from the user
        const { email, password } = req.body;

        // validating the input
        if(!email || !password){
            return next(errorHandler(400, "All fields are required"))
        }

        // checking if user exists or not
        const user = await User.findOne({email})
        if(!user){
            return next(errorHandler(404, "User not found"))
        }
        
        // if user is there
        if(user && (await bcrypt.compare(password, user.password))){

            // assign him a token
            const token = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                config.JWT_SECRET,
                {
                    expiresIn: config.JWT_EXPIRY
                }
            )

            // setting cookie for 3 days
            res.cookie("authToken", token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true 
            })

            // removing password before sending the user
            // user.password = undefined
            // user.isAdmin = undefined
            const { password, isAdmin, ...otherDetails } = user._doc   //another way
           return res.status(200).json({
                success: true,
                message: "Logged in successfully",
                details: otherDetails, 
                isAdmin
            })

        } else{
            return next(errorHandler(400, "Wrong password or email"))
        }

    } catch (err) {
        next(err)
    }
}


export const logout = async (req, res, next)=>{
    try {
        res.cookie("authToken", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        res.status(200).json({
            success: true, 
            message: "logged out"
        })
    } catch (err) {
        next(err)
    }
}