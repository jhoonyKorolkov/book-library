"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    authors: {
        type: String
    },
    favorite: {
        type: String
    },
    fileCover: {
        type: String
    },
    fileName: {
        type: String
    },
    mimetype: {
        type: String
    },
    originalName: {
        type: String
    }
});
const Book = (0, mongoose_1.model)('Book', BookSchema);
exports.default = Book;
