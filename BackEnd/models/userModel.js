import mongoose ,{Schema,model}from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import validator from 'validator'
const userSchema=new Schema({
    fullName:{
        type: String,
        required: [true, 'Please tell us your name!'],
        trim:true,
        minlength:3,
        maxlength:30,
      },
    // lastName:{
    //   type: String,
    //     required: [true, 'Please tell us your name!'],
    //     trim:true,
    //     minlength:3,
    //     minlength:30
    // },
    age:{
        type:Number,
        min:7
        ,max:100,
        required:[true,'please inter your age']},
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: [true,'the email is exist already'],
        lowercase: true,
        trim:true,
        min:8,
        max:200,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    address:{
        type: String,
        required: [true, 'Please provide your address'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 12,
        maxlength:200,
        select:false,
        trim:true,
      },
      // passwordConfirm:{
      //   type: String,
      //   required: [true, 'Please confirm a password'],
      //   minlength: 12,
      //   maxlength:50,
      //   trim:true,
      //   // validate:function(e){
      //   //   return e===this.password
      //   // },
      //   // Message:"passwordes are not the same"
      // },
    gender:{   
         type: String,
        enum: ['male', 'female'],
    
        required: [true, 'Please tell us your gender'],
        trim:true,}
        ,
    // phone:{
    //     type:String,
    //     minlength:9,
    //     maxlength:50,
    // required:[true,"please"]},
    // isLoggedin:{
    //     type:Boolean,
    //     default:true,
    // },
   myCart:[{
    type:mongoose.Schema.ObjectId,
    ref:'Product',
  
   }],
    role:{
        type:String,
        enum:['admin','client'],
        default:"client",
    },
    __v:{
    type:Number,
  select:false}//email
    // isConfirm:{
    //   type:Boolean,
    //   default:false
    // }
   
},{
  timestamps:true
,toJSON:{virtuals:true}
},)
userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    // Hash the password with cost of 8
    
    this.password = await bcrypt.hash(this.password, 8);//8=salt bcrypt
    // Delete passwordConfirm field
    // this.passwordConfirm = undefined;
    next();
  });
  
 
 
  userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ isLoggedin: { $ne: false } });
    next();
  });
  userSchema.methods.correctPassword = async function( passwordCurrent, userPassword) {
    return await bcrypt.compare(passwordCurrent, userPassword);
  };
  //generate token to registed user
  // userSchema.methods.genAuthToken=  function(){
  //   return  jwt.sign({ email: this.email},"ThePassword")//this.toJson()
  // }
  userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimestamp < changedTimestamp;
    }
    // False means NOT changed
    return false;
  };
  
export const User=model("User",userSchema)