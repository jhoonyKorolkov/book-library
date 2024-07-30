"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const BooksRepository_js_1 = require("./entity/BooksRepository.js");
const container = new inversify_1.Container();
container.bind(BooksRepository_js_1.BookRepository).toSelf();
exports.default = container;
