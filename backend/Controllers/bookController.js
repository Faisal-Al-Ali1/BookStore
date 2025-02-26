const { createBook, getAllBooks, updateBook, softDeleteBook } = require("../Models/bookModel");

const createBookHandler = async (req, res) => {
    try {
        let { title, author, genre, publication_date, description } = req.body;

        if (publication_date) {
            publication_date = new Date(publication_date).toISOString().split("T")[0];
        }

        const newBook = await createBook(title, author, genre, publication_date, description);
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error creating book:", error.message);
        res.status(500).send("Error creating New Book");
    }
};

const getAllBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        res.json(books);
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.status(500).send("Error fetching books");
    }
};

const updateBookHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, genre, publication_date, description } = req.body;

        const updatedBook = await updateBook(id, title, author, genre, publication_date, description);
        res.json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error.message);
        res.status(500).json({ error: "Error updating book" });
    }
};

const softDeleteBookHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await softDeleteBook(id);
        res.json({ message: "Book soft deleted successfully", book: deletedBook });
    } catch (error) {
        console.error("Error soft deleting book:", error.message);
        res.status(500).json({ error: "Error soft deleting book" });
    }
};

module.exports = { createBookHandler, getAllBooksHandler, updateBookHandler, softDeleteBookHandler };
