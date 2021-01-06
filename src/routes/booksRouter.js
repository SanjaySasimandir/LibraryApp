const express = require("express");
const bookRouter = express.Router();

const BookData = require('../model/bookdata')

function router(nav) {
    //let books=data.books; //From JSON
    bookRouter.get("/", function (req, res) {
        BookData.find().then(function (books) {
            res.render('books', {
                nav,
                books
            });
        });
    });
    bookRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        BookData.find({ _id: id }).then(function (singleBookArray) {
            let book = singleBookArray[0];
            res.render('book', {
                nav,
                book
            });
        })
    });

    return bookRouter;
};
module.exports = router;