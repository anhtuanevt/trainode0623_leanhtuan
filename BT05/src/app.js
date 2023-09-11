var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config()

const flash = require('express-flash-notification');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require("express-ejs-layouts");
const crypto = require('crypto');

const db = require('./configs/db')
var indexRouter = require('./routes/index');
const configAdmin = require('./configs/system')


var app = express();
db.connect();
const secretKey = crypto.randomBytes(32).toString('hex');

app.use(cookieParser());
app.use(session({
  secret: secretKey, // Key bí mật để mã hóa dữ liệu phiên (có thể thay đổi)
  resave: false, // Không lưu lại phiên mỗi lần request
  saveUninitialized: false, // Không lưu phiên cho các phiên chưa được khởi tạo
  cookie: {
    maxAge: 3600000, // Thời gian sống của cookie phiên (ở đây là 1 giờ)
  },
}));
app.use(flash(app));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts)
app.set("layout", "index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.locals.prefixAdmin = configAdmin.prefixAdmin;

module.exports = app;
