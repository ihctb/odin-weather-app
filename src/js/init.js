import '../css/style.css';
import { getWeather } from './api.js';
import { renderHeader, renderWeatherCard, setHead } from './render.js';

setHead();
renderHeader();

document
    .querySelector('.header-right')
    .addEventListener('submit', async (event) => {
        event.preventDefault();
        renderWeatherCard(
            await getWeather(document.querySelector('.search-bar').value)
        );
    });

renderWeatherCard(await getWeather('Moscow'));
