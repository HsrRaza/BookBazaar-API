import { Request, response } from "express";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { db } from "../libs/db";


export const addReviewtoBook = asyncHandler(async(req:Request, res:Response)=>{
    
})
export const listReviewOfBook = asyncHandler(async(req:Request, res:Response)=>{

})
export const deleteReview = asyncHandler(async(req:Request, res:Response)=>{

})