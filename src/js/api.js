export const getWeather = async (city) => {
    console.log(city);

    const cityData = await findCityByName(city);
    if (cityData === undefined) return undefined;

    const weatherData = await getWeatherDataFromCoordinates(
        cityData.lat,
        cityData.lon
    );
    if (weatherData === undefined) return undefined;

    return {
        name: cityData.name,
        dt: getDateObject(
            new Date((weatherData.dt + weatherData.timezone) * 1000)
        ),
        country: weatherData.sys.country,
        weather: {
            id: weatherData.weather[0].id,
            icon: weatherData.weather[0].icon,
        },
        temp: {
            main: Math.round(weatherData.main.temp),
            feelsLike: Math.round(weatherData.main.feels_like),
        },
        pressure: Math.round(weatherData.main.pressure * 0.75),
        humidity: Math.round(weatherData.main.humidity),
        wind: {
            speed: Math.round(weatherData.wind.speed),
            gust: Math.round(weatherData.wind.gust),
        },
    };
};

const findCityByName = async (cityName) => {
    try {
        const [response] = await (
            await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
            )
        ).json();

        console.log(response);

        return {
            name: response.local_names.ru || response.name,
            lat: response.lat,
            lon: response.lon,
        };
    } catch {
        return undefined;
    }
};

const getWeatherDataFromCoordinates = async (latitude, longitude) => {
    try {
        const response = await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            )
        ).json();

        console.log(response);

        return response;
    } catch {
        return undefined;
    }
};

const getDateObject = (date) => {
    console.log(date);
    const pad = (n) => n.toString().padStart(2, '0');

    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    const daysOfWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];

    return {
        date: `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`,
        time: `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`,
        dayOfWeek: daysOfWeek[date.getUTCDay()],
    };
};
