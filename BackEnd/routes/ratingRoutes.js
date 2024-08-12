import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {restrictTo} from"../controllers/authController.js"
import {

    getAllRatings,
    createOneRate,
  } from "../controllers/ratingController.js"
const router=express.Router()
router
    .route('/')
    .get(getAllRatings)
    .post(verifyToken,restrictTo('client'),createOneRate);
// router.post('/signup',signup);

// router.get('/verify/:token', verifyAccount)
export default router;