import { BadRequestError, currentUser, NotAuthorizedError, requireAuth } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { Order } from '../../models/order';
import { User } from '../../models/user';

const router = express.Router();

router.get('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        if (!req.currentUser?.id) throw new NotAuthorizedError();

        let userIsValidSeller = await User.findOne({ userId: req.currentUser?.id });

        if (userIsValidSeller.userType !== "seller") throw new BadRequestError('Sellers can only view their orders');

        try {
            let orders = await Order.find({ sellerId: req.currentUser.id });

            res.json({
                status: true,
                data: orders
            });
        }
        catch (err) {
            console.log(err);
            throw new Error()
        }

    }
);

export { router as getOrdersRouter };