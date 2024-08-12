import express from "express";
// import emailCheck from "../middlware/emailCheck.js"
import verifyToken from "../middlewares/verifyToken.js"
import {restrictTo} from "../controllers/authController.js"
import {AddProductToCart} from "../controllers/cartController.js"
import {
    getUsers,
    getOneUser
    // updateUser,
    // deleteUser,
    // nameStartX,
    // agebe20and30,
    //  verifyAccount
    } from "../controllers/userController.js"
const router=express.Router()
 router.get('/', restrictTo('admin'),getUsers); 
 router.get('/:id', getOneUser); 

 router.route('/:productId/ratings')
 router.patch('/add'//,verifyToken
    ,AddProductToCart)
//  .post(
//      verifyToken,
//      restrictTo('client'),
//      createOneRate)
// router.patch('/:id',updateUser);
// router.delete('/:id',deleteUser);
// router.post('/nameStartX',nameStartX)
// router.get('/agebe20and30',agebe20and30)
// router.get('/verify/:token', verifyAccount)
export default router;