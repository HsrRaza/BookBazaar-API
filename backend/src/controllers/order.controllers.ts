import { Request, Response } from "express";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";



export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    // 1. to create a transaction
    // 2.to list all the cart items and proceed if cart is not empty
    // 3. calculate the total amount 
    // 4.fetch address of user 
    // 5. to define computed field for formated address on adress module
    // 6.  we will createe a  order and order  bookorder
    // 7. create event 
    // 8. to empty cart

    return await db.$transaction(async (tsx) => {

        const cartItems = await tsx.cartItem.findMany({
            where: {
                userId: req.user?.id
            },
            include: {
                Book: true
            }
        })
        if (cartItems.length == 0) {
            throw new ApiError(400, "Cart is Empty ")
        }

        const price = cartItems.reduce((prev, current) => {
            return prev + (current.quantity * +current.Book.price)
        }, 0)

        const addressId = req.user.defaultShippingAddress;

        if (addressId == null) {
            throw new ApiError(400, "No default shipping address found");
        }


        const address = await tsx.address.findUnique({
            where: {
                id: addressId
            }
        })

        const order = await tsx.order.create({
            data: {
                userId: req.user.id,
                netAmount: price,
                address: address!.formattedAddress,
                products: {
                    create: cartItems.map((cart) => {
                        return {
                            bookId: cart.bookId,
                            quantity: cart.quantity
                        }
                    })
                }
            }
        })


        const orderEvent = await tsx.orderEvent.create({
            data: {
                orderId: order.id
            }
        })

        await tsx.cartItem.deleteMany({
            where: {
                userId: req.user.id
            }
        })

        if (!order) {
            throw new ApiError(400, "Order is failed ")
        }


        return res.status(201).json(new ApiResponse(201, order, "Order is placed successfullly "))



    })


})
export const listOrders = asyncHandler(async (req: Request, res: Response) => {
    const order = await db.order.findMany({
        where: {
            userId: req.user.id
        }
    })

    if (!order) {
        throw new ApiError(400, "failed to fetched Orders")
    }

    return res.status(200).json(new ApiResponse(200, order, "All Orders fetched successfully"))

})
export const getOrdersById = asyncHandler(async (req: Request, res: Response) => {
    const order = await db.order.findFirstOrThrow({
        where: {
            id: req.user.id
        },
        include: {
            products: true,
            events: true

        }
    })

    if (!order) {
        throw new ApiError(400, "failed to fetched Orders")
    }

    return res.status(200).json(new ApiResponse(200, order, " Orders fetched successfully"))


})

export const cancelOrder = asyncHandler(async(req:Request, res:Response)=>{

    // 1. need to wrap it inside transaction
    //  2. check if the users is cancelling it's own order
    

    
    
     
     const order = await db.order.update({
        where: {
            id: req.params.id
        },
        data:{
            status:"CANCELLED",
        }
    })

    await db.orderEvent.create({
        data:{
            orderId:order.id,
            status:"CANCELLED"
        }
    })

    if (!order) {
        throw new ApiError(400, " Orders unable to cancel")
    }

    return res.status(200).json(new ApiResponse(200, order, " Orders cancelled successfully"))

})