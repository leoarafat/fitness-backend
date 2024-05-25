import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export const app: Application = express();
//
app.use(helmet());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

//parser
app.use(express.json());
// app.use(express.json({ limit: '900mb' }));
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true, limit: '900mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//All Routes
app.use('/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.json('Welcome to bdCalling');
});
//Global Error Handler
app.use(globalErrorHandler);
//handle not found
app.use(NotFoundHandler.handle);
