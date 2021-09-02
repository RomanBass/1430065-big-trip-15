import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {render, RenderPosition, replace} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const POINTS_COUNT = 0;
const points = new Array(POINTS_COUNT).fill().map(generatePoint); // массив точек маршрута

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header'); // крупный блок
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation'); // контейнеры...
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(menuElement, new SiteMenuView(), RenderPosition.BEFOREEND); // отрисовки компонентов...

if (points.length) { // элемент с информацией отрисовывается, только если в данных есть точки
  let tripInfo = new InfoAndPriceView(getRoutePrice(points), getRouteDates(points), getRouteName(points));

  render(tripElement, tripInfo, RenderPosition.AFTERBEGIN);
  pointsModel.addObserver(() => {
    const pointsArray = pointsModel.getPoints();
    const newTripInfo = new InfoAndPriceView(getRoutePrice(pointsArray), getRouteDates(pointsArray), getRouteName(pointsArray));

    replace(newTripInfo, tripInfo);
    tripInfo = newTripInfo;
  });
}

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

export {points};
