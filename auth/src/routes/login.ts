import { BadRequestError, Bcrypt, JWT, validateRequest } from '@hybrd1/common';
import express, { Request, Response } from 'express';
import { loginMiddleware } from '../middlewares/login-middleware';
import { User } from '../models/user';
const router = express.Router();

router.post('/',
    loginMiddleware, validateRequest,
    async (req: Request, res: Response) => {

        let {
            username,
            password
        } = req.body;

        const user = await User.findOne({ username: username })
        if (!user) {
            throw new BadRequestError('User not found');
        }

        try {
            let comparePassword = await Bcrypt.compare(password, user.password);
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
        }
        catch (err) {
            throw new BadRequestError('Credentials are wrong');
        }

    }
);


export { router as loginUserRouter };