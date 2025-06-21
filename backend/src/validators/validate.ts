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

