import dayjs from 'dayjs';

export const sortByDateFrom = (pointOne, pointTwo) => dayjs(pointOne.dateFrom).diff(dayjs(pointTwo.dateFrom));

export const sortByPrice = (pointOne, pointTwo) => {
  if (pointTwo.basePrice === pointOne.basePrice) { // если у точек одинаковая цена, то они сортируются по дате-времени начала
    return dayjs(pointOne.dateFrom).diff(dayjs(pointTwo.dateFrom));
  }
  return pointTwo.basePrice - pointOne.basePrice;
};

export const sortByDuration = (pointOne, pointTwo) => {
  const firstPointTravelDuration = dayjs(pointOne.dateTo).diff(dayjs(pointOne.dateFrom));
  const secondPointTravelDuration = dayjs(pointTwo.dateTo).diff(dayjs(pointTwo.dateFrom));
  return secondPointTravelDuration - firstPointTravelDuration;
};

export const getRouteName = (points) => { // вернуть имя маршрута
  const pointsByDateFrom = points.slice().sort(sortByDateFrom);
  let routeName = `${pointsByDateFrom[0].destination.name} ... ${pointsByDateFrom[pointsByDateFrom.length - 1].destination.name}` ;
  if (pointsByDateFrom.length === 3) {
    routeName = `${pointsByDateFrom[0].destination.name} &mdash; ${pointsByDateFrom[1].destination.name}  &mdash; ${pointsByDateFrom[2].destination.name}`;
  } else if (pointsByDateFrom.length === 2) {
    routeName = `${pointsByDateFrom[0].destination.name} &mdash; ${pointsByDateFrom[1].destination.name}`;
  } else if (pointsByDateFrom.length === 1) {
    routeName = `${pointsByDateFrom[0].destination.name}`;
  }
  return routeName;
};

export const getRouteDates = (points) => { // вернуть время маршрута
  const pointsByDateFrom = points.slice().sort(sortByDateFrom);
  let routeDates = `${pointsByDateFrom[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${pointsByDateFrom[pointsByDateFrom.length - 1].dateTo.format('MMM DD')}`;
  if (pointsByDateFrom[0].dateFrom.format('MMM') === pointsByDateFrom[pointsByDateFrom.length - 1].dateTo.format('MMM')) {
    routeDates = `${pointsByDateFrom[0].dateFrom.format('MMM DD')} &nbsp;&mdash;&nbsp ${pointsByDateFrom[pointsByDateFrom.length - 1].dateTo.format('DD')}`;
  }
  return routeDates;
};

export const getRoutePrice = (points) => { // вернуть стоимость маршрута
  let routePrice = 0;
  points.forEach((point) => {
    routePrice += point.basePrice; // добавление стоимости поездки
    point.offers.forEach((offer) => { // добавление стоимости выбранных опций
      routePrice += offer.price;
    });
  });
  return routePrice;
};

export const getCitiesUniqueNames = (points) => { // выдаёт отсортированный массив уникальных названий городов из массива точек маршрута
  let citiesNames = new Set();
  points.forEach((point) => {
    citiesNames.add(point.destination.name);
  });
  citiesNames = Array.from(citiesNames).sort(); // преобразовывает сет в массив, чтобы отсортировать данные по алфавиту
  return citiesNames;
};


