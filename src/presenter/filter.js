import FilterView from '../view/filter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../utils/const.js';
import { points } from '../main.js';

export default class Filter {
  constructor (filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    //this._pointsModel = pointsModel;
    this._currentFilterType = FilterType.EVERYTHING;

    this._filterComponent = null;

    //this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    //this._pointsModel.addObserver(this._handleModelEvent);
    //this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilter();
  }

  _renderFilter() {
    if (this._filterComponent !== null) {
      this._filterComponent === null;
    }

    this._filterComponent = new FilterView(this._currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  // _handleModelEvent() {
  //   //this.init();
  // }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    this._currentFilterType = filterType;
  }
}
