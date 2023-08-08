const express = require("express");
const session = require("express-session"); // lưu lại thông tin trong session
require("express-async-errors");
const app = express();
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");
const routerUserVisit = require("./routers/uservisit");
const routerCategory = require("./routers/category");
const routerProduct = require("./routers/product");
const routerUser = require("./routers/user");
app.use(
  express.urlencoded({
    extended: true,
  })
);
const dbCat = require("./model/category");
app.use((req, res, next) => {
  const pm = dbCat.load("select * from categories");
  pm.then(function (results) {
    res.locals.lcCate = results;
    next();
  });
  pm.catch(function (err) {
    console.log(err);
  });
});
app.use((req, res, next) => {
  if (req.session.permission === null) {
    req.session.permission = false;
    return next();
  }
  res.locals.user = req.session.user;
  res.locals.permission = req.session.permission;
  next();
});

app.use("/", routerUserVisit); // tạo thêm router đn đk, sau đó luu đn và luu tt vào sisstion , tạo mdl nếu oke thì chó qua

function checkLogin(req, res, next) {
  if (!req.session.user) {
    console.log("eo phai user");
    return res.redirect("/login");
  }
  next();
}
app.use("/user", checkLogin, routerUser);

function checkPermission(req, res, next) {
  if (req.session.permission == 2) {
    console.log("is admin");
    return next();
  }
  console.log("eo phai ad");
  return res.render("./uservisit/login", {
    messageUS:
      "Tài khoản của bạn không có quyền này!. Vui lòng đăng nhập bằng tài khoản admin!!!!",
  });
}
app.use("/category", checkLogin, checkPermission, routerCategory);
app.use("/product", checkLogin, checkPermission, routerProduct);

// app.use((err, req, res, next) => {
//   return res.render("./error", {
//     ms: "Vui lòng kiểm tra lại. Lỗi",
//   });
// });

app.listen(3000, () => {
  console.log(`app is runing is 3000`);
});
