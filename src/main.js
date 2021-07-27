import {createSiteMenuTemplate} from './view/site-menu.js';
import {createInfoAndPriceTemplate} from './view/info-price.js';
import {createFiltersTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createEventsList} from './view/events-list.js';
import {createEditFormTemplate} from './view/edit-form.js';
import {createTripPointTemplate} from './view/trip-point.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// крупные блоки
const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

// контейнеры...
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

// отрисовки
render(menuElement, createSiteMenuTemplate(), 'beforeend');
render(tripElement, createInfoAndPriceTemplate(), 'afterbegin');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortingTemplate(), 'beforeend');
render(tripEventsElement, createEventsList(), 'beforeend');

// контейнеры отрисованные в коде выше
const tripEventsList = tripEventsElement.querySelector('.trip-events__list');

// отрисовки внутри срендерЁнных контейнеров
render(tripEventsList, createEditFormTemplate(), 'afterbegin');

for (let i = 0; i < 3; i++) {
  render(tripEventsList, createTripPointTemplate(), 'beforeend');
}
