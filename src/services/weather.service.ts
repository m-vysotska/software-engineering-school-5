import axios from 'axios';
import { config } from '../config';

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherResponse {
  main: { temp: number; humidity: number };
  weather: Array<{ description: string }>;
  wind: { speed: number };
}

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = config.weatherApiKey;
    this.baseUrl = config.weatherApiBaseUrl;
  }

  async getWeatherForCity(city: string): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherResponse>(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
        },
      });

      const { main, weather, wind } = response.data;

      return {
        temperature: main.temp,
        description: weather[0].description,
        humidity: main.humidity,
        windSpeed: wind.speed,
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError.response?.status === 404) {
        throw new Error(`City "${city}" not found`);
      }
      throw new Error('Failed to fetch weather data');
    }
  }
} 