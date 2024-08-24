import React from 'react';
import conditions from '../conditions';
import moment from 'moment';

function WeatherHourly({ weather }) {
    if (!weather) {
        return <div>Loading...</div>;
    }
//  TODO: fix filtering
    const localTime = moment.utc(weather.location.localtime);
    // const localTime = moment(weather.location.localtime, "YYYY-MM-DD HH:mm"); // Parsing the local time format
    // const localTime = new Date(weather.location.localtime);
    return (
        <article id="weather-hourly">
            <section id="forecast-list">
                <h1>Hourly Forecast</h1>
                <ul>
                    {weather.forecast.forecastday[0].hour
                    .filter(hour => {
                         // Parsing hour time in UTC
                         const hourTime = moment.utc(hour.time, "YYYY-MM-DD HH:mm");
                        
                         // Debugging output
                         console.log(`Local Time (UTC): ${localTime.format()}`);
                         console.log(`Hour Time (UTC): ${hourTime.format()}`);
                         
                         // Return true if hourTime is after or the same as localTime
                         return hourTime.isSameOrBefore(localTime);
                        // // Parsing hour time
                        // const hourTime = moment(hour.time, "YYYY-MM-DD HH:mm", true);
                        
                        // // Debugging output
                        // console.log(`Local Time: ${localTime.format()}`);
                        // console.log(`Hour Time: ${hourTime.format()}`);
                        
                        // // Ensure times are in the same time zone
                        // console.log(`Hour Time (UTC): ${hourTime.utc().format()}`);
                        // console.log(`Local Time (UTC): ${localTime.utc().format()}`);
                        
                        // // Return true if hourTime is after or the same as localTime
                        // return hourTime.isSameOrAfter(localTime);
                        // const hourTime = moment(hour.time, "YYYY-MM-DD HH:mm");
                        // // return hourTime.isSameOrAfter(localTime);
                        // // return hourTime.isBefore(localTime);
                        // return hourTime.isAfter(localTime);
                        // return hourTime;
                        // // const hourTime = new Date(hour.time.replace(' ', 'T')); // Convert hour.time to Date object
                        // // console.log(`${hourTime} >= ${localTime} is ${hourTime >= localTime} `)
                        // // return hourTime <= localTime;
                    })
                    .map(hour => (
                        <li key={hour.time_epoch}>
                            <section id="conditions">
                                <h2>{moment(hour.time).format('hh:mm A')}</h2>
                                <span
                                    className="emoji"
                                    role="img"
                                    aria-label={hour.condition.text}
                                >
                                    {conditions[hour.condition.text.toLowerCase()] ?? '❓'}
                                </span>
                                <p>{hour.condition.text}</p>
                            </section>
                            <section id="weather">
                                <p>Temperature: {hour.temp_c}°C</p>
                                <p>Humidity: {hour.humidity}%</p>
                            </section>
                        </li>
                    ))}
                </ul>
            </section>
        </article>
    );
}

export default WeatherHourly;
