const express = require("express");
const router = express.Router();
const { Book } = require("../../models");
const fileMiddleware = require("../../middleware/file");

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
        `2021-02-22T21-32-00.287Z_filename_book.pdf`,
        `fileBook ${el}`,
        el,
    );
    stor.books.push(newBook);
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

router.post("/", fileMiddleware.single("fileBook"), (req, res) => {
    const { books } = stor;
    const {
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileCover = "",
        fileBook = "",
    } = req.body;
    let fileName;

    if (req.file) {
        const { path, filename } = req.file;
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

    res.status(201);
    res.json(newBook);
});

router.put("/:id", fileMiddleware.single("fileBook"), (req, res) => {
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

    if (req.file) {
        const { path, filename } = req.file;
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
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json("book | not found");
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

router.get("/:id/download", (req, res) => {
    const { id } = req.params;
    const { books } = stor;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        const fileName = books[idx].fileName;
        res.download(
            __dirname + `/../public/book/${fileName}`,
            `book.${fileName.split(".").pop()}`,
            (err) => {
                if (err) {
                    res.status(404);
                    res.json("file | not found");
                }
            }
        );
    } else {
        res.status(404);
        res.json("book | not found");
    }
});
module.exports = router;
