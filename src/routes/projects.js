const express = require('express');
const db = require('../config/db');
const router = express.Router();

// 로그인 체크 미들웨어
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/auth/login');
  }
  next();
}

// 프로젝트 목록
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM projects ORDER BY created_at DESC';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.render('projects', { projects: rows || [] });
  });
});

// 새 프로젝트 작성 폼 (로그인 필요)
router.get('/new', requireLogin, (req, res) => {
  res.render('project-new');
});

// 새 프로젝트 저장 (로그인 필요)
router.post('/new', requireLogin, (req, res) => {
  const {
    title,
    summary,
    description,
    tech_stack,
    github_url,
    demo_url,
    start_date,
    end_date,
  } = req.body;

  const userId = req.session.user.user_id;

  const sql = `
    INSERT INTO projects
      (title, summary, description, tech_stack, github_url, demo_url,
       start_date, end_date, created_at, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)
  `;

  db.query(
    sql,
    [
      title,
      summary || null,
      description || null,
      tech_stack || null,
      github_url || null,
      demo_url || null,
      start_date || null,
      end_date || null,
      userId,
    ],
    (err) => {
      if (err) throw err;
      res.redirect('/projects');
    }
  );
});

// 프로젝트 삭제 (로그인 + 자신의 프로젝트만)
router.post('/:id/delete', requireLogin, (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.user.user_id;

  const sql = 'DELETE FROM projects WHERE project_id = ? AND user_id = ?';
  db.query(sql, [projectId, userId], (err) => {
    if (err) throw err;
    res.redirect('/projects');
  });
});

// 🔐 프로젝트 수정 폼 (로그인 + 본인 것만)
router.get('/:id/edit', requireLogin, (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.user.user_id;

  const sql = 'SELECT * FROM projects WHERE project_id = ? AND user_id = ?';

  db.query(sql, [projectId, userId], (err, rows) => {
    if (err) throw err;

    if (rows.length === 0) {
      // 없거나 남의 프로젝트면 목록으로 돌려보내기
      return res.redirect('/projects');
    }

    res.render('project-edit', { project: rows[0] });
  });
});

// 🔐 프로젝트 수정 처리
router.post('/:id/edit', requireLogin, (req, res) => {
  const projectId = req.params.id;
  const userId = req.session.user.user_id;

  const {
    title,
    summary,
    description,
    tech_stack,
    github_url,
    demo_url,
    start_date,
    end_date,
  } = req.body;

  const sql = `
    UPDATE projects
       SET title = ?,
           summary = ?,
           description = ?,
           tech_stack = ?,
           github_url = ?,
           demo_url = ?,
           start_date = ?,
           end_date = ?
     WHERE project_id = ?
       AND user_id = ?
  `;

  db.query(
    sql,
    [
      title,
      summary || null,
      description || null,
      tech_stack || null,
      github_url || null,
      demo_url || null,
      start_date || null,
      end_date || null,
      projectId,
      userId,
    ],
    (err) => {
      if (err) throw err;
      // ✅ 수정 후에도 프로젝트 목록으로 이동
      res.redirect('/projects');
    }
  );
});


module.exports = router;
