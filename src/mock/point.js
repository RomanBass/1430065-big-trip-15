import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import { CITIES, TYPES, PHOTO_DESCRIPTIONS, OfferTitles, DESCRIPTION_SENTENCES } from '../utils/const.js';
import { getRandomInteger } from '../utils/common.js';

const getPossibleOffers = (Titles) => { // формирует объект возможных опций из объекта заголовков типа OfferTitles
  const Offers = JSON.parse(JSON.stringify(Titles));
  for (const key in Offers) {
    Offers[key].forEach((element) => {
      Offers[key][Offers[key].indexOf(element)] = {title: Offers[key][Offers[key].indexOf(element)], price: getRandomInteger(50, 100)};
    });
  }
  return Offers;
};

export const possibleOffers = (getPossibleOffers(OfferTitles));

export const getPictures = () => { // создание массива объектов фотографий с описаниями
  const pictures = [];
  let descriptions = PHOTO_DESCRIPTIONS;
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const descriptionValue = descriptions[getRandomInteger(0, descriptions.length - 1)];
    const picture = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 10000)}`,
      description: descriptionValue,
    };
    pictures.push(picture);
    descriptions = descriptions.filter((element) => element !== descriptionValue);
  }
  return pictures;
};

export const getOffers = (type) => { // создание массива объектов опций
  const offers = [];
  possibleOffers[type].forEach((possibleOffer) => {
    const marker = getRandomInteger(0, 1);
    if (marker) {
      offers.push(possibleOffer);
    }
  });
  return offers;
};

export const getDescription = () => { // создание описания соединением случайно выбираемых предложений из их массива
  let description = '';
  let sentances = DESCRIPTION_SENTENCES;
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    const descriptionValue = sentances[getRandomInteger(sentances.length - 1)];
    description += i === 0 ? descriptionValue : ` ${descriptionValue}`;
    sentances = sentances.filter((element) => element !== descriptionValue);
  }
  return description;
};

export const makeFavorite = (isFavorite) => isFavorite === true ? 'active' : '';// добавляется к точке идентификатор "избранная", делая звёздочку жёлтой

export const generatePoint = () => {
  const startDate = dayjs().add(getRandomInteger(-5, 10), 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0, 59), 'minute');
  const finishDate = startDate.add(getRandomInteger(0, 3), 'day').add(getRandomInteger(0, 23), 'hour').add(getRandomInteger(0, 59), 'minute');
  const getType = () => TYPES[getRandomInteger(0, TYPES.length - 1)];
  const TYPE = getType();

  return {
    basePrice: getRandomInteger(100, 200),
    dateFrom: startDate,
    dateTo: finishDate,
    destination: {
      description: getDescription(),
      name: CITIES[getRandomInteger(0, CITIES.length - 1)],
      pictures: getPictures(),
    },
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getOffers(TYPE),
    type: TYPE,
  };
};
