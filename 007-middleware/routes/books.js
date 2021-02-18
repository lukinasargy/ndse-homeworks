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
        `favorite ${el}`,
        `fileBook ${el}`,
        `fileName ${el}`
    );
    stor.books.push(newBook);
});

router.get("/api/user/login", (req, res) => {
    res.json({ id: 1, mail: "test@mail.ru" });
    res.status(201);
});

router.get("/", (req, res) => {
    const { books } = stor;
    res.json(books);
});

router.get("/:id", (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
    }
});

router.post("/", (req, res) => {
    const { books } = stor;
    const {
        title,
        description,
        authors,
        favorite,
        fileBook,
        fileName,
    } = req.body;

    const newBook = new Book(
        title,
        description,
        authors,
        favorite,
        fileBook,
        fileName
    );
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

router.put("/:id", (req, res) => {
    const { books } = stor;
    const {
        title,
        description,
        authors,
        favorite,
        fileBook,
        fileName,
    } = req.body;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileBook,
            fileName,
        };
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("books | not found");
    }
});

router.delete("/:id", (req, res) => {
    const { books } = stor;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json("ok");
    } else {
        res.status(404);
        res.json("books | not found");
    }
});
// загрузка файлов
router.post("/upload", fileMiddleware.single("cover"), (req, res) => {
    if (req.file) {
        const { path } = req.file;
        console.log(path);

        res.json(path);
    } else {
        res.json(null);
    }
});

router.get("/:id/download", (req, res) => {
    res.download(
        __dirname + "/../public/img/2020-12-07-cover.png",
        "cover.png",
        (err) => {
            if (err) {
                res.status(404).json();
            }
        }
    );
});
module.exports = router;
