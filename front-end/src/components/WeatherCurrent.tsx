import React from 'react';
import { conditions, getBackgroundColor } from '../conditions';

import moment from 'moment';


function WeatherCurrent({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }
    const { current, location } = weather;
    const astro = weather.forecast.forecastday[0].astro;

    const currentConditionTxt = conditions[current.condition.text.trim().toLowerCase()] ?? '❓';
    const dateTime = moment(location.localtime);
    const { sunrise, sunset } = astro;
    const currentBackgroundColor = getBackgroundColor(dateTime, moment(sunrise, 'hh:mm A'), moment(sunset, 'hh:mm A'), weather.current.cloud);

    const weatherCurrentStyle = {
        backgroundColor: currentBackgroundColor,
        color: `rgb(${255-parseInt(currentBackgroundColor.slice(1,3),16)}, ${255-parseInt(currentBackgroundColor.slice(3,5),16)}, ${255-parseInt(currentBackgroundColor.slice(5,7),16)})`
    };

    return (
        <article id="weather-current" style={weatherCurrentStyle}>
            <section id="location">
                <h1>{location.name} {moment(dateTime).format('ddd MMM Do HH:mm')}</h1>
            </section>
            <section id="conditions">
                <span
                    className="emoji"
                    role="img"
                    aria-label={currentConditionTxt}>
                    {currentConditionTxt}
                </span>
                <p>{current.condition.text}</p>
            </section>
            <section id="weather">
                <p>Temperature: {current.temp_c}°C</p>
                <p>Humidity: {current.humidity}%</p>
            </section>
        </article>
    );
}


export default WeatherCurrent;

