import express, { Request, Response } from  'express';
import cors from 'cors';
import router from './routes/index';

const app = express();


app.use(express.json());
app.use(cors());
app.use(router);

app.get('/', (_req: Request, res: Response) => res.send('Hello World!'));


//app.use((err: Error, _req: Request, res: Response) => res.status(500).json({message: err.message}))

export default app;



