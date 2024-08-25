import React from 'react';
import { conditions } from '../conditions';
import moment from 'moment';

function WeatherHourly({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }
//  TODO: fix filtering
    const localTime = moment.utc(weather.location.localtime);

    let twelveHours = weather.forecast.forecastday[0].hour
    .filter(hour => {
        const hourTime = moment.utc(hour.time, "YYYY-MM-DD HH:mm");
        return hourTime.isSameOrAfter(localTime);  // Fix: Used isSameOrAfter instead of !isBefore
    });

    if (twelveHours.length < 12) {
        twelveHours = twelveHours.concat(weather.forecast.forecastday[1].hour.slice(0, 12 - twelveHours.length));
    }
    return (
        <article id="weather-hourly">
                <h1>Hourly Forecast</h1>
                <ul>
                    {twelveHours
                    .map(hour => (
                        <li key={hour.time_epoch}>
                                <h2>{moment(hour.time).format(' hh A')}</h2>
                                <span
                                    className="emoji"
                                    role="img"
                                    aria-label={hour.condition.text}
                                >
                                    {conditions[hour.condition.text.toLowerCase()] ?? '❓'}
                                </span>
                                <p>{hour.condition.text}</p>
                                <p>Temperature: {hour.temp_c}°C</p>
                                <p>Humidity: {hour.humidity}%</p>
                        </li>
                    ))}
                </ul>
        </article>
    );
}

export default WeatherHourly;
