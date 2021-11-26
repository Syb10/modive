const util = require('util');
const multer = require('multer');


//define storage for the images
const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function(request, file, callback) {
    callback(null, file.originalname);
  },
});


//https://www.youtube.com/watch?v=sfqB6_cMDrI&list=RDCMUCsvMopMspsGw89AWim0FMfw&index=3
const fileFilter = function(req, files, cb) {
  const allowedTypes = [
    "image/png", 
    "image/jpg",
    "application/pdf", 
    "application/msword", 
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  
    if(!allowedTypes.includes(files.mimetype)){
      const error = new Error("Wrong file type");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false); 
    }
  
  cb(null, true);
}

//https://www.bezkoder.com/node-js-upload-store-images-mongodb/
var uploadFile = multer({
  storage: storage,
  fileFilter
}).array("files");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;