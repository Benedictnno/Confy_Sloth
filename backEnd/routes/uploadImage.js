const express = require("express");
const uploadProductImage = require("../controllers/uploadImageController");
const router = express.Router();

router.route("/").post(uploadProductImage);

module.exports = router;
