const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 문의 폼
router.get('/', (req, res) => {
  res.render('contact');
});

// 문의 저장
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())';

  db.query(sql, [name, email, message], (err) => {
    if (err) throw err;
    res.redirect('/contact');
  });
});

module.exports = router;
