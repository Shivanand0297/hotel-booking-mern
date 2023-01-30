import { errorHandler } from "../utils/errorHandler.js"
import jwt from "jsonwebtoken"
import config from "../config/index.js"



export const verifyToken = async (req, _res, next)=>{
    let token
    // taking authtoken from cookies
    if(
        req.cookies.authToken || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) 
        ){
            token = req.cookies.authToken || req.headers.authorization.split(" ")[1]
            // console.log(req.cookies)
        }
        
        if(!token) return next(errorHandler(401, "You are not authenticated"))
        
try {
        // if token is present,  we need to verify it
        const decodeToken = jwt.verify(token, config.JWT_SECRET)    // {id: user._id, isAdmin: user.isAdmin}
        
        if(!decodeToken) return next(errorHandler(403, "Token not valid"))
        req.user = decodeToken;
        next()
    } catch (err) {
        next(err)
    }
} 

