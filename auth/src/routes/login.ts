import { BadRequestError, Bcrypt, JWT } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { User } from '../models/user';
const router = express.Router();

router.post('/',
    async (req: Request, res: Response) => {

        let {
            username,
            password,
            type_of_user
        } = req.body;

        const user = await User.findOne({ username: username, type_of_user })
        if (!user) throw new BadRequestError('User not found');

        Bcrypt.compare(password, user.password)
            .then(() => {

                // Generate JWT token
                const userJwt = new JWT().generateToken(
                    {
                        id: user.id,
                        username: user.username
                    }
                );

                // Store it on session Object
                req.session = {
                    jwt: userJwt
                };

                res.json({
                    status: true,
                    data: user
                });
            })
            .catch((err) => {
                throw new Error();
            });
    }
);


export { router as loginUserRouter };