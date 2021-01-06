const express = require("express");
const app = new express();

const multer = require('multer');
const path = require('path');

const data = require('./data/data.json');
var nav = [];
if (data.logged_in) {
    var nav = [
        {
          "link": "/books",
          "name": "Books"
        },
        {
          "link": "/authors",
          "name": "Authors"
        },
        {
          "link": "/addbook",
          "name": "Add Book"
        },
        {
          "link": "/addauthor",
          "name": "Add Author"
        },
        {
          "link": "/logout",
          "name": "Log Out"
        }
      ];
} else {
    var nav = [
        {
          "link": "/books",
          "name": "Books"
        },
        {
          "link": "/authors",
          "name": "Authors"
        },
        {
          "link": "/login",
          "name": "Login"
        },
        {
          "link": "/register",
          "name": "Register"
        }
      ];
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', "./src/views");

// var loginRouter = require('./src/routes/loginRouter')(nav);
// var registerRouter = require('./src/routes/registerRouter')(nav);
// app.use('/login', loginRouter);
// app.use('/register', registerRouter);



app.get("/", function (req, res) {
    res.redirect('/books')

});

var loginRouter = require('./src/routes/loginRouter')(nav);
app.use('/login', loginRouter);

var registerRouter = require('./src/routes/registerRouter')(nav);
app.use('/register', registerRouter);

var authorsRouter = require('./src/routes/authorsRouter')(nav);
app.use('/authors', authorsRouter);

var booksRouter = require('./src/routes/booksRouter')(nav);
app.use('/books', booksRouter);

var addBookRouter = require('./src/routes/addBookRouter')(nav);
app.use('/addbook', addBookRouter);

var addAuthorRouter = require('./src/routes/addAuthorRouter')(nav);
app.use('/addauthor', addAuthorRouter);

var logOutRouter = require('./src/routes/logOutRouter')(nav);
app.use('/logout', logOutRouter);

app.listen(8080, function () {
    console.log("Listening at 8080");
});