import { body } from "express-validator";

export const createOrderMiddleware = [
    body('sellerId')
        .isMongoId()
        .withMessage('Seller Id must be valid'),
    body('catelogId')
        .isMongoId()
        .withMessage('Catelog Id must be valid'),
    body('products')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 product must be order')
]