import { Response, Request, NextFunction } from "express";

import { db } from "../libs/db";

import jwt  from "jsonwebtoken";



import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { env } from "../libs/env";

type decodedType = {
    id:string
}

export const authMiddleware = asyncHandler(async( req:Request, res:Response, next:NextFunction)=>{

    try {
        const token = req.cookies.token || req.cookies.tokens || req.headers.authorization?.split(" ")[1];
        if(!token) throw new ApiError(403, "UnAuthorized Token")
            const decoded = jwt.verify(token, env.JWT_SECRET) as decodedType
    
        const user = await db.user.findFirst({
            where:{
                id:decoded.id
            },
        })
    
         if (!user) throw new ApiError(404, "User not found")
    
        req.user = user
    
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access token in auth middle")
        
    }

})

