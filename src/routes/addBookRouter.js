const express = require("express");
const addBookRouter = express.Router();

const multer = require('multer');
const path = require('path');

const BookData = require('../model/bookdata')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/books');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function router(nav) {
    addBookRouter.get("/", function (req, res) {
        res.render('addbook', {
            nav,
        });
    });

    addBookRouter.post("/add",function (req, res) {
        let upload = multer({ storage: storage }).single('img');
        let filePath = "";
        upload(req, res, function (err) {
            if (err) throw err
            else {
                filePath += req.file.path;
                
                filePath = filePath.substring(6, filePath.length)
                console.log(filePath)
                var item = {
                    title: req.body.title,
                    author: req.body.author,
                    genre: req.body.genre,
                    rating: req.body.rating,
                    img: filePath,
                    description: req.body.description,
                }
                var book = BookData(item);
                book.save();
                setTimeout(function(){
                    res.redirect('/books')
                },2000);
            }
        });

    });

    return addBookRouter;
};
module.exports = router;