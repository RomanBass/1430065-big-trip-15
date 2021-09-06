import FilterView from '../view/filter.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import { FilterType, UpdateType } from '../utils/const.js';

export default class Filter {
  constructor (filterContainer, filterModel, pointsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._pointsModel = pointsModel;
    this._currentFilterType = FilterType.EVERYTHING;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._filterModel.getFilter());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) { // производит отбой, если клик происходит по текущему фильтру
      return;
    }

    if (!this._pointsModel.getPoints().length) { // производит блокировку фильтра, если массив точек пустой
      this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      this._currentFilterType = FilterType.EVERYTHING;
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);  // производит изменение модели фильтров
    this._currentFilterType = filterType;
  }
}
