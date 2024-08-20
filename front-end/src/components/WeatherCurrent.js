import React, { useEffect, useState } from 'react';
import conditions from '../conditions';

import moment from 'moment';


function formatDate(date) {
    // DATE is from last update time needs to be actual time maybe use tz_id
    const formattedDate = moment(date).format('ddd MMM Do HH:mm');
    return formattedDate;
}




function WeatherCurrent({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }
    const { current, location } = weather;

    const currentConditionTxt = conditions[current.condition.text.toLowerCase()] ?? '❓';

    return (
        <article id="weather-current">
            <section id="location">
                <h1>{location.name} {formatDate(location.localtime)}</h1>
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

