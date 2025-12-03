const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 홈: 프로필 1명 + 최근 프로젝트 3개
router.get('/', (req, res) => {
  const userSql = 'SELECT * FROM users ORDER BY user_id LIMIT 1';
  const projectSql = 'SELECT * FROM projects ORDER BY created_at DESC LIMIT 3';

  db.query(userSql, (err, userRows) => {
    if (err) throw err;

    db.query(projectSql, (err2, projectRows) => {
      if (err2) throw err2;

      const user = userRows[0] || null;
      const projects = projectRows || [];

      res.render('index', {
        user,
        projects,
      });
    });
  });
});

module.exports = router;
