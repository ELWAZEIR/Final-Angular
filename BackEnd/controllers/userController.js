import {User} from '../models/userModel.js'

import catchAsync from "../handleErrors/catchAsync.js"
//get all users
const getUsers=catchAsync(async(req, res) => {
    let users=await User.find()
    res.status(200).json({msg:"success",users})
    })
//get user by id
const getOneUser=catchAsync(async(req, res) => {
        let userId=req.params.id
        let user=await User.findById(userId).populate('myCart')
      if(!user){
        return next(new AppError("not found user",401))
      }
          res.status(200).json({msg:"success",user})
    })
      
    
    export {
        getUsers,
        getOneUser
    }