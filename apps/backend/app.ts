import createError from 'http-errors';
import express, { json, Response, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { HttpException } from './@types/common/index.js';
import { passport } from './configs/index.js';
import * as router from './routes/index.js';
import logger from 'morgan';
import { AdminRouter } from './routes/admin/index.js';
import { isUserAdmin } from './middlewares/is-user-admin.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    preflightContinue: true,
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
  })
);
app.use('/statics', express.static(path.join(__dirname, 'statics')));

app.get('/', (req, res) => res.json({ success: true, message: 'Welcome!' }));
app.use('/auth', router.AuthRouter);
app.use('/products', router.ProductRouter);
app.use('/addresses', router.AddressesRouter);
app.use('/orders', router.OrdersRouter);
app.use('/payments', router.PaymentsRouter);
app.use('/admin', isUserAdmin, AdminRouter);

app.use((req, res, next) => next(createError(404)));
// @ts-expect-error: This is unknown error
app.use((err: HttpException, req: Request, res: Response): Promise<void> => {
  res.status(err.status || 500);
  console.error(err.message);
  res.json({ success: false, message: err.message });
});

export default app;
