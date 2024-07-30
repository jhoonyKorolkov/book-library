"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(require("../container"));
const BooksRepository_1 = require("../entity/BooksRepository");
const repo = container_1.default.get(BooksRepository_1.BookRepository);
console.log(container_1.default);
