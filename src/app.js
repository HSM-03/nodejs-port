const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const indexRouter = require('./routes/index');
const projectsRouter = require('./routes/projects');
const contactsRouter = require('./routes/contacts');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 3000;

// ----- View & Static -----
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ----- Session -----
app.use(
  session({
    secret: 'my-portfolio-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// 모든 EJS에서 loginUser 바로 사용 가능하게
app.use((req, res, next) => {
  res.locals.loginUser = req.session.user || null;
  next();
});

// ----- Routes -----
app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/contact', contactsRouter);
app.use('/auth', authRouter);

// ----- Start Server -----
app.listen(PORT, () => {
  console.log(`🔥 Portfolio running at http://localhost:${PORT}`);
});

module.exports = app;
