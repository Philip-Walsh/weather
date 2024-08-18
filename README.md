# Weather App ☀️

## Overview

Welcome to the Weather App! This application provides real-time weather updates for any city in the world. Built using Express and React, the app leverages the powerful [WeatherAPI.com](https://www.weatherapi.com/) to fetch weather data, which is then beautifully displayed in a clean and responsive user interface.

## Features

- **Global Weather Data**: Check the current weather for any city around the world.
- **Dynamic UI**: The user interface adapts to display weather conditions with relevant emojis and a modern design.
- **Accessible Design**: The app is designed with accessibility in mind, using semantic HTML and ARIA attributes to ensure a smooth experience for all users.

## Server

- **Port**: The server is running on port `3000`.
- **API Interaction**: The server interacts with `api.weatherapi.com` to fetch weather data and sends this data to the React UI for rendering.
- **Architecture**: The backend is powered by Express, ensuring fast and reliable data handling.

## Future Enhancements

- **Data Caching**: Implement a cron job to cache weather data in a database, reducing the number of API calls and associated costs.
- **Enhanced UI Themes**: Develop a clean and visually appealing UI with dynamic themes that change based on the current weather conditions.
- **In-House Display**: Optimize the UI for in-house displays, creating a dashboard-style view for home or office use.
- **Dockerized Server**: Containerize the server to reduce costs and improve scalability.

## Installation

To get started with the project:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. **Install Dependencies**:

   ```bash
   cd weather-app
   npm install
   ```

3. **Start the Server**:

   ```bash
   npm start
   ```

4. **Run the UI**:

   ```bash
   cd ui
   npm start
   ```

## Contribution

Contributions are welcome! If you have suggestions for improvements or want to add features, feel free to submit a pull request or open an issue.
