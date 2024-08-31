import React, { useEffect, useState } from 'react';
import { conditions, getBackgroundColor } from '../conditions';

import moment from 'moment';


function formatDate(date) {
    const formattedDate = moment(date).format('ddd MMM Do HH:mm');
    return formattedDate;
}

function WeatherCurrent({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }
    const { current, location } = weather;

    const currentConditionTxt = conditions[current.condition.text.toLowerCase()] ?? '❓';
    const dateTime = moment(location.localtime);
    const currentBackgroundColor = getBackgroundColor(dateTime, false);

    const weatherCurrentStyle = {
        backgroundColor: currentBackgroundColor
    };

    return (
        <article id="weather-current" style={weatherCurrentStyle}>
            {currentBackgroundColor}
            <section id="location">
                <h1>{location.name} {formatDate(dateTime)}</h1>
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

