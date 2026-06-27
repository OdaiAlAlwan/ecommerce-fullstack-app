const multer = require("multer");
const ApiError = require("../utils/ApiError");


const multerOptions = () => {
  const Memorystorage = multer.memoryStorage();
  // fileFilter
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only images allowe", 400, false));
    }
  };
  const upload = multer({ storage: Memorystorage, fileFilter: multerFilter });
  return upload
}





exports.uploadSingleImage = (fieldname) =>  multerOptions().single(fieldname);



exports.uploadMixOfImages = (fieldname) =>  multerOptions().fields(fieldname)
