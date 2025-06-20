import { Request, Response } from "express"
import {db} from "../libs/db"
import {z} from "zod"
import bcrypt from "bcrypt"
import {ApiError} from "../utils/apiError"
import {ApiResponse} from "../utils/apiResponse"
import {asyncHandler} from "../utils/asyncHandler"



export const registerUser = asyncHandler(async (req:Request, res:Response) => {
    
})
export const loginUser = asyncHandler(async (req:Request, res:Response) => {
    
})
export const logoutUser = asyncHandler(async (req:Request, res:Response) => {
    
})
export const getUser = asyncHandler(async (req:Request, res:Response) => {
    
})
export const verifyEmail = asyncHandler(async (req:Request, res:Response) => {
    
})
export const refreshAcessToken = asyncHandler(async (req:Request, res:Response) => {
    
})
export const forgetPasswordRequest = asyncHandler(async (req:Request, res:Response) => {
    
})
export const changeCurrentPassword = asyncHandler(async (req:Request, res:Response) => {
    
})
