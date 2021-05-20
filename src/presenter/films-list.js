//import SortMenuView from '../view/sort-menu.js';
import MainContentView from '../view/main-content.js';
import FilmTemplateView from '../view/film-container.js';
import FilmListTemplateView from '../view/film-list.js';
import NoFilmView  from '../view/film-no.js';
import ButtonMoreView from '../view/button-more.js';
import FilmCardPresenter from '../presenter/film-card.js';
//import TopRatedView from './view/top-rate.js';
//import TopCommentView from './view/top-comment.js';
//import StatisticView from './view/statistic.js';
import {render, remove} from '../utils/render.js';
import { updateItemById } from '../utils/comon.js';

//const {BEFOREEND} = RenderPosition;
const FILM_PER_STEP = 5;

export default class FilmList {
  constructor(container) {
    this._container = container;
    this._renderedFilmCount = FILM_PER_STEP;
    this._allFilmsView = new FilmTemplateView();
    this._allFilmsListView = new FilmListTemplateView();
    this._noFilmsView = new NoFilmView();
    this._showMoreButtonView = new ButtonMoreView();
    this._MainContentView = new MainContentView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._filmCardPresenter = {};
  }

  init(films) {
    this._films = films.slice();

    this._renderAllFilms();
    render(this._container, this._MainContentView);
    render(this._MainContentView, this._allFilmsView);
  }

  _handleModeChange() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(this._allFilmsListView, this._handleFilmChange, this._handleModeChange);

    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilms() {
    render(this._container, this._noFilmsView);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_PER_STEP);
    this._renderedFilmCount += FILM_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    render(this._allFilmsView, this._showMoreButtonView);

    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderAllFilms() {
    this._renderFilms(0, FILM_PER_STEP);
    render(this._allFilmsView, this._allFilmsListView);

    if (this._films.length > FILM_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _render() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderAllFilms();
  }

  _clear() {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};
    this._renderedFilmCount = FILM_PER_STEP;
    remove(this._showMoreButtonView);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItemById(this._films, updatedFilm);
    this._filmCardPresenter[updatedFilm.id].init(updatedFilm);
  }
}


/*export default class Film {
  constructor(mainElement) {
    this._mainElement = mainElement;
    this._renderedFilmCount = FILM_PER_STEP;

    this._filmsTemplate = new FilmTemplateView();
    this._filmsListTemplate = new FilmListTemplateView();
    this._sortTemplate = new SortMenuView();
    this._noFilms = new NoFilmView();
    this._loadMoreButton = new ButtonMoreView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._renderFilmsTemplate();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._mainElement, this._sortTemplate, BEFOREEND);
  }

  _renderFilmCard(film) {
    debugger;

    const filmPresenter = new FilmCardPresenter(this._filmsListTemplate);
    console.log(filmPresenter);
    filmPresenter.init(film);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilmCard(film));
  }

  _renderNoFilms() {
    render(this._mainElement, this._noFilms, BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_PER_STEP);
    this._renderedFilmCount += FILM_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButton);
    }
  }

  _renderLoadMoreButton() {
    render(this._mainElement, this._loadMoreButton, BEFOREEND);
    this._loadMoreButton.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_PER_STEP));

    if (this._films.length > FILM_PER_STEP) {
      this._renderLoadMoreButton();
    }

    /*render(filmTemplate, new TopRatedView(), BEFOREEND);
    render(filmTemplate, new TopCommentView(), BEFOREEND);
  }

  _renderFilmsTemplate() {

    this._renderSort();
    render(this._mainElement, this._filmsTemplate, BEFOREEND);

    if (this._films.length === 0) {
      this._renderNoFilms();
    } else {
      this._renderFilmList();
    }
  }
}*/
