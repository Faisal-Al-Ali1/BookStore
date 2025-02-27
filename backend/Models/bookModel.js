const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    publication_date: {
        type: DataTypes.DATEONLY, 
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
}, {
    timestamps: false, 
    tableName: "books", 
});

const createBook = async (title, author, genre, publication_date, description) => {
    return await Book.create({ title, author, genre, publication_date, description });
};

const getAllBooks = async () => {
    return await Book.findAll({ where: { is_deleted: false } });
};

const updateBook = async (id, title, author, genre, publication_date, description) => {
    const [updated] = await Book.update(
        { title, author, genre, publication_date, description },
        { where: { id } }
    );
    return updated ? await Book.findByPk(id) : null;
};

const softDeleteBook = async (id) => {
    const [updated] = await Book.update({ is_deleted: true }, { where: { id } });
    return updated ? { message: "Book soft deleted" } : null;
};

const deleteBook = async (id) => {
    return await Book.destroy({ where: { id } });
};

module.exports =  Book ;
