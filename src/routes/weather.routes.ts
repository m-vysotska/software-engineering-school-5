import { Router, Request, Response, NextFunction } from 'express';
import { WeatherService } from '../services/weather.service';

const router = Router();
const weatherService = new WeatherService();

/**
 * @swagger
 * /api/weather/{city}:
 *   get:
 *     summary: Get current weather for a city
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                 description:
 *                   type: string
 *                 humidity:
 *                   type: number
 *                 windSpeed:
 *                   type: number
 */
router.get('/:city', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city } = req.params;
    const weatherData = await weatherService.getWeatherForCity(city);
    res.json(weatherData);
  } catch (error) {
    next(error);
  }
});

export default router; 