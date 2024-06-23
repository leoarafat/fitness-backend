import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import './app/modules/subscriptions/subscription.cron';
export const app: Application = express();

app.use(
  cors({
    origin: [
      'http://192.168.30.250:3008',
      'http://192.168.10.45:3001',
      'http://192.168.30.249:3002',
      'http://192.168.30.250:3001',
      'http://192.168.30.249:3001',
      'http://192.168.30.250:3002',
      'http://192.168.10.102:3001',
    ],
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
app.use(express.static('uploads'));

//All Routes
app.use('/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.json('Welcome to Fitness APP');
});
//Global Error Handler
app.use(globalErrorHandler);
//handle not found
app.use(NotFoundHandler.handle);
