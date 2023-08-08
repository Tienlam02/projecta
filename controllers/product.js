const db = require("../model/product");
let data = [];
let totalPa;
let pag;
const listProduct = (req, res) => {
  let sql =
    "select p.*, c.name 'catname' from product p, categories c where p.categoryid = c.id";
  let check = req.query.name; // nếu input search có dữ liệu thì đôr dữ liệu ra
  if (check) {
    sql += " and p.name like '%" + check + "%'";
  }
  let _page = req.query.page ? req.query.page : 1;
  let pageStart = (_page - 1) * 5; // công thức tính lấy bắt đầu từ đâu
  sql += " limit " + pageStart + "," + 5; // bắt đầu từ đâu và lấy bao nhiu

  const pm = db.load(sql);
  pm.then(function (results) {
    data = results;
    const pm1 = db.getTotalRow("select count(*) 'total' from product");
    pm1.then(function (result) {
      let totalRow = result[0].total; // lấy ra số lượng sản phẩm
      let totalPage = Math.ceil(totalRow / 5); // tính tổng số trang
      totalPa = totalPage;
      pag = _page;

      return res.render("./product/home", {
        datas: results,
        totalPage: totalPage,
        _page: _page,
      });
    });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};
const listCategory = (req, res) => {
  let sql = "select name from categories";
  const pm = db.load(sql);
  pm.then(function (results) {
    // console.log(results);
    return res.render("./product/product", { datas: results });
  });
  pm.catch(function (err) {
    console.log(err);
  });
  res.render("./product/home");
};

const deleteProduct = (req, res) => {
  const pm = db.delete("delete from product where id = ?", req.params.id);
  res.redirect("/product");
};
const editProduct = (req, res) => {
  const pm1 = db.load("select * from categories");
  pm1.then(function (optionss) {
    const pm = db.load(`select * from product where id = ${req.params.id}`);
    pm.then(function (results) {
      res.render("./product/edit", { options: results[0], optionss: optionss });
    });
    pm.catch(function (err) {
      console.log(err);
    });
  });
};
const saveProduct = (req, res) => {
  console.log(req.body);
  const pm1 = db.load(`select * from product where name = '${req.body.name}'`);
  pm1.then(function (optionss) {
    if (optionss[0]) {
      return res.render("./product/home", {
        datas: data,
        totalPage: totalPa,
        _page: pag,
        mess: "Đã tồn tại sản phẩm này",
      });
    }
    const entity = {
      name: req.body.name,
      categoryid: req.body.categoryid,
      price: req.body.price,
      image: req.file.filename,
      description: req.body.description,
      quantity: req.body.quantity,
    };
    const pm = db.save("product", entity, req.params.id);
    pm.then(function (results) {
      console.log(results);
      res.redirect("/product");
    });
    pm.catch(function (err) {
      console.log(err);
    });
  });
  // res.send("success");
};
const addProduct = (req, res) => {
  console.log(req.body);

  const pm1 = db.load(`select * from product where name = '${req.body.name}'`);
  pm1.then(function (optionss) {
    if (optionss[0]) {
      return res.render("./product/home", {
        datas: data,
        totalPage: totalPa,
        _page: pag,
        mess: "Đã tồn tại sản phẩm này",
      });
    }
    const file = req.file;
    if (!file) {
      return res.redirect("/product/add");
    }
    const entity = {
      name: req.body.name,
      categoryid: req.body.categoryid,
      price: req.body.price,
      image: req.file.filename,
      description: req.body.description,
      quantity: req.body.quantity,
    };
    const pm = db.add(entity);
    res.redirect("/product");
  });
};
const fromAdd = (req, res) => {
  const pm = db.loadCategory("select * from categories");
  pm.then(function (results) {
    // console.log(results);
    res.render("./product/add", { options: results });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};

module.exports = {
  listProduct: listProduct,
  deleteProduct: deleteProduct,
  addProduct: addProduct,
  editProduct: editProduct,
  saveProduct: saveProduct,
  fromAddProduct: fromAdd,
  listCategory: listCategory,
};
