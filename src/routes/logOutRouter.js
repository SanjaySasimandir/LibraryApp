const express = require("express");
const logoutRouter = express.Router();
const fs = require('fs');


function router(nav) {

    logoutRouter.get("/", function (req, res) {

        let rawdata = fs.readFileSync('data/data.json');
        let data = JSON.parse(rawdata);

        data.logged_in = false;
        data = JSON.stringify(data, null, 2);
        fs.writeFile('data/data.json', data, (err) => {
            if (err) throw err;
            else {
                res.redirect('/logout/loggedout');
            }
        });
    });


    logoutRouter.get("/loggedout", function (req, res) {
        res.redirect('/books')
    });

    return logoutRouter;
};
module.exports = router;