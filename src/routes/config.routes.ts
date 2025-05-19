import { Router } from 'express';
import { config } from '../config';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    apiBaseUrl: config.apiBaseUrl,
  });
});

export default router; 