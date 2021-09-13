import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import { possibleOffers } from './mock/point.js';
import { MenuItem } from './utils/const.js';

const POINTS_COUNT = 5;
const points = new Array(POINTS_COUNT).fill().map(generatePoint); // массив точек маршрута

const pointsModel = new PointsModel();
pointsModel.setPoints(points);
pointsModel.setOffers(possibleOffers);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.page-header'); // крупный блок
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation'); // контейнеры...
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const siteMenuComponent = new SiteMenuView();

render(menuElement, siteMenuComponent, RenderPosition.BEFOREEND); // отрисовки компонентов...

const tripInfo = new InfoAndPriceView(getRoutePrice(pointsModel.getPoints()), getRouteDates(pointsModel.getPoints()), getRouteName(pointsModel.getPoints()));

render(tripElement, tripInfo, RenderPosition.AFTERBEGIN);
pointsModel.addObserver(() => {
  tripInfo.updateData({tripPrice: getRoutePrice(pointsModel.getPoints()), tripDate: getRouteDates(pointsModel.getPoints()), tripName: getRouteName(pointsModel.getPoints())});
});

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      //
      break;
    case MenuItem.STATISTICS:
      //
      break;
  }
//console.log('click');
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

export {points};
