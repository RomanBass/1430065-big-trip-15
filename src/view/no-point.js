import AbstractView from './abstract.js';
//const title = 'mmeessaaggee';
const createNoPointTemplate = (message) => `<p class="trip-events__msg" style="color: #078ff0;">${message}</p>`;

export default class NoPoint extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return createNoPointTemplate(this._message);
  }
}
