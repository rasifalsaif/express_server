import express, { NextFunction, Request, Response } from "express"
import {Pool } from "pg"
import config from "./config"
import initDB, { pool } from "./config/db"
import logger from "./middleware/logger"
import { userRoutes } from "./modules/user/user.route"
import { todoRoutes } from "./modules/todo/todo.route"
import { authRoutes } from "./modules/auth/auth.route"



const app = express()


//parser
app.use(express.json())


//initializing db


initDB()




app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello vai kemon achen?')
})

//users CRUD
app.use("/users", userRoutes)



//todo crud


app.use("/todos", todoRoutes)

//auth rputes
app.use("/auth", authRoutes)





//NOT found
app.use((req: Request, res: Response)=>{
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

export default app;
