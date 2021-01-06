const express = require("express");
const registerRouter = express.Router();

const RegistrationData = require('../model/registrationdata');

function router(nav) {
    registerRouter.get("/", function (req, res) {
        res.render('register', {
            nav,
        });
    });

    registerRouter.post("/add", function (req, res) {
        var item = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        var user=RegistrationData(item);
        user.save();
        res.redirect('/login');
    });

    return registerRouter;


};
module.exports = router;