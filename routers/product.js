const express = require("express");
const multer = require("multer");
const {
  listProduct,
  deleteProduct,
  addProduct,
  editProduct,
  fromAddProduct,
  saveProduct,
} = require("../controllers/product");
const routers = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // chọn nơi luu
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // lưu tên file ảnh
  },
});
var upload = multer({ storage: storage }); // cấu hình

routers.get("", listProduct);
routers.get("/add", fromAddProduct);
routers.post("/add", upload.single("image"), addProduct);
routers.get("/edit/:id", editProduct);
routers.post("/edit/:id", upload.single("image"), saveProduct);
routers.get("/delete/:id", deleteProduct);

module.exports = routers;
