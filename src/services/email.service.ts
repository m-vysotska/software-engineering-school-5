import nodemailer from 'nodemailer';
import { config } from '../config';
import { WeatherData } from './weather.service';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

export async function sendWeatherEmail(
  email: string,
  city: string,
  weatherData: WeatherData
): Promise<void> {
  const mailOptions = {
    from: config.emailFrom,
    to: email,
    subject: `Weather Update for ${city}`,
    html: `
      <h1>Weather Update for ${city}</h1>
      <p>Temperature: ${weatherData.temperature}°C</p>
      <p>Description: ${weatherData.description}</p>
      <p>Humidity: ${weatherData.humidity}%</p>
      <p>Wind Speed: ${weatherData.windSpeed} m/s</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send weather update email');
  }
} 