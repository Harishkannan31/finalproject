require('dotenv').config();
import express from "express";
import { Request, Response, NextFunction } from 'express';
export const app=express();
import cors from 'cors';
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";


// body parser
app.use(express.json({limit:"50mb"}));

//cookie parser
app.use(cookieParser());

// cors -cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));
// routes

app.use("/api/v1",userRouter);
app.use("/api/v1",courseRouter);
app.use("/api/v1",orderRouter);
 



app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Employee Learning Platform!",
    });
});


//TESTING API
app.get("/test",(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message:"API is working",
    })
})

//unknown routes
app.all("*",(req:Request,res:Response,next:NextFunction)=>{
    const err=new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode =404;
    next(err);
}
    )