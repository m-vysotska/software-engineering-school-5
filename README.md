# Currency Service

## Description

This service provides an API to get the current USD to UAH exchange rate and allows users to subscribe to daily email updates on the exchange rate.

## Endpoints

- `GET /rate` - Get the current USD to UAH exchange rate.
- `POST /subscribe` - Subscribe to daily email updates.

## Setup

1. Clone the repository.
2. Create a `.env` file with the following variables:

```PORT=3000
MONGODB_URI=mongodb://mongo:27017/currency_service
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

3. Build and start the application using Docker Compose:

```sh
docker-compose up --build
```

Notes
Emails with the current exchange rate are sent daily at 3pm.
All data is stored in a MongoDB database.

### Running the Project

With everything set up, you can now run the project using Docker Compose:

```sh
docker-compose up --build
```

Your Node.js service will be running, and the endpoints will be available at http://localhost:3000/rate and http://localhost:3000/subscribe. The daily email job will run automatically as scheduled.

This setup should meet the criteria specified, including the API endpoints, email notifications, database storage, Dockerization, and documentation.
