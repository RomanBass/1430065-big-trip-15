import { TYPES } from './const.js';

const getPointsByType = (points) => { // трансформирует массив точек в объект массивов точек выбранных по типу
  const PointsByType = {};
  let allPoints = points.slice();
  let filteredPoints;
  let remainingPoints;

  TYPES.forEach((type) => {
    filteredPoints = allPoints.filter((point) => point.type === type);

    if (!filteredPoints.length) {
      return PointsByType;
    }

    remainingPoints = allPoints.filter((point) => point.type !== type);
    allPoints = remainingPoints;

    if (filteredPoints.length) {
      PointsByType[type] = filteredPoints;
    }

  });

  return PointsByType;
};

export const getMoneyByTypeData = (points) => { // возвращает объект типа {..., тип: полная стоимость,...}
  const INITIAL_TYPE_PRICE = 0;
  const moneyByTypeDataArray = [];
  const moneyByTypeDataObject = {};
  const PointsByType = getPointsByType(points);
  const currentTypes = Object.keys(PointsByType);

  let currentTypePrice = INITIAL_TYPE_PRICE;

  currentTypes.forEach((type) => {
    PointsByType[type].forEach((point) => {
      currentTypePrice += point.basePrice;
    });
    moneyByTypeDataArray.push([type.toUpperCase(), currentTypePrice]);
    currentTypePrice = INITIAL_TYPE_PRICE;
  });

  moneyByTypeDataArray.sort((a,b) => b[1] - a[1]);

  moneyByTypeDataArray.forEach((moneyByTypeInstance) => {
    moneyByTypeDataObject[moneyByTypeInstance[0]] = moneyByTypeInstance[1];
  });

  return moneyByTypeDataObject;
};

export const getPointsNumberByTypeData = (points) => { // возвращает объект типа {..., тип: количество точек,...}
  const INITIAL_TYPE_NUMBER = 0;
  const numberByTypeDataArray = [];
  const numberByTypeDataObject = {};
  const PointsByType = getPointsByType(points);
  const currentTypes = Object.keys(PointsByType);

  let currentTypeNumber = INITIAL_TYPE_NUMBER;

  currentTypes.forEach((type) => {
    currentTypeNumber = PointsByType[type].length;
    numberByTypeDataArray.push([type.toUpperCase(), currentTypeNumber]);
    currentTypeNumber = INITIAL_TYPE_NUMBER;
  });

  numberByTypeDataArray.sort((a,b) => b[1] - a[1]);

  numberByTypeDataArray.forEach((numberByTypeInstance) => {
    numberByTypeDataObject[numberByTypeInstance[0]] = numberByTypeInstance[1];
  });

  return numberByTypeDataObject;
};
