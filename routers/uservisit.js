const express = require("express");
const multer = require("multer");
const {
  listProduct,
  detailProduct,
  userLogin,
  userRegister,
  addUser,
  login,
  getAllProByCatId,
} = require("../controllers/uservisit");
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
routers.get("/detail/:id", detailProduct);
routers.get("/register", userRegister);
routers.post("/register", upload.single("image"), addUser);
routers.post("/login", login);
routers.get("/login", userLogin);
routers.get("/getProduct/:catId", getAllProByCatId);
module.exports = routers;
