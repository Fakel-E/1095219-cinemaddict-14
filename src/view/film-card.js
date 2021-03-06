import {humanizeDate} from '../utils/date';
import AbstractView from './abstract.js';

const createFilmCard = (film) => {
  const {name, poster, description, rate, date, runtime, genre, isWatchlist, isWatched, isFavorite} = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rate}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeDate(date)}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">5 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist
        ${isWatchlist ? 'film-card__controls-item--active' : ''}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched
        ${isWatched ? 'film-card__controls-item--active' : ''}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite
        ${isFavorite ? 'film-card__controls-item--active' : ''}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmCard(this._films);
  }
}
