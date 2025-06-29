import { Request, Response } from "express";
import { db } from "../libs/db";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { addBookSchema } from "../validators/validate";



export const  addBook = asyncHandler(async(req:Request, res:Response)=>{
    
    // const {name, author, title, price}= data;
    const user = req.user?.id
    
    if(!user){
        throw new ApiError(401, "Unauthorized Access")
    }
    
    try {
         const validateData = addBookSchema.parse(req.body);
         const {name, author, title, price, description} = validateData

         

        const addBook = await db.book.create({
            data:{
                  name,
                  author,
                  title,
                  price:Number(price),
                  description:description || undefined,
                  

                  

            }
        })

        if(!addBook){
            throw new ApiError(404, "Unable to Add Book")
        }

        return res.status(200).json(new ApiResponse(201, addBook , "Book added Successfully"))
     } catch (error) {
        return new ApiError(500, "Internal Server Error")
     }
})
export const  getAllBooks = asyncHandler(async(req:Request, res:Response)=>{

    const allBooks = await db.book.findMany();

    if(!allBooks){
        throw new ApiError(400, "Unable to fetched ALl books")
    }

    return res.status(200).json(new ApiResponse(200, allBooks,"All Books are fetched Successfully " ))

})
export const  getBookById = asyncHandler(async(req:Request, res:Response)=>{
    try {
        const {bookId} = req.params;
        if(!bookId){
            throw new ApiError(400, "Check Book Id");
        }

        const bookById = await db.book.findFirst({
            where:{id:bookId}
        })

        if(!bookById){
            throw new ApiError(404,"No Book found")
        }


        return res.status(200).json(new ApiResponse(201, bookById, "Book Fetched Successfullly"))

    } catch (error) {
        return new ApiError(500, "Unable to fetch Internal Problem")
        
    }

})
export const  updateBook = asyncHandler(async(req:Request, res:Response)=>{

    const { bookId} = req.params;

    const {name, author, title, price, description} = req.body;

    try {
        if(!bookId){
            throw new ApiError(400, "Book id is required")
        }

        const book = await db.book.findUnique({where:{id:bookId}})
        
        if(book){
            throw new ApiError(404, "Book not found")
        }
           
        const bookUpdate = await db.book.updateMany({
            where:{id:bookId},
            data:{
                 name,
                  author,
                  title,
                  price:Number(price),
                  description:description || undefined,
                 

            }

        })

        if(!bookUpdate){
            throw new ApiError(404, "Unable to update book")
        }

        return res.status(200).json(new ApiResponse(201, bookUpdate, "Book Updated successfully"))

    } catch (error) {
        return 
        
    }

})
export const  deleteBook = asyncHandler(async(req:Request, res:Response)=>{
    try {
         const  {bookId} = req.params;
         if(!bookId){
            throw new ApiError(400, "Book id is required")
         }


         const checkBook = await db.book.findUnique({
            where:{
                id:bookId
            }
         });
         if(!checkBook){
            throw new ApiError(404, "Book Not found ")
         }

         const bookDelete = await db.book.delete({
            where:{
                id:bookId
            }
         })

         if(!bookDelete){
            throw new ApiError(404, "Unable to delete ")
         }

         return res.status(200).json(new ApiResponse(200, bookDelete,"book deleted successfully" ) )
        
     } catch (error) {
        return new ApiError(500, "Internal Error")
        
     }
})