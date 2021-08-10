import SortingView from '../view/sorting.js';
import NoPointView from '../view/no-point.js';
import EventsListView from '../view/events-list.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';
import { SortType } from '../utils/const.js';
///import { BlankPoint, SortType } from '../utils/const.js';
import { sortByDateFrom, sortByPrice, sortByDuration } from '../utils/route.js';
import EditForm from '../view/edit-form.js';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._sortingComponent = new SortingView();
    this._noPointComponent = new NoPointView();
    this._eventsListComponent = new EventsListView();
    this._pointPresenters = {};
    this._currentSortType = SortType.BY_DATE_FROM;
    this._addFormComponent = new EditForm();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    if (this._getPoints().length === 0) { // если точек нет, то отображается заглушка
      this._renderNoPoints();
    } else {
      this._renderSort();
      this._renderEventsList();
      this._renderPoints();
    }
  }

  _clearPointsList() { // удаляет все точки
    Object
      .values(this._pointPresenters)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenters = {};
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.BY_DATE_FROM:
        return this._pointsModel.getPoints().slice().sort(sortByDateFrom);
      case SortType.BY_PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
      case SortType.BY_DURATION:
        return this._pointsModel.getPoints().slice().sort(sortByDuration);
    }
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenters)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) { // изменяет данные точки
    //this._points = updateItem(this._points, updatedPoint); // заменяет в моках точек объект с данными у изменённой точки
    ///this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenters[updatedPoint.id].init(updatedPoint); // инициализирует презентер точки с обновлёнными данными
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPoints();
  }

  _renderSort() {
    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters[point.id] = pointPresenter;
  }

  _renderPoints() {
    ///this._renderPoint(BlankPoint); возможно пригодится
    this._getPoints().slice().forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

}
