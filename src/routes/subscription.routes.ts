import { Router, Request, Response, NextFunction } from 'express';
import { Subscription, ISubscription } from '../models/subscription.model';
import { WeatherService } from '../services/weather.service';
import { sendWeatherEmail } from '../services/email.service';

const router = Router();
const weatherService = new WeatherService();

interface SubscriptionRequest {
  email: string;
  city: string;
  frequency: 'daily' | 'weekly';
}

/**
 * @swagger
 * /api/subscriptions:
 *   post:
 *     summary: Subscribe to weather updates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - city
 *               - frequency
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               city:
 *                 type: string
 *               frequency:
 *                 type: string
 *                 enum: [daily, weekly]
 */
router.post('/', (req: Request<{}, {}, SubscriptionRequest>, res: Response, next: NextFunction): void => {
  const { email, city, frequency } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }

  // Validate frequency
  if (frequency !== 'daily' && frequency !== 'weekly') {
    res.status(400).json({ error: 'Frequency must be either daily or weekly' });
    return;
  }

  // Check if city exists
  weatherService.getWeatherForCity(city)
    .then(() => Subscription.create({ email, city, frequency }))
    .then(subscription => {
      res.status(201).json(subscription);
    })
    .catch(error => {
      if (error.message.includes('not found')) {
        res.status(400).json({ error: `City "${city}" not found` });
        return;
      }
      next(error);
    });
});

/**
 * @swagger
 * /api/subscriptions/{email}:
 *   delete:
 *     summary: Unsubscribe from weather updates
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/:email', (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.params;
  Subscription.deleteMany({ email })
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      next(error);
    });
});

export default router; 