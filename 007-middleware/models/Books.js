const uidGenerator = require("node-unique-id-generator");

class Books {
    constructor(
        title = "",
        description = "",
        authors = "",
        favorite = "",
        fileBook = "",
        fileName = "",
        id = uidGenerator.generateUniqueId(),
    ) {
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileBook = fileBook;
        this.fileName = fileName;
        this.id = id;
    }
}

module.exports = Books;
