import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

export const CITIES = ['London', 'Paris', 'Beijing', 'Tokyo', 'Melbourne'];
export const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
export const PHOTO_DESCRIPTIONS = ['Beautiful Mountain Sea', 'Island archipelago', 'River Delta', 'Desert Storm', 'Snow Mountains'];

export const OfferTitles = {
  taxi: ['Taxi-Option-1', 'Taxi-Option-2', 'Taxi-Option-3', 'Taxi-Option-4', 'Taxi-Option-5'],
  bus: [],
  train: ['Train-Option-1', 'Train-Option-2', 'Train-Option-3', 'Train-Option-4', 'Train-Option-5'],
  ship: [],
  transport: ['Transport-Option-1', 'Transport-Option-2', 'Transport-Option-3', 'Transport-Option-4', 'Transport-Option-5'],
  drive: [],
  flight: ['Flight-Option-1', 'Flight-Option-2', 'Flight-Option-3', 'Flight-Option-4', 'Flight-Option-5'],
  'check-in': [],
  sightseeing: ['Sightseeng-Option-1', 'Sightseeng-Option-2', 'Sightseeng-Option-3', 'Sightseeng-Option-4', 'Sightseeng-Option-5'],
  restaurant: ['Restaurant-Option-1', 'Restaurant-Option-2', 'Restaurant-Option-3', 'Restaurant-Option-4', 'Restaurant-Option-5'],
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
  BASE_PRICE: 150,
  TRIP_DURATION: 3,
  DESTINATION: {description: '', name: '', pictures: []},
  ID: nanoid(),
  IS_FAVORITE: false,
  OFFERS: [{title: 'Taxi-Option-2'}, {title: 'Taxi-Option-5'}],
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
