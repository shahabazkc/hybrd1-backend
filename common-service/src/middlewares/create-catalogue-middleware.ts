import { body } from "express-validator";

export const createCatalogueMiddleware = [
    body('name')
        .isString()
        .isLength({ min: 2, max: 15 })
        .withMessage('Name must be in between 2 and 15 characters')
]