const express = require("express");
const router = express.Router();
const { Book } = require("../models");
const fileMiddleware = require("../middleware/file");

const stor = {
    books: [],
};

[1, 2, 3].map((el) => {
    const newBook = new Book(
        `books ${el}`,
        `description books ${el}`,
        `authors ${el}`,
        false,
        `fileCover ${el}`,
        `2021-02-22T21-32-00.287Z-book.pdf`,
        `fileBook ${el}`
    );
    stor.books.push(newBook);
});

router.get("/", (req, res) => {
    const { books } = stor;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});


router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Books | create",
        books: {},
    });
});
router.post("/create", fileMiddleware.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 }
  ]), (req, res) => {
    const { books } = stor;
    const {
        title = "",
        description = "",
        authors = "",
        favorite = false,
        fileCover = "",
        fileBook = "",
    } = req.body;
    let fileName;

    if (req.files) {
        const { filename = "" } = req.files["fileBook"][0];
        fileName = filename;
    } else {
        res.json("file error");
        return;
    }

    const newBook = new Book(
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    );
    books.push(newBook);
    res.redirect('/')
});

router.get('/view/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/view", {
            title: "Books | view",
            books: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});
router.get('/update/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.render("books/update", {
            title: "Books | update",
            books: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});
router.post("/update/:id", fileMiddleware.fields([
    { name: 'fileBook', maxCount: 1 },
    { name: 'fileCover', maxCount: 1 }
  ]), (req, res) => {
    const { books } = stor;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileBook,
    } = req.body;
    let fileName;

    if (req.files) {
        const { filename ="" } = req.files["fileBook"][0];
        fileName = filename;
    } else {
        res.json("file error");
        return;
    }

    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
            fileBook,
        };
        res.redirect(`/view/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post("/delete/:id", (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(`/`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.get("/:id/download", (req, res) => {
    const { id } = req.params;
    const { books } = stor;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        const fileName = books[idx].fileName;
        res.download(
            __dirname + `/../public/book/${fileName}`,
            `${fileName.split("_filename_").pop()}`,
            (err) => {
                if (err) {
                    res.status(404).redirect('/404');
                }
            }
        );
    } else {
        res.status(404).redirect('/404');
    }
});
module.exports = router;
