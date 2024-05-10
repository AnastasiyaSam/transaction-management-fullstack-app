import express from 'express';
import bodyParser from 'body-parser'
import TransactionsRoutes from './routes/transactions.js'
import cors from 'cors'

const app = express();
app.use(cors());

const PORT = 5000;

app.use(bodyParser.json());

app.use('/', TransactionsRoutes);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'The service is up and running.' });
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));