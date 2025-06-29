import {z} from "zod"

export const addressSchema = z.object({
    lineOne:z.string(),
    lineTwo:z.string(),
    pincode:z.string().length(6),
    country:z.string(),
    city:z.string(),

})

export const UpdateAddressSchema = z.object({
  name: z.string().optional(),
  defaultShippingAddress: z.number().optional(),
  defaultBillingAddress: z.number().optional(),
});
