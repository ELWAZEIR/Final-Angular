//import { Cart } from "../models/cartModel.js";
import catchAsync from "../handleErrors/catchAsync.js"
import AppError from "../handleErrors/appError.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
//get all Rating
// const getAllRatings=catchAsync(async(req, res) => {
//     const cart=await Cart.find()
//     res.status(200).json({
//         msg:"success",
//         data:{Ratings}})
//     })
// //create add to cart
const AddProductToCart = catchAsync(async (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return next(new AppError("Product ID is required", 400));
    }

    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (user.myCart.includes(id)) {
        return next(new AppError("Product already in cart", 400));
    }

    user.myCart.push(product);
    await user.save();

    res.status(200).json({
        msg: "Product added to cart successfully",
        data: { cart: user.myCart }
    });
});

export { AddProductToCart };
    //  const getAllProductsOnCart=catchAsync(async(req, res) => {
    //     const productsOnMyCart=await Cart.find({addedToCart:true})
    //     res.status(200).json({
    //         msg:"success",
    //         data:{productsOnMyCart}})
    //     })  

    //     const deleteFromCart=catchAsync(async(res,req,next)=>{
    //         if(!req.body.product)req.body.product=req.params.id
    //    //     //from token  
    //    //     //protect middleware - verifyToken
    //        if(!req.body.user)req.body.user=req.user.id
    //         const deleteProductFromCart=await Cart.findByIdAndUpdate(req.params.id,{addedToCart:false})
    //         res.status(200).json({
    //             msg:"success",
    //             data:null})
    //         })
//    export {addProductToCart,}   