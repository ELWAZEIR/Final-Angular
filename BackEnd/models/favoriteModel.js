import mongoose ,{Schema,model}from "mongoose"


import validator from 'validator'
const favoriteSchema=new Schema({
      is_favorite:{
           type:Boolean,
           default:false
      },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:'Product',
            require:[true,"favorite must belong to product "]
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
   //virtual populate
    favoriteSchema.virtual('products',{
        ref:'Product',
        foreignField:'favorite',
        localField:'_id'
        });
        
    export  const Favorite = model('Favorite',favoriteSchema);
    