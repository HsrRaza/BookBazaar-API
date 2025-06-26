import {z} from "zod"

export const createCartSchema = z.object({
    userId:z.string(),
    bookId:z.string(),
    quantity:z.number(),
})

export const changeQuantitySchema = z.object({
    quantity:z.number()
})