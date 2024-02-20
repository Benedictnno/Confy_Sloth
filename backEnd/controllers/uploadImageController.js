const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");

const fs = require("fs");
const { log } = require("console");

const uploadProductImage = async (req, res) => {
    log(req.files.image.tempFilePath);
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Sparrow-upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  console.log(result.secure_url);

  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = uploadProductImage;
