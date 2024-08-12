import {User} from '../models/userModel.js'
import jwt, { decode } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import catchAsync from "../handleErrors/catchAsync.js"
import AppError from '../handleErrors/appError.js'
const signToken = (id,role) => {
  return jwt
      .sign({ id,role},
      "ThePassword" ,
      {expiresIn:"100d"},);
  };
  const createSendToken = (user, statusCode, res) => {
    // console.log(user);
    
      const token = signToken(user._id,user.role);
      res.status(statusCode).json({
          status: 'success',
          token,
          data: {
            user
          }

      });
  }

const login=catchAsync(async(req,res,next)=>{
    const {email,password}= req.body;
    //1)check if email and password exist
        if(!email || !password){
          return next(new AppError('please provide email and password',400));
         //return res.status(400).json({msg:'please provide email and password'});

        }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');//password.slect=true
        
   if (!user)// || !(await user.correctPassword(password, user.password))) 
    {
   return next(new AppError('Incorrect email or password', 401));
//return res.status(400).json({msg:'Incorrect email or password'});

    }
    // user.password=undefined
    //   let token=user.genAuthToken()
    //   // 3) If everything ok, create and send token to client
    //   res.status(200).json({
    //     data:user,
    //    token
    //   });
  createSendToken(user, 200, res);
}); 


  const signup=catchAsync(async(req, res) => {
     //const { userName, email,age,phone,gender,password,passwordConfirm} = req.body;
    //  let user=await User.findOne({email:req.body.email})
    //  if(user){
    //   return next(new AppError("you have account already",404))
    //  }
    //try{
    let password=req.body.password
     
    
    password =  bcrypt.hashSync(req.body.password, 8);//8=salt bcrypt
    let users= await User.insertMany([{...req.body,password}])
    let user=users[0]
     // const user =  new User(req.body);
     // const addedUser= await User.save()
     user.password=undefined
     //sendEmail(req.body.email)
    //  let token =jwt.sign({user.email,useri._id,req.},"ThePassword")//
    //  let token=user.genAuthToken()
     //data of user in token
    //  res.status(201).json({
    //   msg: "User Registered Successfully",
    //   token
    // });
    createSendToken(user, 200, res);
  }  )

 const restrictTo = (...roles) => {
    return (req, res, next) => {
    //role=['admin','client','worker']
    
    if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );}
      next();
    };
  };
export {login,signup,restrictTo}
