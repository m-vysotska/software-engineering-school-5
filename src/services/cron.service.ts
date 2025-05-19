import cron from 'cron';
import { Subscription, ISubscription } from '../models/subscription.model';
import { WeatherService } from './weather.service';
import { sendWeatherEmail } from './email.service';

export class CronService {
  private weatherService: WeatherService;
  private dailyJob: cron.CronJob;
  private weeklyJob: cron.CronJob;

  constructor() {
    this.weatherService = new WeatherService();
    this.dailyJob = new cron.CronJob('0 9 * * *', () => this.sendUpdates('daily'));
    this.weeklyJob = new cron.CronJob('0 9 * * 1', () => this.sendUpdates('weekly'));
  }

  start() {
    this.dailyJob.start();
    this.weeklyJob.start();
    console.log('Cron jobs started');
  }

  stop() {
    this.dailyJob.stop();
    this.weeklyJob.stop();
    console.log('Cron jobs stopped');
  }

  private async sendUpdates(frequency: 'daily' | 'weekly') {
    try {
      const subscriptions = await Subscription.find({ frequency });
      
      for (const subscription of subscriptions) {
        try {
          const weatherData = await this.weatherService.getWeatherForCity(subscription.city);
          await sendWeatherEmail(subscription.email, subscription.city, weatherData);
          
          subscription.lastSent = new Date();
          await subscription.save();
        } catch (error) {
          console.error(`Failed to send update for ${subscription.email} in ${subscription.city}:`, error);
        }
      }
    } catch (error) {
      console.error('Failed to process updates:', error);
    }
  }
} 