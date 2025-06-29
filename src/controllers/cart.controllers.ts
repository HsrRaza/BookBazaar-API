import { Request, Response } from "express";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { changeQuantitySchema, createCartSchema } from "../validators/cartSchema";
import { Book } from "@prisma/client";


export const addItemToCart = asyncHandler(async (req: Request, res: Response) => {

    // check for the existance of the same product in users cart and alter the quantity as required 

    const validateData = createCartSchema.parse(req.body);

    let product: Book

    product = await db.book.findUniqueOrThrow({
        where: {
            id: validateData.bookId
        },
    })

    if (!product) {
        throw new ApiError(400, "Product Not found ");
    }

    const cart = await db.cartItem.create({
        data:{
            userId:req.user!.id,
            bookId:product.id,
            quantity:validateData.quantity,

        }
    });
    if(!cart){
        throw new ApiError(400, "Unable to create Cart Item");
    }

    return res.status(200).json(new ApiResponse(200, cart,"Cart Is created Successfully " ))



})

export  const deleteItemFromCart = asyncHandler(async(req:Request, res:Response)=>{

    // check if user is deleting it's own cart 

    const  {cartId} = req.params;

    if(!cartId){
        throw new ApiError(404, "Cart Id not found")
    }

    const checkCart = await db.cartItem.findUniqueOrThrow({
        where:{
            id:cartId,
        }
    })
    if(!checkCart){
        throw new ApiError(404, "Cart not found")
    }

    const cartDelete = await db.cartItem.delete({
        where:{
            id:cartId
        }
    })

    if(!cartDelete){
        throw new ApiError(400, "Unable to delete cart Item")
    }

    return res.status(200).json(new ApiResponse(200, cartDelete, "Cart item deleted Successfully"))

})
export  const changeQuantity = asyncHandler(async(req:Request, res:Response)=>{

    // check if user is updating it's own cart 
    
    const {cartId }= req.params
    
    const  validateData = changeQuantitySchema.parse(req.body);
    const updatedCart = await db.cartItem.update({
        where:{
            id: cartId
        },
        data:{
            quantity:validateData.quantity
        }
    })

    return res.status(200).json(new ApiResponse(200, updatedCart, "cart quantity is updated sucessfully "))

})
export  const getCart = asyncHandler(async(req:Request, res:Response)=>{

    const cart = await db.cartItem.findMany({
        where:{
            userId:req.user?.id
        },
        include:{
            Book:true
        }


    })

    return res.status(200).json(new ApiResponse(200, cart, "cart fetched successfully "))

})