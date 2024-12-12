// server/app.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import surveyRoutes from './routes/survey.routes.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/surveys', surveyRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Survey API!');
});

mongoose
  .connect(config.mongodbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
