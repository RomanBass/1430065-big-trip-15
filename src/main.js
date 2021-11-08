import SiteMenuView from './view/site-menu.js';
import InfoAndPriceView from './view/info-price.js';
//import {generatePoint} from './mock/point.js';
import { getRouteDates, getRoutePrice, getRouteName } from './utils/route.js';
import {remove, render, RenderPosition} from './utils/render.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
//import { possibleOffers } from './mock/point.js';
import { MenuItem, UpdateType } from './utils/const.js';
import StatisticsView from './view/statistics.js';
import { getMoneyByTypeData, getPointsNumberByTypeData, getDurationByTypeData}
  from  './utils/statistics.js';
import Api from './api.js';
import { BlankPossibleOffers } from './utils/const.js';
import { getDestinationsFromPoints } from './utils/route.js';

const AUTHORIZATION = 'Basic df9df9df8sd8fg8h';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const siteHeaderElement = document.querySelector('.page-header'); // крупный блок
const menuElement = siteHeaderElement.querySelector('.trip-controls__navigation'); // контейнеры...
const tripElement = siteHeaderElement.querySelector('.trip-main');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const bodyElement = document.querySelector('.page-main .page-body__container');
const tripEventsElement = document.querySelector('.trip-events');

const api = new Api(END_POINT, AUTHORIZATION);
const filterModel = new FilterModel();
const pointsModel = new PointsModel();
const siteMenuComponent = new SiteMenuView();

render(menuElement, siteMenuComponent, RenderPosition.BEFOREEND); // отрисовки компонентов...

const tripInfo = new InfoAndPriceView(
  getRoutePrice(pointsModel.getPoints()),
  getRouteDates(pointsModel.getPoints()),
  getRouteName(pointsModel.getPoints()));

render(tripElement, tripInfo, RenderPosition.AFTERBEGIN);
pointsModel.addObserver(() => {
  tripInfo.updateData(
    {
      tripPrice: getRoutePrice(pointsModel.getPoints(), pointsModel.getOffers()),
      tripDate: getRouteDates(pointsModel.getPoints()),
      tripName: getRouteName(pointsModel.getPoints()),
    },
  );
});

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuOptionName) => {

  switch (menuOptionName) {
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();

      statisticsComponent = new StatisticsView(
        getMoneyByTypeData(pointsModel.getPoints()),
        getPointsNumberByTypeData(pointsModel.getPoints()),
        getDurationByTypeData(pointsModel.getPoints()),
      );

      render(bodyElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }

};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

tripPresenter.init();
filterPresenter.init();

pointsModel.addObserver(() => {
  if (statisticsComponent) {
    statisticsComponent.updateData(
      {
        tripMoneyData: getMoneyByTypeData(pointsModel.getPoints()),
        tripTypeData: getPointsNumberByTypeData(pointsModel.getPoints()),
        tripDurationData: getDurationByTypeData(pointsModel.getPoints()),
      },
    );
  }
});

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

const points = pointsModel.getPoints();

api.getOffers()
  .then((offersFromServer) => {
    pointsModel.setOffers(offersFromServer);
  })
  .catch((err) => {
    console.log(err);
    pointsModel.setOffers(BlankPossibleOffers);
  })

  .then(() => {
    api.getDestinations()
      .then((serverDestinations) => {
        pointsModel.setDestinations(serverDestinations);
      })
      .catch((err) => {
        console.log(err);
      })

      .then(() => {
        api.getPoints()
          .then((pointsFromServer) => {

            if (!pointsModel.getDestinations().length) {
              pointsModel.setDestinations(getDestinationsFromPoints(pointsFromServer));
            }

            pointsModel.setPoints(UpdateType.INIT, pointsFromServer);
          })
          .catch((err) => {
            console.log(err);
            pointsModel.setPoints(UpdateType.INIT, []);
          });
      });
  });

export {points};
