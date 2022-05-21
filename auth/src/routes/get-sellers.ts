import { currentUser, requireAuth } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';


const router = express.Router();

router.get('/',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {
        
        let sellers = await User.find({ type_of_user: "seller" });

        res.send({
            status: true,
            data: sellers
        })
    }
);

export { router as getSellersRouter };