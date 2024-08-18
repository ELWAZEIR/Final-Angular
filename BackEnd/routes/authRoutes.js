import express from "express";
// import emailCheck from "../middlewares/emailCheck.js"
import {

    signup,
    login,
  } from "../controllers/authController.js"
import { validation } from "../validation/validation.js";
import { userLogIn, userValidationSchema } from "../validation/userValidation.js";
const router=express.Router()
// router.post('/login',login)
// router.post('/signup',,signup);
router.post('/signup',validation(userValidationSchema),signup);
router.post('/login',validation(userLogIn),login)


// router.get('/verify/:token', verifyAccount)
export default router;