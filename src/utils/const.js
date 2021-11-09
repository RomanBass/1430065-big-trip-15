import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const CITIES = ['London', 'Paris', 'Beijing', 'Tokyo', 'Melbourne'];
export const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const PHOTO_DESCRIPTIONS = ['Beautiful Mountain Sea', 'Island archipelago', 'River Delta', 'Desert Storm', 'Snow Mountains'];

export const BlankPossibleOffers = {
  bus: [],
  'check-in': [],
  drive: [],
  flight: [],
  restaurant: [],
  ship: [],
  sightseeing: [],
  taxi: [],
  train: [],
};

export const DESCRIPTION_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'];

export const AddFormData = { // данные для дефолтной точки
  BASE_PRICE: 100,
  TRIP_DURATION: 3,
  DESTINATION: {description: '', name: CITIES[0], pictures: []},
  ID: nanoid(),
  IS_FAVORITE: false,
  OFFERS: [],
  TYPE: 'taxi',
};

export const BlankPoint = { // дефолтная точка для формы добавления
  basePrice: AddFormData.BASE_PRICE,
  dateFrom: dayjs(),
  dateTo: dayjs().add(AddFormData.TRIP_DURATION, 'day'),
  destination: AddFormData.DESTINATION,
  id: AddFormData.ID,
  isFavorite: AddFormData.IS_FAVORITE,
  offers: AddFormData.OFFERS,
  type: AddFormData.TYPE,
};

export const SortType = {
  BY_DATE_FROM: 'sort-day',
  BY_PRICE: 'sort-price',
  BY_DURATION: 'sort-time',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const NoPointMessage = { //сообщения при отсутствии базовых или отфильтрованных точек
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

export const MenuItem = {
  TABLE: 'table',
  STATISTICS: 'stats',
};

export const blankPossibleDestinations = [{
  name: 'London',
  description: 'London is the capital of the UK',
  pictures: {src: '', description: ''},
}];
