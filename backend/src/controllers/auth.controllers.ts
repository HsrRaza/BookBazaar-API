import e, { Request, Response } from "express"
import { db } from "../libs/db"
import { z } from "zod"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/apiError"
import { ApiResponse } from "../utils/apiResponse"
import { asyncHandler } from "../utils/asyncHandler"
import { registerUserSchema } from "../validators/validate"
import crypto from "crypto"
import { UserRole } from "@prisma/client"
import sendVerificationEmail from "../utils/sendMail"



export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    try {
        const data = registerUserSchema.parse(req.body);

        const checkUser = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (checkUser) {
            throw new ApiError(400, "user already exist")
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const emailToken = crypto.randomBytes(18).toString("hex");


        const newUser = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: UserRole.USER,
                verificationToken: emailToken,
                isVerified: false,
                verificationTokenExpiray: new Date(Date.now() + 1000 * 60 * 60)

            }
        })

        await sendVerificationEmail(newUser.email, emailToken)


        return res.status(201).json(new ApiResponse(201, newUser, "User created Successfully and Verify Your email",))

    } catch (errr) {
        throw new ApiError(500, "Unable to register user",)

    }



})
export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {

    

})
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {

})
export const getUser = asyncHandler(async (req: Request, res: Response) => {

})
export const getProfile = asyncHandler(async (req: Request, res: Response) => {

})
export const refreshAcessToken = asyncHandler(async (req: Request, res: Response) => {

})
export const forgetPasswordRequest = asyncHandler(async (req: Request, res: Response) => {

})
export const changeCurrentPassword = asyncHandler(async (req: Request, res: Response) => {

})
