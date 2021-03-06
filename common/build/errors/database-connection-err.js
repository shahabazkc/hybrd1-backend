"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const custom_err_1 = require("./custom-err");
class DatabaseConnectionError extends custom_err_1.CustomError {
    constructor() {
        super("Error connecting to db");
        this.reason = "Error connecting to database";
        this.statusCode = 500;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    ;
    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
