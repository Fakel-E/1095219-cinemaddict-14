import {createElement} from '../utils';

const createButtonShowTemplate = () => {
  return (
    '<button class="films-list__show-more">Show more</button>'
  );
};

export default class ButtonMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonShowTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
