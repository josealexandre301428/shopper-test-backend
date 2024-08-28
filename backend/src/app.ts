import express, { NextFunction, Request, Response } from  'express';
import cors from 'cors';
import router from './routes/index';

const app = express();

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path} - ${new Date()}`);
    next();
  };
  
  app.use(logger);

app.use(express.json());
app.use(cors());
app.use(router);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });




export default app;



