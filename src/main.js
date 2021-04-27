import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import SortMenuView from './view/sort-menu.js';
import FilmTemplateView from './view/film-container.js';
import FilmCardView  from './view/film-card.js';
import ButtonMoreView from './view/button-more.js';
import TopRatedView from './view/top-rate.js';
import TopCommentView from './view/top-comment.js';
import StatisticView from './view/statistic.js';
import PopupView from './view/popup.js';
import {generateFilm} from './mock/film.js';
// import {generateComment} from './mock/comment.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const FILM_COUNT = 20;
const FILM_TOP = 2;
const FILM_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
//const siteFooterElement = document.querySelector('.footer');
const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmTemplateView().getElement(), RenderPosition.BEFOREEND);

const filmTemplate = document.querySelector('.films');
const siteFilmContainer = filmTemplate.querySelector('.films-list');
const filmCardContainer = siteFilmContainer.querySelector('.films-list__container');

const renderFilmCard = (container, films) => {
  const filmCardComponent = new FilmCardView(films).getElement();
  const popupView = new PopupView(films);

  const filmCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(popupView.getElement());

    const buttonClose = document.querySelector('.film-details__close-btn');

    buttonClose.addEventListener('click', () => {
      document.body.removeChild(popupView.getElement());
      popupView.removeElement();
      document.body.classList.remove('hide-overflow');
    });
  };

  filmCardComponent.querySelector('.film-card__poster').addEventListener('click', filmCardClickHandler);
  filmCardComponent.querySelector('.film-card__title').addEventListener('click', filmCardClickHandler);
  filmCardComponent.querySelector('.film-card__comments').addEventListener('click', filmCardClickHandler);

  render(container, filmCardComponent, RenderPosition.BEFOREEND);
};

films.slice(0, FILM_PER_STEP).forEach((film) => renderFilmCard(filmCardContainer, film));

if (films.length > FILM_PER_STEP) {
  let renderedTaskCount = FILM_PER_STEP;

  const loadMoreButtonComponent = new ButtonMoreView();
  render(siteFilmContainer, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedTaskCount, renderedTaskCount + FILM_PER_STEP)
      .forEach((film) => renderFilmCard(filmCardContainer, film));

    renderedTaskCount += FILM_PER_STEP;

    if (renderedTaskCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

render(filmTemplate, new TopRatedView().getElement(), RenderPosition.BEFOREEND);
render(filmTemplate, new TopCommentView().getElement(), RenderPosition.BEFOREEND);
const arrTopElement = document.querySelectorAll('.films-list--extra');

arrTopElement.forEach((topElementsContainer) => {
  for (let k = 0; k < FILM_TOP; k++) {
    render(topElementsContainer.querySelector('.films-list__container'), new FilmCardView(films[k]).getElement(), RenderPosition.BEFOREEND);
  }
});

render(siteStatisticElement, new StatisticView().getElement(), RenderPosition.BEFOREEND);
