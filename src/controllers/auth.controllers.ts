import { Request, Response, CookieOptions } from "express"
import { db } from "../libs/db"

import bcrypt from "bcrypt"
import { ApiError } from "../utils/apiError"
import { ApiResponse } from "../utils/apiResponse"
import { asyncHandler } from "../utils/asyncHandler"
import {
    registerUserSchema,
    loginUserSchema
} from "../validators/validate"
import crypto from "crypto"
import { UserRole } from "@prisma/client"
import sendVerificationEmail from "../utils/sendMail"
import { logger } from "../libs/logger"
import jwt from "jsonwebtoken"
import { env } from "../libs/env"



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


    try {
        const { tokenId } = req.params;


        //get User

        const user = await db.user.findFirst({
            where: {
                verificationToken: tokenId,
                verificationTokenExpiray: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return new ApiError(400, "Token is invalid or expired");
        }

        await db.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiray: '',
            },
        });

        return res.status(200).json(new ApiResponse(200, "email is verified"))






    } catch (err) {
        logger.error("Email verification error", err)
        return new ApiError(500, "Internal Error")

    }

})
export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const data = loginUserSchema.parse(req.body);
    const { email, password } = data;
    try {
        const user = await db.user.findUnique({
            where: { email }
        })
        if (!user) {
            return new ApiError(400, "User doesn't exist please register ")
        }

        // password match
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return new ApiError(400, "user is not matched")
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        const cookieOptions = {
            httpOnly: true,
        }
        res.cookie('token', token, cookieOptions)

        return res.status(201).json(new ApiResponse(201, { user, token }, "user loggedIn suucess"))






    } catch (error) {
        return new ApiError(500, "Unable to login, failed  ")
    }

})
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {

    res.clearCookie("tokens", {})
    res.status(200).json(new ApiResponse(200, "User logout sucessfully"))
})
export const getUser = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user?.id

    try {
        let user = await db.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
        if (!user) {
            throw new ApiError(400, "UnAuthorized Access")
        }
        return res.status(200).json(new ApiResponse(200, "User fetched Successflly"))

    } catch (error) {

        return new ApiError(500, "something Wrong")


    }

})

export const refreshAcessToken = asyncHandler(async (req: Request, res: Response) => {
          
})
export const forgetPasswordRequest = asyncHandler(async (req: Request, res: Response) => {

})
export const changeCurrentPassword = asyncHandler(async (req: Request, res: Response) => {

})
