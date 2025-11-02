const asynchandler=(requesthandler)=>{
   return (req,res,next)=>{
        Promise.resolve(requesthandler(req,res,next)).catch((err)=>{next(err)})
    }
}

export {asynchandler}


// const asynchandler= (fxn)=> async (req,res,next)=>{
// try {
//     await fxn(req,res,next)
// } catch (error) {
//     res.status(error.code||500).json({
//         success:true,
//         message:error.message
//     })
// }

// }