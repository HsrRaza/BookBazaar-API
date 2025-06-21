import { Request, Response } from "express";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


export const order = asyncHandler(async(req:Request, res:Response)=>{
    
})
export const getOrders = asyncHandler(async(req:Request, res:Response)=>{

})
export const ordersById = asyncHandler(async(req:Request, res:Response)=>{

})