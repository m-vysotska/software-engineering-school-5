# Weather Subscription Service

## Description

This service provides an API to get weather updates for cities and allows users to subscribe to regular email updates about the weather in their chosen city.

## Features

- Get current weather for any city
- Subscribe to daily or weekly weather updates
- Email notifications with weather information
- Swagger API documentation
- MongoDB database for storing subscriptions
- Docker support for easy deployment

## API Endpoints

- `GET /api/weather/{city}` - Get current weather for a city
- `POST /api/subscriptions` - Subscribe to weather updates
- `DELETE /api/subscriptions/{email}` - Unsubscribe from weather updates

## Setup

1. Clone the repository
2. Create a `.env` file with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://mongo:27017/weather_service
WEATHER_API_KEY=your_openweathermap_api_key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_FROM=weather-service@example.com
```

3. Build and start the application using Docker Compose:

```sh
docker-compose up --build
```

## API Documentation

Once the service is running, you can access the Swagger documentation at:
http://localhost:3000/api-docs

## Development

1. Install dependencies:
```sh
pnpm install
```

2. Start development server:
```sh
pnpm dev
```

3. Run tests:
```sh
pnpm test
```

## Docker

The application is containerized using Docker and Docker Compose. The setup includes:
- Node.js application container
- MongoDB container
- Persistent volume for MongoDB data

To start the application:
```sh
docker-compose up --build
```

## Notes

- Weather updates are sent daily at 9:00 AM for daily subscriptions
- Weekly updates are sent every Monday at 9:00 AM
- All data is stored in a MongoDB database
- The service uses OpenWeatherMap API for weather data
