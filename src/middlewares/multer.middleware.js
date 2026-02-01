// src/middlewares/multer.middleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.resolve("public", "temp");

// Make sure the temp folder exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    // safer filename: timestamp + original name
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  }
});

// optional: add file size limit and basic fileFilter (images only)
const fileFilter = (req, file, cb) => {
  // accept images only
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter
});
