import { BadRequestError, validateRequest } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { registerMiddleware } from '../middlewares/register-middleware';
import { User } from '../models/user';

const router = express.Router();

router.post("/",
    registerMiddleware, validateRequest, // Body Middlewares 
    async (req: Request, res: Response) => {

        let {
            username,
            password,
            typeOfUser
        } = req.body;


        // Finding the user is already in db with the same username
        const user = await User.findOne({ username });

        if (user) throw new BadRequestError('User already found');

        // Hash the password here

        const userBuild = User.build({
            username,
            password,
            type_of_user: typeOfUser
        });

        // Save to Db
        await userBuild.save();

        res.json({ status: true, data: userBuild })

    }
);


export { router as userRegistrationRouter };