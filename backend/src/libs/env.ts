import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
    PORT: z.string().optional(),
    DATABASE_URL:z.string().min(1, "Database url is required "),


    //  send Email
    EMAIL_HOST:z.string().trim(),
    EMAIL_PORT:z.coerce.number(),

    EMAIL_USER:z.string(),
    EMAIL_PASS:z.number(),
    BASE_URL:z.string().url(),
    SENDER_EMAIL:z.string().url()


    // JWT_SECRET:z.string().min(1, "JWT_SECRET is required ")
})

function createEnv(env:NodeJS.ProcessEnv){
   const validationResult = envSchema.safeParse(env);

   if(!validationResult.success)
    throw new Error(validationResult.error.message);
 
   return validationResult.data
}

export const env = createEnv(process.env)