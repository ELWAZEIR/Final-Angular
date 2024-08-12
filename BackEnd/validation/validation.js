// import { Schema } from "mongoose";

export const validation =(schema)=>{
    return (req,res,next)=>{
        let x=schema.validate({...req.body,...req.params},{AbortEarly:false})
        if(x.error){
             console.log(x.error.details)
             res.status(422).json({message:"Error",err:x.error.details})
        }
        else{
            next()
        }
        
    }
}