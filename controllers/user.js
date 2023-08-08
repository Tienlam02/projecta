const db = require("../model/user");

const bcrypt = require("bcrypt"); // mã hóa thông tin
var ls = require("local-storage");
let arrCart = [];

const logout = (req, res) => {
  req.session.user = null;
  req.session.permission = 0;
  res.redirect("/login");
};
const viewProfile = (req, res) => {
  res.render("user/viewProfile", { user: req.session.user });
};
const getAllUser = (req, res) => {
  db.load("select * from users order by id desc").then((results) => {
    res.render("user/allUser", { users: results });
  });
};
const updateProfile = (req, res) => {
  const user = {
    fullname: req.body.fullname.trim(),
    email: req.body.email,
    address: req.body.address.trim(),
    phonenumber: req.body.phonenumber.trim(),
    image: req.file ? req.file.filename : req.session.user.image,
  };
  const pm = db.save(`users`, user, req.session.user.id);
  pm.then((results) => {
    const newUser = {
      id: req.session.user.id,
      fullname: req.body.fullname.trim(),
      email: req.body.email,
      username: req.session.user.username,
      address: req.body.address.trim(),
      phonenumber: req.body.phonenumber.trim(),
      image: req.file ? req.file.filename : req.session.user.image,
      permission: 0,
    };
    req.session.user = newUser;
    res.redirect("/user/viewProfile");
  });
  //res.render("user/viewProfile", { user: req.session.user });
};
const cart = (req, res) => {
  let item = arrCart.find((value) => value.id === req.query.id);
  if (item) {
    item.quantity += 1;
    item.price += +req.query.price;
  } else {
    arrCart.push({
      id: req.query.id,
      name: req.query.name,
      price: +req.query.price,
      image: req.query.image,
      quantity: 1,
    });
  }
  ls.set("arrCart", JSON.stringify(arrCart));
  console.log(JSON.parse(ls.get("arrCart")));
  res.redirect(req.headers.referer);
};
const getCart = (req, res) => {
  let arr = JSON.parse(ls.get("arrCart"));
  req.session.arr = arr;
  res.render("user/cart", { arr });
};
const editPermission = (req, res) => {
  let permission = +req.query.permission;
  console.log(typeof permission);
  if (permission === 0) {
    permission = 1;
  } else {
    permission = 0;
  }

  const pm = db.load(
    `update users set permission = ${permission} where id = ${req.query.id}`
  );
  pm.then(function (results) {
    res.redirect("/user/getAllUser");
  });
  pm.catch(function (err) {
    console.log(err);
  });
};
const deleteCart = (req, res) => {
  let arr = [];
  if (arrCart) {
    arrCart = arrCart.filter((value) => value.id != req.params.id);
    arr = arrCart;
    console.log(arr.length);
    console.log(arrCart.length);
  }
  ls.set("arrCart", JSON.stringify(arr));
  res.redirect("/user/getCart");
};

module.exports = {
  logout: logout,
  cart: cart,
  getCart: getCart,
  deleteCart: deleteCart,
  viewProfile: viewProfile,
  updateProfile: updateProfile,
  getAllUser: getAllUser,
  editPermission: editPermission,
};
