import express from'express';
import {dbConnect}  from './dbConnect.js'
import { Product } from './models/productModel.js';
import AppError from './handleErrors/appError.js';
import globalErrorHandler from './handleErrors/globalError.js';

 import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
 import authRoutes from './routes/authRoutes.js'
 import ratingRoutes from './routes/ratingRoutes.js'
import productRoutes from './routes/productRoutes.js'
import path from 'path';
import catchAsync from './handleErrors/catchAsync.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getAllProducts } from './controllers/productController.js';
const __dirname = path.resolve();
const app = express();

// app.use(cors())
app.use(cors({origin:"http://localhost:4200",credentials:true})) 
app.use(express.json());
// app.use('uploads', express.static('./uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

dbConnect()
 
//test middleware
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
})




 app.use('/api/v1/ng/auth',authRoutes);//sin
 app.use('/api/v1/ng/users',userRoutes);
 app.use('/api/v1/ng/rates',ratingRoutes);
 app.use('/api/v1/ng/products',productRoutes);
 app.use('/api/v1/ng/products?page=:page&limit=:limit',getAllProducts)
 


 app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));//update here by return//class AppError extends Error
  });
//exports.ErrorRequestHandler if next function is error
app.use(globalErrorHandler)

export default app;