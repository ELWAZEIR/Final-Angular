// import { User
    
//  } from "../models/userModel.js";
//  import bcrypt from 'bcryptjs'
//  const emailCheck=async(req,res,next)=>{
    
//     let userfound=await User.findOne({email:req.body.email})
//     if(userfound)return  res.status(404).json({msg:"already rejested"})
    
//       req.body.password=bcrypt.hashSync(req.body.password,8)
      
//     next()
//  }
//  export default emailCheck;