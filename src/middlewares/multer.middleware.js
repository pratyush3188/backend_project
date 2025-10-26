import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      //file name should be different like we can give prufix suffix and different math function like math.random for genrating random numbers for filr upload likr pr(1).png and pr(2).png
      cb(null, file.originalname)
    }
  })
  

  export const upload = multer({
    storage,
  })