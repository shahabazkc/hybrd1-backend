import { BadRequestError, currentUser, requireAuth } from '@hybrd1/common';
import express, {
    Request, Response
} from 'express';
import { Catalog } from '../../models/catalog';

const router = express.Router();

router.get('/:sellerId',
    currentUser, requireAuth,
    async (req: Request, res: Response) => {

        let { sellerId } = req.params;

        let catelogs = await Catalog.findOne({ sellerId: sellerId });

        if (!catelogs) throw new BadRequestError('Catelogs not found');

        res.json({ status: true, data: catelogs });

    }
);

export { router as getCatalogueRouter };