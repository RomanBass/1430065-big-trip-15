import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import FilterView from './view/filter.js';
import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';

const POINTS_COUNT = 4;
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
render(filtersElement, new FilterView(), RenderPosition.BEFOREEND);

if (points.length !== 0) { // элемент с информацией отрисовывается, только если в данных нет ни одной точки
  render(tripElement, new InfoAndPriceView(getRoutePrice(points), getRouteDates(points), getRouteName(points)), RenderPosition.AFTERBEGIN);
}

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel);
tripPresenter.init();

export {points};
