import express from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@hybrd1/common';

// Importing Routers
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

// All the routes here...

//If route handler not found
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// Error Handler
app.use(errorHandler)

// Exporting App Module
export { app };
