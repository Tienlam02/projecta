const db = require("../model/category");

let data = [];
const listCategory = (req, res) => {
  let sql = "select * from categories";
  let check = req.query.name;
  if (check) {
    sql += " where name like '%" + check + "%'";
  }
  let _page = req.query.page ? req.query.page : 1;
  let pageStart = (_page - 1) * 10;
  sql += " limit " + pageStart + "," + 10;

  const pm = db.load(sql);
  pm.then(function (results) {
    data = results;
    res.render("./category/category", { datas: results });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};

const deleteCategory = (req, res) => {
  //db.load("delete from categories where id =" + req.params.id);
  // console.log(req.param.id);
  const pm = db.delete("delete from categories where id = ?", req.params.id);
  res.redirect("/category");
};
const editCategory = (req, res) => {
  const pm = db.load(`select * from categories where id = ${req.params.id}`);
  pm.then(function (results) {
    console.log(results[0]);
    res.render("./category/edit", { datas: results[0] });
  });
  pm.catch(function (err) {
    console.log(err);
  });
};
const saveCategory = (req, res) => {
  if (req.body.name.trim().length > 0) {
    const pm1 = db.load(
      `select * from categories where name = '${req.body.name}'`
    );
    pm1.then(function (results) {
      if (results[0]) {
        return res.render("./category/category", {
          datas: data,
          mess: "Đã tồn tại danh mục này",
        });
      }
      const pm = db.save(`categories`, req.body, req.params.id);
      pm.then(function (results) {
        res.redirect("/category");
      });
      pm.catch(function (err) {
        console.log(err);
      });
    });
  }
};
const addCategory = (req, res) => {
  console.log(1);
  console.log(data);

  console.log(1);
  if (req.body.name.trim().length > 0) {
    const pm1 = db.load(
      `select * from categories where name = '${req.body.name}'`
    );
    pm1.then(function (results) {
      if (results[0]) {
        return res.render("./category/category", {
          datas: data,
          mess: "Đã tồn tại danh mục này",
        });
      }
      const pm = db.add("categories", { name: req.body.name });
      return res.redirect("/category");
    });
  }
};
module.exports = {
  listCategory: listCategory,
  deleteCategory: deleteCategory,
  addCategory: addCategory,
  editCategory: editCategory,
  saveCategory: saveCategory,
};
