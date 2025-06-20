import express, { Application, Request,Response } from "express";
import cors from "cors"
import {logger} from "./libs/logger"
import {env} from "./libs/env"
import {db} from "./libs/db"



const app:Application = express();
const PORT:Number = +(env.PORT ?? 4001)

app.use(cors())
app.use(express.json())


app.get("/", (req:Request, res:Response )=>{
res.send("Welcome this app");
})


async function startserver() {
    try {
        await db.$connect();
        logger.info("✅ Database connected successfully")

        app.listen(PORT, ()=>{
            logger.info(`🚀 Our app is listening on ${PORT}`)
            
        })

    } catch (err) {
        logger.error("❌ Failed to connect to the database", err)
        process.exit(1)
    }
}

startserver()