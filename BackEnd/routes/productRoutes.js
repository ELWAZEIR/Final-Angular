
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
    updateProduct,
    // addcat2706400
  } from "../controllers/productController.js"
import { createOneRate } from "../controllers/ratingController.js";
const router=express.Router()
// router.use(fileUpload())
//http://localhost:3000/products?page=1&limit=10
router
    .route('/')
    .get(getAllProducts)

    router.route('/').post(upload.single('photo'), createOneProduct);
                       //.post(verifyToken,restrictTo('admin'),upload.single('photo'), createOneProduct)
     

    router
    .route('/:id')
    .delete( verifyToken, deleteProduct)
    .get(getOneProduct)
    .patch(verifyToken,upload.single("photo"),updateProduct)

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
.route('/:productId/ratings')
.post(
    verifyToken,
    restrictTo('client'),
    createOneRate)
export default router;
//products/:productId/rating