import { currentUser, requireAuth, validateRequest, BadRequestError, NotAuthorizedError } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { createOrderMiddleware } from '../../middlewares/create-order-middleware';
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Catalog } from '../../models/catalog';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/',
    currentUser, requireAuth,
    createOrderMiddleware, validateRequest,
    async (req: Request, res: Response) => {
        let { sellerId, catelogId, products } = req.body;

        if (!req.currentUser?.id) throw new NotAuthorizedError();

        let userIsValidBuyer = await User.findOne({ userId: req.currentUser?.id });

        if (!userIsValidBuyer) throw new BadRequestError('Not Authorized');

        if (userIsValidBuyer.userType !== "buyer") throw new BadRequestError('Buyers can only order');

        let catelogs = await Catalog.findOne({ sellerId: sellerId });

        if (!catelogs) throw new BadRequestError('Catelogs not found');

        let sellerProducts = await Product.find({ sellerId, catalogId: catelogId });

        console.log("sellerPorducts: ", sellerProducts);
        if (sellerProducts.length == 0 || null) throw new BadRequestError('Seller has no products')

        try {
            let UpdatedProducts = products.map((item: any) => {
                if (!item.id || !item.quantity) throw new BadRequestError('product must be valid');
                let product = sellerProducts.find((elem) => {
                    const objectID = new mongoose.Types.ObjectId(elem._id);
                    const objectIDString = objectID.toString();
                    return item.id === objectIDString
                });
                if (!product) throw new BadRequestError(`product with id=${item.id} not found`);
                return { id: item.id, quantity: item.quantity };
            });


            let buildOrder = Order.build({
                buyerId: req.currentUser.id,
                sellerId,
                catelogId,
                products: UpdatedProducts
            });

            await buildOrder.save();

            res.json({
                status: true,
                data: buildOrder
            });

        }
        catch (err) {
            console.log(err);

            throw new BadRequestError(`product not found`);
        }

    }
);

export { router as createOrderRoute };