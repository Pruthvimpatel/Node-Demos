const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO userTB (firstName, lastName, gender) VALUES (?, ?, ?)';
    db.query(query, [userData.firstName, userData.lastName, userData.gender], (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });
  },

  getAll: (callback) => {
    const query = 'SELECT * FROM userTB';
    db.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM userTB WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result[0]);
    });
  },

  update: (id, userData, callback) => {
    const query = 'UPDATE userTB SET firstName = ?, lastName = ?, gender = ? WHERE id = ?';
    db.query(query, [userData.firstName, userData.lastName, userData.gender, id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM userTB WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },
};

module.exports = User;
