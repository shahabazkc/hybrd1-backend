import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@hybrd1/common';
import { createOrderRoute } from './routes/orders/create-order';
import { getOrdersRouter } from './routes/orders/get-orders';
import { createCatalogueRouter } from './routes/catalogs/create-catalogue';
import { getCatalogueRouter } from './routes/catalogs/get-catalogues';
import { createProductRouter } from './routes/products/create-product';
import { getProductsRouter } from './routes/products/get-products';

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

// // Use all the routers here...
app.use('/api/orders/create', createOrderRoute);
app.use('/api/orders/', getOrdersRouter);
app.use('/api/catalogs/create', createCatalogueRouter);
app.use('/api/catalogs/', getCatalogueRouter);
app.use('/api/product/create', createProductRouter);
app.use('/api/products/', getProductsRouter);

//If route handler not found
app.all('*', async (req, res) => {
    throw new NotFoundError();
});

// Error Handler
app.use(errorHandler)

// Exporting App Module
export { app };
