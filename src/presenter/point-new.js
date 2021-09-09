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
    this._handleAddFormCancel = this._handleAddFormCancel.bind(this);
  }

  init(point, offers) {

    if (this._editFormComponent !== null) { // чтобы не отрисовывалось две формы добавления
      return;
    }

    this._editFormComponent = new EditFormView(point, offers);

    this._editFormComponent.setEditFormSubmitButtonClickHandler(this._handleEditFormSubmit);
    this._editFormComponent.setAddFormCancelHandler(this._handleAddFormCancel);

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

  _handleAddFormCancel() { // обработчик на кнопку Cancel для удаления формы добавления
    this.destroy();
  }

}
