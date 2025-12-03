const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 로그인 페이지
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('login', { error: null });
});

// 로그인 처리
router.post('/login', (req, res) => {
  const { login_id, password } = req.body;

  const sql = 'SELECT * FROM users WHERE login_id = ? AND password = ?';
  db.query(sql, [login_id, password], (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      return res.render('login', {
        error: '❌ 아이디 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    const user = rows[0];

    // 세션에 로그인 정보 저장
    req.session.user = {
      user_id: user.user_id,
      login_id: user.login_id,
      name: user.name,
      email: user.email,
    };

    req.session.save(() => {
      res.redirect('/');
    });
  });
});

// 로그아웃
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
