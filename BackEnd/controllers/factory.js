import catchAsync from "../handleErrors/catchAsync.js"
import AppError from "../handleErrors/appError.js"
 const deleteOne=Model=>{
    catchAsync(async(req,res,next)=>{
        const doc=await Model.findById(req.params.id)
        if(!doc){
            return next(new AppError("document not found",404))
        }
        const deletedProduct=await Model.findByIdAndDelete(product)
        res.status(204).json({status:"success",data:null})
    })
}
export {deleteOne}