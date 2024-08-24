import AppError from "../handleErrors/appError.js";
import catchAsync from "../handleErrors/catchAsync.js";
import { Product } from "../models/productModel.js";
import multer from "multer";
    import path from 'path'
import { deleteOne } from "./factory.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pjpeg|svg|webp|pjp|jfif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};
// Initialize `multer` with the storage options and file filter
const upload =multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Limit file size to 5MB
});

// create
const createOneProduct = catchAsync(async (req, res, next) => {
    const { productName, price,  description ,category} = req.body;
    // Ensure required fields are present
    if (!productName || !price || !description||!category) {
        return next(new AppError('Product name, price, and description are required', 400));
    }
    if(!req.file){
        return next(new AppError('product Photo are required', 500));
    }
      console.log(req.file)
        const photo= `http://localhost:5000/uploads/${req.file?.filename}`;
    const newProduct = await Product.create({ productName, price,category, description ,photo});
    console.log(newProduct)
    res.status(200).json({
        msg: "success",
        data: newProduct,
        
    });

});
   
    //get all products
const getAllProducts=catchAsync(async(req, res,next) => {
    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
    
        const startIndex = (page - 1) * limit;
        const total = await Product.countDocuments();
    
        const products = await Product.find().sort({createdAt:-1}).skip(startIndex).limit(limit);
    
        res.status(200).json({
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            data: products
        });
    });
    
  
    //get product by id
const getOneProduct=catchAsync(async(req,res,next)=>{
    const productId=req.params.id
    let product =await Product.findById(productId).populate('ratings')
    if(!product){
        return next(new AppError("product not found",404))
    }
    res.status(200).json({status:"success",data:{product}})
})
const deleteProduct=catchAsync(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return next(new AppError("product not found",404))
    }
    const deletedProduct=await Product.findByIdAndDelete(product)
    res.status(204).json({status:"success",data:null})
})

const updateProduct=catchAsync(async(req,res,next)=>{
    const productId=req.params.id
    let product =await Product.findById(productId)
    if(!product){
        return next(new AppError("product not found",404))
    }
    
    const updatedOne= await Product.findByIdAndUpdate(
        req.params.id, req.body,{
            new: true,
            runValidators: true
          });
    res.status(200).json({status:"success",data:{updatedOne}})

})
// const deleteProduct=deleteOne(Product)
//  const addcat = async (req, res, next) => {
//     // try {
//       const products=  await Product.updateMany(
//             { category: { $exists: false } },
//             { $set: { category: "electronics" } }
//         );
//         return res.send("done");
//     // }
//     // catch (err) {
//     //     next(err);
//     // }
// };
const nameProduct = catchAsync(async (req, res, next) => {
    const { productName } = req.query;
    // console.log(productName)
    if (!productName) {
        return res.status(400).json({ msg: "Please provide a product name in the query string" });
    }
    
    try{
     const data = await Product.find({  productName: { $regex: `^${productName}`, $options:'i' }})//({  userName: { $regex: `^${productName } });
    if (data.length > 0) {
        res.status(200).json({ msg: "Success found", data });
    } else {
        // No products found
        res.status(404).json({ msg: "No products found" });
    }}
    catch (error) {
        // Handle database errors
        return next(new AppError("Something went wrong while searching for products", 500));
    }
});
const categoryProduct = catchAsync(async (req, res, next) => {
    const { category } = req.query;
    if (!category) {
        return res.status(400).json({ msg: "Please provide a category in the query string" });
    }
try{
    const data = await Product.find({ 
        category: { $regex: `^${category}`, $options:'i' }//({  userName: { $regex: `^${userName}`,$options:'i' }});
    });
    if (data.length > 0) {
        res.status(200).json({ msg: "Success found", data });
    } else {
        // No products found
        res.status(404).json({ msg: "No products found" });
    }
}
catch (error) {
    // Handle database errors
    return next(new AppError("Something went wrong while searching for products", 500));
}
})
export{
    getAllProducts,
    createOneProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
    upload,
    nameProduct,
    categoryProduct
}
/**
//JS file on node side

var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require("fs");
var app = express();
console.log('étape 0');
app.use(express.static('mesStatic'));
app.use(fileUpload());
console.log('étape 1');
app.get('/indexFileUpload.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "indexFileUpload.htm" );
})
console.log('étape 2');
app.post('/file_upload', function (req, res) {

   console.log('étape 3');
   console.log('req.files:' , req.files);
   if (!req.files) {
       res.send('No files to upload.');
       return;
   }

   console.log('req.files.file.data:' , req.files.file.data);
   var bufDataFile = new Buffer(req.files.file.data, "utf-8");
   console.log('étape 3.1');
   console.log('__dirname : ' + __dirname);
 
  */
 