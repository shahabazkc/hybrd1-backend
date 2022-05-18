"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTServices {
}
;
class JWT extends JWTServices {
    constructor() {
        super();
    }
    ;
    generateToken(clientData) {
        const token = jsonwebtoken_1.default.sign({
            id: clientData.id,
            email: clientData.email
        }, process.env.JWT_KEY);
        return token;
    }
    ;
}
exports.JWT = JWT;
;
