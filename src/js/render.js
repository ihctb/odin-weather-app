import logoSvg from '../img/logo.svg';
import { weatherIds } from './weather-id';

export const setHead = () => {
    document.documentElement.lang = 'ru';

    const head = document.head;

    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    head.appendChild(metaCharset);

    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1';
    head.appendChild(metaViewport);

    const title = document.createElement('title');
    title.textContent = 'Weather App';
    head.appendChild(title);
};

export const renderHeader = () => {
    const header = document.createElement('div');
    document.body.appendChild(header);
    header.classList.add('header');

    {
        const headerLeft = document.createElement('div');
        header.appendChild(headerLeft);
        headerLeft.classList.add('header-left');

        const logo = document.createElement('img');
        headerLeft.appendChild(logo);
        logo.classList.add('logo');
        logo.src = logoSvg;

        const logoText = document.createElement('h1');
        headerLeft.appendChild(logoText);
        logoText.textContent = 'Погода сейчас';
        logoText.id = 'logo-text';
    }

    {
        const headerRight = document.createElement('form');
        header.appendChild(headerRight);
        headerRight.classList.add('header-right');

        const submitBtn = document.createElement('button');
        headerRight.appendChild(submitBtn);
        submitBtn.id = 'submit-btn';
        submitBtn.type = 'submit';
        submitBtn.style.visibility = 'hidden';

        const searchBar = document.createElement('input');
        headerRight.appendChild(searchBar);
        searchBar.classList.add('search-bar');
        searchBar.placeholder = 'Введите город';
    }
};

export const renderWeatherCard = (info) => {
    document.querySelector('.main-contents')?.remove();
    const mainContents = document.createElement('div');
    document.body.appendChild(mainContents);
    mainContents.classList.add('main-contents');

    if (info === undefined) {
        renderSadFace(mainContents);
        return;
    }

    const weatherCard = document.createElement('div');
    mainContents.appendChild(weatherCard);
    weatherCard.classList.add('weather-card');

    {
        const cityNameArea = document.createElement('div');
        weatherCard.appendChild(cityNameArea);
        cityNameArea.id = 'city-name-area';
        cityNameArea.style.gridArea = 'city-name';

        {
            const countryFlag = document.createElement('img');
            cityNameArea.appendChild(countryFlag);
            countryFlag.id = 'country-flag';
            countryFlag.src = `https://raw.githubusercontent.com/joielechong/iso-country-flags-svg-collection/refs/heads/master/svg/country-squared/${info.country.toLowerCase()}.svg`;
        }

        {
            const cityName = document.createElement('h1');
            cityNameArea.appendChild(cityName);
            cityName.textContent = info.name;
        }
    }

    {
        const dateTimeArea = document.createElement('div');
        weatherCard.appendChild(dateTimeArea);
        dateTimeArea.id = 'date-time-area';
        dateTimeArea.style.gridArea = 'date-time';

        {
            const localTime = document.createElement('h1');
            dateTimeArea.appendChild(localTime);
            localTime.textContent = info.dt.time;
        }

        {
            const localDate = document.createElement('h2');
            dateTimeArea.appendChild(localDate);
            localDate.textContent = info.dt.date;
        }

        {
            const dayOfWeek = document.createElement('h2');
            dateTimeArea.appendChild(dayOfWeek);
            dayOfWeek.textContent = info.dt.dayOfWeek;
        }
    }

    {
        const iconTempArea = document.createElement('div');
        weatherCard.appendChild(iconTempArea);
        iconTempArea.id = 'icon-temp-area';
        iconTempArea.style.gridArea = 'icon-temp';

        {
            const weatherIcon = document.createElement('img');
            iconTempArea.appendChild(weatherIcon);
            weatherIcon.style.gridArea = 'icon';
            weatherIcon.src = `https://openweathermap.org/img/wn/${info.weather.icon}@4x.png`;
        }

        {
            const temperature = document.createElement('h1');
            iconTempArea.appendChild(temperature);
            temperature.style.gridArea = 'temp';
            temperature.textContent = `${info.temp.main > 0 ? '+' + info.temp.main : info.temp.main}°C`;
        }

        {
            const tempFeelsLike = document.createElement('h2');
            iconTempArea.appendChild(tempFeelsLike);
            tempFeelsLike.style.gridArea = 'feels-like';
            tempFeelsLike.textContent = `Ощущается как ${info.temp.feelsLike > 0 ? '+' + info.temp.feelsLike : info.temp.feelsLike}°C`;
        }

        {
            const weatherType = document.createElement('h2');
            iconTempArea.appendChild(weatherType);
            weatherType.style.gridArea = 'weather-type';
            weatherType.textContent = `${weatherIds[info.weather.id]}`;
        }
    }

    {
        const statsArea = document.createElement('div');
        weatherCard.appendChild(statsArea);
        statsArea.id = 'stats-area';
        statsArea.style.gridArea = 'stats';

        {
            const pressure = document.createElement('h2');
            statsArea.appendChild(pressure);
            pressure.style.gridArea = 'pressure';
            pressure.textContent = `${info.pressure} мм рт.ст.`;
        }

        {
            const humidity = document.createElement('h2');
            statsArea.appendChild(humidity);
            humidity.style.gridArea = 'humidity';
            humidity.textContent = `${info.humidity}%`;
        }

        {
            const windSpeed = document.createElement('h2');
            statsArea.appendChild(windSpeed);
            windSpeed.style.gridArea = 'wind-speed';
            windSpeed.textContent = `${info.wind.speed} м/с`;
        }

        {
            const windGust = document.createElement('h2');
            statsArea.appendChild(windGust);
            windGust.style.gridArea = 'wind-gust';
            windGust.textContent = `Порывы до ${info.wind.gust} м/с`;
        }
    }
};

const renderSadFace = (mainContents) => {
    const sadFaceDiv = document.createElement('div');
    mainContents.appendChild(sadFaceDiv);
    sadFaceDiv.classList.add('sad-face-div');

    const sadFace = document.createElement('h1');
    sadFaceDiv.appendChild(sadFace);
    sadFace.textContent = '😢';

    const sadText = document.createElement('h2');
    sadFaceDiv.appendChild(sadText);
    sadText.textContent = `Такой город не найден или ошибка подключения к серверу погоды`;
};
