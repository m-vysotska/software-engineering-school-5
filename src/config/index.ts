import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/weather_service',
  weatherApiKey: process.env.WEATHER_API_KEY || '',
  weatherApiBaseUrl: process.env.WEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  emailUser: process.env.EMAIL_USER || '',
  emailPass: process.env.EMAIL_PASS || '',
  emailFrom: process.env.EMAIL_FROM || 'weather-service@example.com',
  nodeEnv: process.env.NODE_ENV || 'development',
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
}; 