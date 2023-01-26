import User from "../models/User.schema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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
            return next(400, "All fields are required")
        }

        // checking for already present user with the same email
        const alreadyPresent = await User.findOne({email})
        if(alreadyPresent){
            return next(401, "User already present with the same email")
        }
        
        // encrypting the password before creating
        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username, 
            email,
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
        const { username, email, password } = req.body;

        // validating the input
        if(!username || !email || !password){
            return next(400, "All fields are required")
        }

        // checking for already present user with the same email
        const alreadyPresent = await User.findOne({email})
        if(alreadyPresent){
            return next(401, "User already present with the same email")
        }
        
        // encrypting the password before creating
        const encryptedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username, 
            email,
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