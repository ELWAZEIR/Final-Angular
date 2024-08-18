import mongoose ,{Schema,model}from "mongoose"


import validator from 'validator'
const productSchema=new Schema({
    productName:{
        type: String,
        required: [true, 'Product name require!'],
        trim:true,
        minlength:3,
        maxlength:100,
    },
    price:{
        type:Number,
        min:1
        ,max:1000000000000,
        required:[true,'please inter price']
    },
    description:{
        type:String,
        trim:true,
        required:true,
    },
    photo:{
        type:String,
    
        default:"",

    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        require:true
    },
cloudinary_id:{type:String,
},
status:{type :String,
    enum:["created","pending","selled"],
    default:"created"},
is_available:{
    type:Boolean,
    default:true
},
quantity:{
    type:Number,
    min:0
    ,max:100000000000000,

},
ratingsAvg:{
    type:Number,
    default:0,
    min:0,
    max:5,
    set:value =>Math.round(value*10)/10 //4.6666 46.666  4.7
},
ratingQuantity:{
    type:Number,
    default:0
},

favorite:{
    type:mongoose.Schema.ObjectId,
    ref:'Favorite',
   
    },  
    __v:{
        type:Number,
      select:false},
  
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  },)

   //virtual populate
   //when get one product will see array of ratings there
   productSchema.virtual('ratings',{
    ref:'Rating',
    foreignField:'Product',//from rating model
    localField:'_id'
    });
  export const Product=model("Product",productSchema)
