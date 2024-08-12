import mongoose ,{Schema,model}from "mongoose"


import validator from 'validator'
import { Product } from "./productModel.js";
const ratingSchema=new Schema({
     rate:{
        type: Number,
        min:1,
        max:5
     },
     product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        require:[true,"rate must belong to product "]
     },
     user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        require:[true,"rate must belong to user"]
     }
    },
    {
        timestamps:true
        ,toJSON:{virtuals:true}},
    {toObject:{virtuals:true}}
    );
    ratingSchema.index({product:1,user:1},{unique:true})
   //virtual populate
    // favoriteSchema.virtual('products',{
    //     ref:'Product',
    //     foreignField:'favorite',
    //     localField:'_id'
    //     });
    // res of get product  data include ratings and users who added ratings
ratingSchema.pre(/^find/,function(next){
    this.populate(
        {
          path:'user',
          select:"userName "
        }
    )
    next()
}    
)  
ratingSchema.statics.calcAvgRatings=async function(productId)
{
  const myStatics=await this.aggregate([
    {
        $match:{
            product:productId
        },

    },{
        $group:{
            _id:'$product',
            numRatings:{$sum:1},
            avgRatings:{$avg:'$rating'}
        }
    }
  ])
  if(myStatics.length>0)
{ 
    await Product.findbyIdAndUpdate(productId,{
    ratingQuantity:myStatics[0].numRatings,
    ratingsAvg:myStatics[0].avgRatings,
})
}  else{
    await Product.findbyIdAndUpdate(productId,{
        ratingQuantity:0,
        ratingsAvg:0,
    })
}
}
// update avg rating for one product
ratingSchema.pre('save',function(next){
    this.constractor.calcAvgRatings(this.product)
})
ratingSchema.pre(/^findOneAnd/,async function(next){
     this.r=await this.findOne()
      next()
})
ratingSchema.post(/^findOneAnd/,async function(){
    //findOne() does not work here , query has already executed
    await this.r.constractor.calcAvgRatings(this.r.product)

})

 export const Rating = model('Rating',ratingSchema);
