import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use('/api/v1', router);

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'welcomePage.html'));
});
app.get('/api/v1', async (req, res) => {
  res.sendFile(path.join(__dirname, 'welcomePage.html'));
});

//client error handler
app.use(globalErrorHandler);
//handle Not Found ROute
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

export default app;
