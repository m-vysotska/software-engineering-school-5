import axios from 'axios';
import { WeatherService } from '../services/weather.service';
import { config } from '../config';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(() => {
    weatherService = new WeatherService();
    jest.clearAllMocks();
  });

  it('should fetch weather data for a city', async () => {
    const mockWeatherData = {
      main: {
        temp: 20,
        humidity: 65,
      },
      weather: [{ description: 'clear sky' }],
      wind: { speed: 5 },
    };

    mockedAxios.get.mockResolvedValueOnce({
      data: mockWeatherData,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        url: ''
      },
    });

    const result = await weatherService.getWeatherForCity('London');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/weather'),
      expect.objectContaining({
        params: expect.objectContaining({
          q: 'London',
          appid: config.weatherApiKey,
          units: 'metric',
        }),
      })
    );

    expect(result).toEqual({
      temperature: 20,
      description: 'clear sky',
      humidity: 65,
      windSpeed: 5,
    });
  });

  it('should throw error for non-existent city', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    await expect(weatherService.getWeatherForCity('NonExistentCity')).rejects.toThrow(
      'City "NonExistentCity" not found'
    );
  });

  it('should throw error for API failure', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

    await expect(weatherService.getWeatherForCity('London')).rejects.toThrow(
      'Failed to fetch weather data'
    );
  });
}); 