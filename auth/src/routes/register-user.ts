import { BadRequestError, Bcrypt, validateRequest } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { UserRegisteredPublisher } from '../events/publishers/user-registered-publisher';
import { registerMiddleware } from '../middlewares/register-middleware';
import { User } from '../models/user';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post("/",
    registerMiddleware, validateRequest, // Body Middlewares 
    async (req: Request, res: Response) => {

        let {
            username,
            password,
            type_of_user
        } = req.body;


        // Finding the user is already in db with the same username
        const user = await User.findOne({ username });

        if (user) throw new BadRequestError('User with same credentials already exist');

        // Hash the password here
        password = await Bcrypt.toHash(password);

        const userBuild = User.build({
            username,
            password,
            type_of_user: type_of_user
        });

        // Save to Db
        await userBuild.save();

        // Publish an event saying that user has registered
        new UserRegisteredPublisher(natsWrapper.client).publish({
            userId: userBuild.id,
            username
        });

        res.json({ status: true, data: userBuild })

    }
);


export { router as userRegistrationRouter };