
import express from "express";
import  verifyToken from "../middlewares/verifyToken.js";
import {restrictTo} from"../controllers/authController.js"
import { Rating } from "../models/ratingModel.js";
import { Product } from "../models/productModel.js";
// import fileUpload from "express-fileupload"
import path from 'path'
import {
    upload,
    getAllProducts,
    createOneProduct,
    deleteProduct,
    getOneProduct,
    updateProduct,nameProduct,
    categoryProduct
    // addcat2706400
  } from "../controllers/productController.js"
import { createOneRate } from "../controllers/ratingController.js";
const router=express.Router()

router
    .route('/')
    .get(getAllProducts)

router
    .route('/')
    .post(upload.single('photo'), createOneProduct);
     //.post(verifyToken,restrictTo('admin'),upload.single('photo'), createOneProduct)
     

    router
    .route('/searchByName')
    .get(nameProduct)
    router
    .route('/searchByCategory')
    .get(categoryProduct)

//http://localhost:5000/api/v1/products/search?productName=example

// router.get('/verify/:token', verifyAccount)
// router('/addcat', async (req, res) => {
//     // try {
//        await Product.updateMany(
//             { category: { $exists: false } },
//             { $set: { category: "electronics" } }
//         );
//          res.send("done");
//     // }
//     // catch (err) {
//     //     next(err);
//     // }
// })
router
.route('/:id')
.delete(  deleteProduct)
.get(getOneProduct) 
.patch(upload.single("photo"),updateProduct)
router
.route('/:productId/ratings')
.post(
    verifyToken,
    restrictTo('client'),
    createOneRate)
export default router;
//products/:productId/rating