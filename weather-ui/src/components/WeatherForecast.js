import React, { useEffect, useState } from 'react';
import conditions from '../conditions';

import moment from 'moment';


function formatDate(date) {
    // DATE is from last update time needs to be actual time maybe use tz_id
    const formattedDate = moment(date).format('ddd MMM Do');
    return formattedDate;
}




function WeatherForecast({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <article id="weather-forecast">
            <section id="forecast-list">
                <ul>
                    {weather.forecast.forecastday.map(day => (
                        <li key={day.date}>
                            <section id="conditions">
                                <h2>{formatDate(day.date)}</h2>
                                <span
                                    className="emoji"
                                    role="img"
                                    aria-label={day.day.condition.text}
                                >
                                    {conditions[day.day.condition.text.toLowerCase()] ?? '❓'}
                                </span>
                                <p>{day.day.condition.text}</p>
                            </section>
                            <section id="weather">
                                <p>Temperature: {day.day.avgtemp_c}°C</p>
                                <p>Humidity: {day.day.avghumidity}%</p>
                            </section>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default WeatherForecast;

