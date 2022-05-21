import { body } from "express-validator";

export const createProductMiddleware = [
    body('name')
        .isString()
        .isLength({ min: 2, max: 18 })
        .withMessage("Product name must be in between 2 and 18 characters"),
    body('price')
        .isNumeric()
        .withMessage('Price must be a numeric value'),
    body('catalogId')
        .isMongoId()
        .withMessage('Catalog id must be valid')
];