
 import catchAsync from '../handleErrors/catchAsync.js';
import AppError from '../handleErrors/appError.js'
 import jwt from 'jsonwebtoken'
 import promisify from "express"
 import util from "util"
 import { User } from '../models/userModel.js';
// const verifyToken=(req,res,next)=>{
//     const {token}=req.headers
//     jwt.verify(token,"ThePassword",(err,decoded)=>{
//         if(err)return res.status(401).json({msg:"invalid token"})
//             req.user=decoded
//         next()
//     })
   
// }




const verifyToken= catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    //get token from header
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next(
        new AppError('You are not logged in! Please log in to get access.', 401)
      );
    }
    // 2) Verification token
    
    //The payload is what was used to sign the token.
  const decoded = await util.promisify(jwt.verify)(token, "ThePassword");
    // 3) Check if user still exists
     console.log(decoded);
    
    const currentUser = await User.findById(decoded.id);
    console.log("current",currentUser);

    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('User recently changed password! Please log in again.', 401)
      );
    }
    // GRANT ACCESS TO PROTECTED ROUTE       req.user.id
    req.user = currentUser;
  
    next();

});

export default verifyToken;
/*import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    jwt.verify(token, "ThePassword", (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

export default verifyToken;*/