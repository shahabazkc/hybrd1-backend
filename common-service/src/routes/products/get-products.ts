import { BadRequestError, currentUser, requireAuth, validateRequest, NotAuthorizedError } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { getProductMiddleware } from '../../middlewares/get-product-middleware';
import { Product } from '../../models/product';

const router = express.Router();


router.get('/:sellerId',
    currentUser, requireAuth,
    getProductMiddleware, validateRequest,
    async (req: Request, res: Response) => {
        let { sellerId } = req.params;

        if (!req.currentUser?.id) throw new NotAuthorizedError();

        let products = await Product.find({ sellerId: sellerId });

        if (!products) throw new BadRequestError('Products not found');

        res.json({
            status: true,
            data: products
        });
    }
);


export { router as getProductsRouter };