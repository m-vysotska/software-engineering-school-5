import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import app from './app';

const PORT = config.port;

if (!config.mongodbUri) {
  throw new Error('MONGODB_URI cannot be empty');
}

mongoose.connect(config.mongodbUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });
