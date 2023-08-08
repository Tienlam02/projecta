const express = require("express");
const {
  listCategory,
  deleteCategory,
  addCategory,
  editCategory,
  saveCategory,
} = require("../controllers/category");
const routers = express.Router();

routers.get("", listCategory);
routers.post("/add", addCategory);
routers.get("/edit/:id", editCategory);
routers.post("/edit/:id", saveCategory);
routers.get("/delete/:id", deleteCategory);

module.exports = routers;
