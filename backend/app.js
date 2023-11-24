import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
