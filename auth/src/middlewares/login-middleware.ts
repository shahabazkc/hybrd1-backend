import { body } from "express-validator";

export const loginMiddleware = [
    body('username')
    .isString()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('Username must be in between 2 and 20 characters'),
body('password')
    .isString()
    .isLength({ min: 4, max: 22 })
    .withMessage('Password must be in between 2 and 22 characters')
]