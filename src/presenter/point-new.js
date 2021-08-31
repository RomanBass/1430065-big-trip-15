import EditFormView from '../view/edit-form.js';
import { render, RenderPosition, remove } from '../utils/render';
import { UserAction, UpdateType } from '../utils/const.js';
import { nanoid } from 'nanoid';

export default class PointNew {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._editFormComponent = null;
    this._changeData = changeData;

    this._handleEditFormSubmit = this._handleEditFormSubmit.bind(this);
  }

  init() {

    if (this._editFormComponent !== null) { // чтобы не отрисовывалось две формы добавления
      return;
    }

    this._editFormComponent = new EditFormView();

    this._editFormComponent.setEditFormSubmitButtonClickHandler(this._handleEditFormSubmit);

    render(this._eventListContainer, this._editFormComponent, RenderPosition.AFTERBEGIN);

  }

  destroy() {
    remove(this._editFormComponent);
    this._editFormComponent = null;
  }

  _handleEditFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      Object.assign({}, point, {id: nanoid()}),
    );
    this.destroy();
  }

}
