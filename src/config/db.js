const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',                     // ← 비밀번호 있으면 여기
  database: '202245031_schema',     // ← 네가 만든 스키마 이름
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB 연결 실패:', err.message);
    process.exit(1);
  }
  console.log('DB 연결 성공');
});

module.exports = db;
