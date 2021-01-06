const express = require("express");
const authorRouter = express.Router();

const AuthorData = require('../model/authordata');

function router(nav) {
    // let authors=data.authors;
    authorRouter.get("/", function (req, res) {
        AuthorData.find().then(function (authors) {
            res.render('authors', {
                nav,
                authors,
            });
        })
    });
    authorRouter.get("/:id", function (req, res) {
        let id = req.params.id;
        AuthorData.find({_id:id}).then(function(singleAuthorArray){
            let author=singleAuthorArray[0];
            res.render('author', {
                nav,
                author,
            });
        })
    });

    return authorRouter;
};
module.exports = router;