const express = require("express");
const multer = require("multer");
const {
  logout,
  cart,
  getCart,
  deleteCart,
  viewProfile,
  updateProfile,
  getAllUser,
  editPermission,
} = require("../controllers/user");
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

routers.get("/logout", logout);
routers.get("/cart", cart);
routers.get("/getCart", getCart);
routers.get("/delete/Cart/:id", deleteCart);
routers.get("/viewProfile", viewProfile);
routers.get("/getAllUser", getAllUser);
routers.post("/updateProfile", upload.single("image"), updateProfile);
routers.get("/editPermission", editPermission);

module.exports = routers;
