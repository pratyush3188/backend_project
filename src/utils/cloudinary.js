import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadoncloudinary=async(loacalfilepath)=>{
    try {
        if(!loacalfilepath) return null
       const response = await cloudinary.uploader.upload(loacalfilepath,
            {
                resource_type:'auto'
            }
        )
        console.log("file is uploaded on cloudinary ",response.url);
        return response
    } catch (error) {
        fs.unlinkSync(loacalfilepath) // remove the locally saved temprory file as the upload operation got failed 
        return null 
    }
}

export {uploadoncloudinary}