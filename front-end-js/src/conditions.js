const conditions = {
    'sunny': '☀️',
    'partly cloudy': '🌤️',
    'cloudy': '☁️',
    'overcast': '🌥️',
    'clear': '⭐',
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


const hourColors = {
    night: "#0B3D91",
    twilight: "#4B0082",
    sunriseGlow: "#65498C",
    sunrise: "#FFA07A",
    day: "#00BFFF",
    sunset: "#FF4500",
    dusk: "#8B0000",
    midnight: "#191970"
};

function getBackgroundColor(currentTime, sunriseTime, sunsetTime, cloudCover) {
    console.log("currentTime:", currentTime.format());
    console.log("sunriseTime:", sunriseTime.format());
    console.log("sunsetTime:", sunsetTime.format());
    console.log("cloudCover:", cloudCover);

    const getTimePeriod = () => {
        const sunriseStart = sunriseTime.clone().subtract(30, 'minutes');
        const sunriseEnd = sunriseTime.clone().add(30, 'minutes');
        const sunsetStart = sunsetTime.clone().subtract(30, 'minutes');
        const sunsetEnd = sunsetTime.clone().add(30, 'minutes');

        if (currentTime.isBefore(sunriseStart)) {
            console.log("before sunrise");
            return 'night';
        }
        if (currentTime.isBetween(sunriseStart, sunriseTime)) {
            console.log("between sunrise start and sunrise");
            return 'twilight';
        }
        if (currentTime.isBetween(sunriseTime, sunriseEnd)) {
            console.log("between sunrise and sunrise end");
            return 'sunriseGlow';
        }
        if (currentTime.isBetween(sunriseEnd, sunsetStart)) {
            console.log("between sunrise end and sunset start");
            return 'day';
        }
        if (currentTime.isBetween(sunsetStart, sunsetTime)) {
            console.log("between sunset start and sunset");
            return 'sunset';
        }
        if (currentTime.isBetween(sunsetTime, sunsetEnd)) {
            console.log("between sunset and sunset end");
            return 'dusk';
        }
        console.log("after sunset");
        return 'midnight';
    };

    const timePeriod = getTimePeriod();
    console.log("timePeriod:", timePeriod);

    let color = hourColors[timePeriod];

    if (cloudCover) {
        console.log("cloudCover:", cloudCover);
        const cloudFactor = parseInt(1 - (cloudCover / 100));
        //TODO: Fix making overcast
        color = ColorUtils.addWhite(color, cloudFactor);
        // color = ColorUtils.adjustBrightness(color, cloudFactor);
    }

    console.log("color:", color);

    return color;
}

const ColorUtils = {
    componentToHex(c) {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },

    rgbToHex(r, g, b) {
        return `#${this.componentToHex(r)}${this.componentToHex(g)}${this.componentToHex(b)}`;
    },

    hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    },

    adjustBrightness(color, factor) {
        const { r, g, b } = this.hexToRgb(color);
        const newR = Math.round(r * factor);
        const newG = Math.round(g * factor);
        const newB = Math.round(b * factor);
        return this.rgbToHex(newR, newG, newB).toUpperCase();
    },

    addWhite(color, amount) {
        const { r, g, b } = this.hexToRgb(color);
        const newR = Math.min(255, Math.round(r + (255 - r) * amount));
        const newG = Math.min(255, Math.round(g + (255 - g) * amount));
        const newB = Math.min(255, Math.round(b + (255 - b) * amount));
        return this.rgbToHex(newR, newG, newB).toUpperCase();
    }
};

const moonPhases = {

    'New Moon': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘'
}




export { conditions, moonPhases, getBackgroundColor };
