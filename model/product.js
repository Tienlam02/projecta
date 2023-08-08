const mysql = require("mysql");
const mysqlConfig = require("../config/config.json");
const pool = mysql.createPool(mysqlConfig.mysql);
module.exports = {
  load: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getProductByCat: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  loadCategory: function (sql) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  delete: function (sql, id) {
    return new Promise(function (resolve, reject) {
      pool.query(sql, [id], function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  add: function (entity) {
    return new Promise(function (resolve, reject) {
      const sql = `INSERT INTO product set ? `;
      pool.query(sql, entity, function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  save: function (table, entity, options) {
    return new Promise(function (resolve, reject) {
      const sql = `update  ${table} set ? where id = ? `;
      const kq = pool.query(sql, [entity, options], function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  getTotalRow: function (sql) {
    return new Promise(function (resolve, reject) {
      const kq = pool.query(sql, function (err, results) {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};
