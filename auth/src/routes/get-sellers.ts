import { BadRequestError, currentUser, NotAuthorizedError, requireAuth } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';


const router = express.Router();

router.get('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        if (!req.currentUser?.id) throw new NotAuthorizedError();

        let user = await User.findOne({ _id: req.currentUser?.id });

        if (!user) throw new NotAuthorizedError();

        if (user?.type_of_user !== "buyer") throw new BadRequestError('Buyers can only see the sellers');

        let sellers = await User.find({ type_of_user: "seller" });

        res.send({
            status: true,
            data: sellers
        })
    }
);

export { router as getSellersRouter };