import { Rating } from "../models/ratingModel.js";
import catchAsync from "../handleErrors/catchAsync.js"
//get all Rating
const getAllRatings=catchAsync(async(req, res) => {
    const Ratings=await Rating.find()
    res.status(200).json({
        msg:"success",
        data:{Ratings}})
    })
//create rate
const createOneRate=catchAsync(async(res,req,next)=>{
    if(!req.body.product)req.body.product=req.params.productId
    //from token  
    //protect middleware - verifyToken
    if(!req.body.user)req.body.user=req.user.id
    const newRate=await Rating.create(req.body)
    res.status(200).json({
        msg:"success",
        data:{newRate}})
    })
 
 export {getAllRatings,createOneRate}   