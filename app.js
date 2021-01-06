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


app.get("/", function (req, res) {
    res.redirect('/books')

});

// Login Router
var loginRouter = require('./src/routes/loginRouter')(nav);
app.use('/login', loginRouter);

// Log Out Router
var logOutRouter = require('./src/routes/logOutRouter')(nav);
app.use('/logout', logOutRouter);

// Register Router
var registerRouter = require('./src/routes/registerRouter')(nav);
app.use('/register', registerRouter);

// Authors Router
var authorsRouter = require('./src/routes/authorsRouter')(nav);
app.use('/authors', authorsRouter);

// Books Router
var booksRouter = require('./src/routes/booksRouter')(nav);
app.use('/books', booksRouter);

// Add Book Router
var addBookRouter = require('./src/routes/addBookRouter')(nav);
app.use('/addbook', addBookRouter);

// Add Author Router
var addAuthorRouter = require('./src/routes/addAuthorRouter')(nav);
app.use('/addauthor', addAuthorRouter);

/*app.get('*',function(res,req){
  res.render('pagenotfound',{
    nav
  })
});*/
app.use(function (req,res,next){
	res.render('pagenotfound',{
    nav
  });
});

app.listen(8080, function () {
    console.log("Listening at 8080");
});