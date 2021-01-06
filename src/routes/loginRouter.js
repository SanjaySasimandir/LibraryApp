const express = require("express");
const loginRouter = express.Router();
const fs = require('fs');

const RegistrationData = require('../model/registrationdata');

function router(nav) {

    loginRouter.get("/", function (req, res) {
        res.render('login', {
            nav,
        });
    });

    loginRouter.post('/check', function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        let usernamedetails = [];
        let emaildetails = [];

        RegistrationData.find({ username: username, password: password }).then(function (user) {
            usernamedetails = user;
        });

        RegistrationData.find({ email: username, password: password }).then(function (user) {
            emaildetails = user;

            if (usernamedetails.length != 0 || emaildetails.length != 0) {
                let rawdata = fs.readFileSync('data/data.json');
                let data = JSON.parse(rawdata);

                data.logged_in = true;
                data = JSON.stringify(data, null, 2);
                fs.writeFile('data/data.json', data, (err) => {
                    if (err) throw err;
                    else {
                        res.redirect('/login/loggedin');
                    }
                });
            }
            else {
                res.redirect('/login');
            }
        });


    });
    
    loginRouter.get("/loggedin", function (req, res) {
        res.redirect('/login/booksredirect')
    });
    loginRouter.get('/booksredirect',function(req,res){
        res.redirect('/books')
    })

    return loginRouter;
};
module.exports = router;