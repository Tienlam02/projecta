const db = require("../model/product");
const dbUser = require("../model/user");
const bcrypt = require("bcrypt");
const listProduct = (req, res) => {
  let sql = "select * from product";
  let checkName = req.query.name || ""; // nếu input search có dữ liệu thì đôr dữ liệu ra
  //console.log(req.query.name);
  if (checkName) {
    sql += " where name like '%" + checkName + "%'";
  }
  let _page = req.query.page ? +req.query.page : 1;
  let pageStart = (_page - 1) * 6; // công thức tính lấy bắt đầu từ đâu
  sql += " limit " + pageStart + "," + 6; // bắt đầu từ đâu và lấy bao nhiu

  const pm = db.load(sql);
  pm.then(function (results) {
    let sql1 = "select count(*) 'total' from product";
    if (checkName) {
      sql1 += " where name like '%" + checkName + "%'";
    }

    const pm1 = db.getTotalRow(sql1);
    pm1.then(function (result) {
      let totalRow = result[0].total; // lấy ra số lượng sản phẩm
      let totalPage = Math.ceil(totalRow / 6); // tính tổng số trang
      return res.render("./uservisit/index", {
        result: results,
        totalPage: totalPage,
        _page: _page,
        check: checkName,
      });
    });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};

const detailProduct = (req, res) => {
  let id = req.params.id;
  let sql = "select * from product where id = " + id;
  let pm = db.load(sql);
  pm.then(function (result) {
    return res.render("./uservisit/detail", {
      result: result,
    });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};
const login = (req, res) => {
  try {
    const pm = dbUser.findByUserName(
      `select * from users where username = '${req.body.username}'`
    );

    pm.then(function (results, reject) {
      if (results[0]) {
        console.log(results[0]);
        if (bcrypt.compareSync(req.body.password.trim(), results[0].password)) {
          req.session.user = results[0];
          req.session.user.permission == 1
            ? (req.session.permission = 2)
            : (req.session.permission = 1);
          console.log(req.session.user);
          console.log(req.session.permission);
          let url = "/";
          if (req.session.permission == 2) {
            url = "/product";
          }
          res.redirect(url);
        } else {
          return res.render("./uservisit/login", {
            messagePW: "Vui lòng kiểm tra lại Password",
          });
        }
      } else {
        return res.render("./uservisit/login", {
          messageUS: "Tài khoản này không tồn tại!. Vui lòng kiểm tra Username",
        });
      }
    });

    pm.catch(function (err) {
      console.log(err);
      // reject(err);
      console.log(0);
    });
  } catch (error) {
    console.log(error);
    return res.render("./error", {
      ms: "Vui lòng kiểm tra lại. Lỗi",
    });
  }
};
const addUser = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.render("./uservisit/register", {
      messageUS: "Đăng kí không thành công!",
    });
  }
  const checkUser = dbUser.findByUserName(
    `select * from users where username = '${req.body.username}'`
  );
  checkUser.then(function (results, reject) {
    if (results[0]) {
      return res.render("./uservisit/register", {
        messageUS: "Đăng kí không thành công!. Username này đã tồn tại",
      });
    }
  });
  const hash_pw = bcrypt.hashSync(req.body.password.trim(), 8); // mã hóa pw
  // $2b$08$nFzhhv7yZA4er2djj8rcYuC0q23Gj2g0Z7tNKMlZi2aVOPO/Dx31G
  const user = {
    fullname: req.body.name.trim(),
    email: req.body.email,
    password: hash_pw,
    address: req.body.address.trim(),
    phonenumber: req.body.phone.trim(),
    username: req.body.username.trim(),
    permission: 0,
    image: req.file.filename,
  };
  const pm = dbUser.add(user);
  pm.then(function (results) {
    res.render("./uservisit/login", {
      messageUS: "Bạn đã đăng kí thành công!",
    });
  });

  pm.catch(function (err) {
    console.log(err);
  });
};
const userLogin = (req, res) => {
  res.render("./uservisit/login");
};
const getAllProByCatId = (req, res) => {
  let sql = `select * from product where categoryid = '${req.params.catId}'`;
  let check = req.query.name || ""; // nếu input search có dữ liệu thì đôr dữ liệu ra
  if (check) {
    sql += " and name like '%" + check + "%'";
  }
  let _page = req.query.page ? req.query.page : 1;
  let pageStart = (_page - 1) * 6; // công thức tính lấy bắt đầu từ đâu
  sql += " limit " + pageStart + "," + 6; // bắt đầu từ đâu và lấy bao nhiu

  const pm = db.load(sql);
  console.log(sql);
  pm.then(function (results) {
    let sql1 = `select count(*) 'total' from product where categoryid = '${req.params.catId}'`;
    if (check) {
      sql1 += " and name like '%" + check + "%'";
    }
    const pm1 = db.getTotalRow(sql1);
    pm1.then(function (result) {
      let totalRow = result[0].total; // lấy ra số lượng sản phẩm
      let totalPage = Math.ceil(totalRow / 6); // tính tổng số trang
      return res.render("./uservisit/index", {
        result: results,
        totalPage: totalPage,
        _page: _page,
        check: check ? check : "quan",
      });
    });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};
const userRegister = (req, res) => {
  res.render("./uservisit/register");
};

module.exports = {
  listProduct: listProduct,
  detailProduct: detailProduct,
  login: login,
  addUser: addUser,
  userLogin: userLogin,
  getAllProByCatId: getAllProByCatId,
  userRegister: userRegister,
};
