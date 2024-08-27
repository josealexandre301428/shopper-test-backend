import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { analyzeImage } from './app';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Rotas
app.post('/upload', async (req: Request, res: Response) => {
  try {
    const imagePath = req.body.imagePath;
    const result = await analyzeImage(imagePath);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao analisar a imagem' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});