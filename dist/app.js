"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const config_js_1 = require("./config/config.js");
const db_js_1 = __importDefault(require("./db.js"));
const socket_js_1 = __importDefault(require("./socket.js"));
const configureApp_js_1 = __importDefault(require("./config/configureApp.js"));
const configureRoutes_js_1 = __importDefault(require("./config/configureRoutes.js"));
const errorHandler_js_1 = require("./middlewares/errorHandler.js");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_js_1.default)();
    (0, configureApp_js_1.default)(app);
    (0, configureRoutes_js_1.default)(app);
    app.use(errorHandler_js_1.notFoundHandler);
    app.use(errorHandler_js_1.errorHandler);
    (0, socket_js_1.default)(server);
    server.listen(config_js_1.PORT, () => {
        console.log(`App running on port ${config_js_1.PORT}`);
    });
});
startServer();
