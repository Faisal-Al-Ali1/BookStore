const db = require("../Config/db");

const createBook = async (title, author, genre, publication_date, description) => {
    const query = `
        INSERT INTO books (title, author, genre, publication_date, description) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const result = await db.query(query, [title, author, genre, publication_date, description]);
    return result.rows[0];
};

const getAllBooks = async () => {
    const query = `
        SELECT id, title, author, genre, 
               TO_CHAR(publication_date, 'YYYY-MM-DD') AS publication_date, 
               description 
        FROM books WHERE is_deleted = FALSE;
    `;
    const result = await db.query(query);
    return result.rows;
};

const updateBook = async (id, title, author, genre, publication_date, description) => {
    const query = `
        UPDATE books 
        SET title = $1, author = $2, genre = $3, publication_date = $4, description = $5
        WHERE id = $6 RETURNING *;
    `;
    const result = await db.query(query, [title, author, genre, publication_date, description, id]);
    return result.rows[0];
};

const softDeleteBook = async (id) => {
    const query = "UPDATE books SET is_deleted = TRUE WHERE id = $1 RETURNING *;";
    const result = await db.query(query, [id]);
    return result.rows[0];
};

module.exports = { createBook, getAllBooks, updateBook, softDeleteBook };
