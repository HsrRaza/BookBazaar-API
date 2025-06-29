import {z} from "zod" 

export const passwordSchema = z
.string()
.min(6," password must be atleast 6 characters long");


export const registerUserSchema = z.object({
    name:z.string().trim()
    .min(3,{})
    .max(10),
    email:z.string().trim().email("Invalid email address"),
    password:passwordSchema,
}) 

export const loginUserSchema = z.object({
    email:z.string().email("Invalid Email Address"),
    password:passwordSchema
})

export const addBookSchema = z.object({
    name:z.string().min(1),
    author:z.string().min(1),
    title:z.string().min(1),
    price:z.number().int().positive(),
    description:z.string().optional(),
    
})

export const addReviewSchema = z.object({
    review:z.string().min(1),
    rating:z.number().int().positive()
})


