import {asynchandler} from '../utils/asynchandler.js'
import {apierror} from '../utils/apierror.js'
import { User } from '../models/user.modal.js'
import {uploadoncloudinary} from '../utils/cloudinary.js'
import {Apirespoonse} from '../utils/apiresponse.js'
const registerUser = asynchandler(async(req,res)=>{
  //get user detailes from frontend 
//validation-non empty 
// check if user already exist : check from username and email 
//check for images and check for avatar 
//upload them to cloudinary 
// create user objects -creat entry in db 
// remove password and refreah token field from response 
// chekc for user creation 
//return res 

   const {fullname,username,email,password}=req.body // coming data from form or from json 
    console.log(email);

if(
    [fullname,email,username,password].some((field)=>field?.trim()==='')
){
    throw new apierror(400,"all feilds are required")
}
    
const existeduser = User.findOne({
    $or:[{username},{email}]
})
if (existeduser) {
    throw new apierror(409, "User with email or username already exist   ")
}
const avatarLocalpath = req.files?.avatar[0]?.path
const coverImagelocalpath = req.files?.CoverImage[0]?.path;

if ( !avatarLocalpath) {
    throw new apierror(400,"Avatar file is required")
}

 const avatar = await uploadoncloudinary(avatarLocalpath)
 const coverimage  = await uploadoncloudinary(coverImagelocalpath)
 

 if(!avatar){
        throw new apierror(400,"Avatar file is required")

 }

const user =  await User.create({
    fullname,
    avatar:avatar.url,
    coverimage:coverimage?.url || "",
    email,
    password,
    username:username.toLowerCase()


})

// console.log(existeduser);

// console.log(req.files)
const createduser = await User.findById(user._id).select(
    "-password -refreshtoken"
)
if(!createduser){
    throw new apierror(500, "somethingwent wrong while regestring user ")
}
return res.status(201).json(
    new Apirespoonse(200,createduser,"User registered Succesfully  ")
)
})

export {registerUser} 