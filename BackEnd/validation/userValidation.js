import joi from 'joi'
const userValidationSchema=joi.object({
    fullName:joi.string().min(3).max(50).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).max(50).required().pattern(new RegExp('^[A-Z][a-z0-9]{8,50}$')),
    address:joi.string().min(3).max(30).required(),
    age:joi.number().min(7).max(100).required(),
    gender:joi.string().required(),



})
const userLogIn=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).max(50).required().pattern(new RegExp('^[A-Z][a-z0-9]{8,50}$')),
    
})
export{ userValidationSchema,userLogIn}