import { BadRequestError, currentUser, NotAuthorizedError, requireAuth, validateRequest } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { createCatalogueMiddleware } from '../../middlewares/create-catalogue-middleware';
import { Catalog } from '../../models/catalog';
import { User } from '../../models/user';

const router = express.Router();


router.post('/',
    currentUser, requireAuth,
    createCatalogueMiddleware, validateRequest,
    async (req: Request, res: Response) => {

        let {
            name,
            products
        } = req.body;

        if (!req?.currentUser?.id) throw new NotAuthorizedError();

        let userFound = await User.findOne({ userId: req.currentUser?.id });

        if (!userFound) throw new BadRequestError('User not found');

        if (userFound.userType !== "seller") throw new BadRequestError('Only sellers can create Catelogs');

        const catalogueFound = await Catalog.findOne({ sellerId: req.currentUser?.id });

        if (catalogueFound) throw new BadRequestError('Only one catague allowed for user');

        let catalogBuild = Catalog.build({
            name,
            sellerId: req?.currentUser?.id
        });

        await catalogBuild.save();

        res.json({
            status: true,
            data: catalogBuild
        });

    }
);

export { router as createCatalogueRouter };