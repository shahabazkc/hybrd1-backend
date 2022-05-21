import { param } from "express-validator";

export const getProductMiddleware = [
    param('sellerId')
        .isMongoId()
        .withMessage("Seller Id must be valid")
];