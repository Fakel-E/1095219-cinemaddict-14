import ProfileView from './view/profile.js';
import SiteMenuView from './view/site-menu.js';
import SortMenuView from './view/sort-menu.js';
/*import FilmTemplateView from './view/film-container.js';
import FilmCardView  from './view/film-card.js';
import NoFilmView  from './view/film-no.js';
import ButtonMoreView from './view/button-more.js';
import TopRatedView from './view/top-rate.js';
import TopCommentView from './view/top-comment.js';*/
import StatisticView from './view/statistic.js';
//import PopupView from './view/popup.js';
import FilmListPresenter from './presenter/films-list.js';
import {generateFilm} from './mock/film.js';
// import {generateComment} from './mock/comment.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const {BEFOREEND} = RenderPosition;

const FILM_COUNT = 20;
//const FILM_TOP = 2;
//const FILM_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill('').map(generateFilm);
const filters = generateFilter(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
//const siteFooterElement = document.querySelector('.footer');
const siteStatisticElement = document.querySelector('.footer__statistics');

render(siteHeaderElement, new ProfileView(), BEFOREEND);
render(siteMainElement, new SiteMenuView(filters), BEFOREEND);
render(siteMainElement, new SortMenuView(), BEFOREEND);
const filmPresenter = new FilmListPresenter(siteMainElement);
filmPresenter.init(films);
//render(siteMainElement, new FilmTemplateView(), BEFOREEND);

/*const arrTopElement = document.querySelectorAll('.films-list--extra');

arrTopElement.forEach((topElementsContainer) => {
  const topFilmContainer = topElementsContainer.querySelector('.films-list__container');
  for (let k = 0; k < FILM_TOP; k++) {
    renderFilmCard(topFilmContainer, films[k]);
  }
});*/

render(siteStatisticElement, new StatisticView(), BEFOREEND);
