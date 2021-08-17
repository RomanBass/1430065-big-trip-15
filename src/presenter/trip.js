import SortingView from '../view/sorting.js';
import NoPointView from '../view/no-point.js';
import EventsListView from '../view/events-list.js';
import {render, RenderPosition} from '../utils/render.js';
import PointPresenter from './point.js';
import { SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortByDateFrom, sortByPrice, sortByDuration } from '../utils/route.js';
import EditForm from '../view/edit-form.js';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._sortingComponent = null;
    this._noPointComponent = new NoPointView();
    this._eventsListComponent = new EventsListView();
    this._pointPresenters = {};
    this._currentSortType = SortType.BY_DATE_FROM;
    this._addFormComponent = new EditForm();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
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

  _handleViewAction(actionType, updateType, update) { //обрабатывает как отражается на модели действие на представлении
    //console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) { // обрабатывает как отражается на представлении изменение в модели
    //console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenters[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // обновить список
        break;
      case UpdateType.MAJOR:
        //обновить всю доску
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearPointsList();
    this._renderPoints();
  }

  _renderSort() {

    if (this._sortingComponent !== null) {
      this._sortingComponent === null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenters[point.id] = pointPresenter;
  }

  _renderPoints() {
    ////this._renderPoint(BlankPoint);
    this._getPoints().slice().forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

}
