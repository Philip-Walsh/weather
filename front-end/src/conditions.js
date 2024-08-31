const conditions = {
    'sunny': '☀️',
    'partly cloudy': '🌤️',
    'cloudy': '☁️',
    'overcast': '🌥️',
    'mist': '🌫️',
    'patchy rain possible': '🌦️',
    'patchy rain nearby': '🌧️',
    'patchy snow possible': '🌨️',
    'patchy sleet possible': '🌨️',
    'patchy freezing drizzle possible': '❄️',
    'thundery outbreaks possible': '⛈️',
    'blowing snow': '🌬️',
    'blizzard': '🌨️',
    'fog': '🌫️',
    'freezing fog': '❄️',
    'patchy light drizzle': '🌧️',
    'light drizzle': '🌦️',
    'light rain': '🌧️',
    'moderate rain at times': '🌧️',
    'moderate rain': '🌧️',
    'heavy freezing drizzle': '❄️',
    'heavy rain at times': '🌧️',
    'heavy rain': '🌧️',
    'light freezing rain': '🌨️',
    'moderate or heavy freezing rain': '🌨️',
    'light sleet': '🌨️',
    'moderate or heavy sleet': '🌨️',
    'patchy light snow': '🌨️',
    'light snow': '🌨️',
    'patchy moderate snow': '🌨️',
    'moderate snow': '🌨️',
    'patchy heavy snow': '🌨️',
    'heavy snow': '❄️',
    'ice pellets': '🧊',
    'light rain shower': '🌧️',
    'moderate or heavy rain shower': '🌧️',
    'torrential rain shower': '🌧️',
    'light sleet showers': '🌨️',
    'moderate or heavy sleet showers': '🌨️',
    'light snow showers': '🌨️',
    'moderate or heavy snow showers': '❄️',
    'light showers of ice pellets': '🧊',
    'moderate or heavy showers of ice pellets': '🧊',
    'patchy light rain with thunder': '🌩️',
    'moderate or heavy rain with thunder': '🌩️',
    'patchy light snow with thunder': '⛈️',
    'moderate or heavy snow with thunder': '⛈️',
}
const hourColors = [
    "#0B3D91", // 0 AM - Deep Night
    "#102E7A", // 1 AM - Deep Night
    "#152165", // 2 AM - Deep Night
    "#1B1450", // 3 AM - Late Night
    "#210E3B", // 4 AM - Late Night
    "#360E3D", // 5 AM - Pre-Dawn
    "#65498C", // 6 AM - Sunrise Glow
    "#FFA07A", // 7 AM - Sunrise
    "#FFD700", // 8 AM - Morning
    "#FFF8DC", // 9 AM - Morning Light
    "#FFFFE0", // 10 AM - Daylight
    "#FFFF99", // 11 AM - Late Morning
    "#FFFF66", // 12 PM - Noon
    "#FFFF33", // 1 PM - Afternoon
    "#FFE066", // 2 PM - Early Afternoon
    "#FFCC66", // 3 PM - Late Afternoon
    "#FFB347", // 4 PM - Golden Hour
    "#FF8C00", // 5 PM - Pre-Sunset
    "#FF4500", // 6 PM - Sunset
    "#FF6347", // 7 PM - Post-Sunset
    "#8B0000", // 8 PM - Dusk
    "#4B0082", // 9 PM - Twilight
    "#2C0E4D", // 10 PM - Night
    "#191970"  // 11 PM - Midnight
];
function getBackgroundColor(time, isOvercast) {
    const hour = time.hour();
    let color = hourColors[hour];

    // Adjust color for overcast conditions 🌥️
    if (isOvercast) {
        const overcastFactor = 0.8;
        color = adjustBrightness(color, overcastFactor);
    }

    return color;
}

function adjustBrightness(color, factor) {
    const r = Math.round(parseInt(color.slice(1, 3), 16) * factor);
    const g = Math.round(parseInt(color.slice(3, 5), 16) * factor);
    const b = Math.round(parseInt(color.slice(5, 7), 16) * factor);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

const moonPhases =  {

    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘'
}




export { conditions,  moonPhases, getBackgroundColor };
