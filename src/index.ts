import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(morgan('dev'));

// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again after 15 min.',
  }),
);

app.use(errorMiddleware);
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello from Auth-Module',
  });
});

app.post('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello from Auth-Module',
    data: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

export default app;
