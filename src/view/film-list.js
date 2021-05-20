import AbstractView from './abstract.js';

const createFilmListTemplate = () => {
  return (
    `<div class="films-list__container">
        </div>`
  );
};
export default class FilmTemplate extends AbstractView {

  getTemplate() {
    return createFilmListTemplate();
  }
}
