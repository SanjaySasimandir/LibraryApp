const express = require("express");
const addAuthorRouter = express.Router();

const multer = require('multer');
const path = require('path');

const AuthorData = require('../model/authordata')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/authors');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function router(nav) {
    addAuthorRouter.get("/", function (req, res) {
        res.render('addauthor', {
            nav,
        });
    });
    
    addAuthorRouter.post("/add", function (req, res) {
        let upload = multer({ storage: storage }).single('img');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                filePath += req.file.path;
            }

            filePath = filePath.substring(6, filePath.length)
            console.log(filePath);
            var item = {
                name: req.body.name,
                topic: req.body.topic,
                yob: req.body.yob,
                img: filePath,
                books: req.body.books.split('\n'),
                life: req.body.life
            }
            var author = AuthorData(item);
            author.save();
            res.redirect('/addauthor/success');
        });



    });

    addAuthorRouter.get("/success", function (req, res) {
        res.redirect('/authors');
    });

    return addAuthorRouter;
};
module.exports = router;