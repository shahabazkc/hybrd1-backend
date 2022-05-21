import { BadRequestError, currentUser, NotAuthorizedError, requireAuth, validateRequest } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { createProductMiddleware } from '../../middlewares/create-product-middleware';
import { Catalog } from '../../models/catalog';
import { Product } from '../../models/product';

const router = express.Router();

router.post('/',
    currentUser, requireAuth,
    createProductMiddleware, validateRequest,
    async (req: Request, res: Response) => {
        let { name, price, catalogId } = req.body;

        if (!req.currentUser?.id) throw new NotAuthorizedError();

        let catalogFound = await Catalog.findOne({ _id: catalogId, sellerId: req.currentUser?.id });

        if (!catalogFound) throw new BadRequestError('Catalog not found');

        let productBuild = Product.build({
            name,
            price,
            catalogId,
            sellerId: req.currentUser?.id
        });

        await productBuild.save();

        res.json({
            status: true,
            data: productBuild
        });
    }

);

export { router as createProductRouter };