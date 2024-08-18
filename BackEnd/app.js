import express from'express';
import {dbConnect}  from './dbConnect.js'
import { Product } from './models/productModel.js';
import AppError from './handleErrors/appError.js';
import globalErrorHandler from './handleErrors/globalError.js';
import multer from 'multer'
 import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
 import authRoutes from './routes/authRoutes.js'
 import ratingRoutes from './routes/ratingRoutes.js'
import productRoutes from './routes/productRoutes.js'
//  import bodyParser  from "./uploads";
import path from 'path';
import catchAsync from './handleErrors/catchAsync.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getAllProducts } from './controllers/productController.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const __dirname = path.resolve();
// const uploadsFolder=path.join(__dirname,"uploads")
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));


// app.use(cors({})) 

app.use(cors())//{origin:"http://localhost:3000",credentials:true})) 
app.use(express.json());

// app.use(express.static(__dirname + "../uploads"));//work with react
app.use('uploads', express.static('./uploads'));

dbConnect()
 
//test middleware
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
})
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');   },
  filename: (req, file, cb) => {
      
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }});
const upload = multer({ storage: storage }).single('photo')
// Route 
app.post('/api/v1/ng/products/uploads', upload, async(req, res,next) => {
//   const { productName, price,  description ,category} = req.body;
//   if (!productName || !price || !description||!category) {
//     return next(new AppError('Product name, price, and description are required', 400));
// }
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  let photo =req.file ? req.file.path : "";
      //  console.log(req.file.originalname + " file successfully uploaded !!");
        console.log(photo)
        // photo.mv(path.join(uploadsFolder,photo.name))
    // const newProduct = await Product.insertMany({ productName, price,category, description ,photo:req.file?.path||""});
    // console.log(newProduct)
    res.status(200).json({
        msg: "success",
        // data: newProduct,
        photo:req.file
    });
    //upload()
})
//)


 app.use('/api/v1/ng/auth',authRoutes);//sin
 app.use('/api/v1/ng/users',userRoutes);
 app.use('/api/v1/ng/rates',ratingRoutes);
 app.use('/api/v1/ng/products',productRoutes);
 app.use('/api/v1/ng/products?page=:page&limit=:limit',getAllProducts)
 //http://localhost:3000/products?page=1&limit=10


 app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));//update here by return//class AppError extends Error
  });
//exports.ErrorRequestHandler if next function is error
app.use(globalErrorHandler)

export default app;