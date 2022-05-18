import express from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@hybrd1/common';
import { userRegistrationRouter } from './routes/register-user';

const app = express();

// Express json middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('trust proxy', true);

// Cookie session
app.use(
    cookieSession({
        signed: false,
        secure: true,
        sameSite: "none"
    })
);

// Use all the routers here...
app.use('/api/auth/register', userRegistrationRouter);

const router = express.Router();
router.get('/api/auth/hello', (req, res) => res.send("hwello"))

//If route handler not found
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// Error Handler
app.use(errorHandler)

// Exporting App Module
export { app };
