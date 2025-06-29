import { Request, Response } from "express";
import { addressSchema, UpdateAddressSchema } from "../validators/addressSchema";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { db } from "../libs/db";
import { asyncHandler } from "../utils/asyncHandler";
import { Address } from "@prisma/client";


export const addAddress = asyncHandler(async (req: Request, res: Response) => {
    addressSchema.parse(req.body);

    const address = await db.address.create({
        data: {
            ...req.body,
            userId: req.user?.id
        }
    })

    if (!address) {
        throw new ApiError(400, "Unable to create an Address")
    }

    return res.status(200).json(new ApiResponse(201, address, "Address created Successfully"))

})

export const deleteAddress = asyncHandler(async (req: Request, res: Response) => {
    const { addressId } = req.params;

    const addressDelete = await db.address.delete({
        where: {
            id: +addressId,
        }
    })

    if (!deleteAddress) {
        throw new ApiError(400, "Unable to delete the address")
    }


    return res.status(200).json(new ApiResponse(201, addressDelete, "Address deleted Successfully"))



})

export const listALlAdress = asyncHandler(async (req: Request, res: Response) => {
    const addresses = await db.address.findMany({
        where: {
            userId: req.user!.id
        }
    })

    if (!addresses) {
        throw new ApiError(400, "Unable to fetch all  address")
    }
    return res.status(200).json(new ApiResponse(201, addresses, "Address fetched All Successfully"))


})

export const updateAddress = asyncHandler(async (req: Request, res: Response) => {

    const validatedData = UpdateAddressSchema.parse(req.body)
    let shippingAddress: Address;
    let billingAddress: Address;
    console.log(validatedData)
    if (validatedData.defaultShippingAddress) {
        try {
            shippingAddress = await db.address.findFirstOrThrow({
                where: {
                    id: validatedData.defaultShippingAddress
                }
            })

        } catch (error) {
            throw new ApiError(500, "address not found")
        }
        if (shippingAddress.userId != req.user!.id) {
            throw new ApiError(400, "address does not belong to user")
        }
    }

    if (validatedData.defaultBillingAddress) {
        try {
            billingAddress = await db.address.findFirstOrThrow({
                where: {
                    id: validatedData.defaultBillingAddress
                }
            })

        } catch (error) {
            throw new ApiError(500, "Adress not found")
        }
        if (billingAddress!.userId != req.user!.id) {
            throw new ApiError(400, "address does not belong to user")
        }
    }

    const updatedUser = await db.user.update({
        where: {
            id: req.user!.id
        },
        data: validatedData
    })



})