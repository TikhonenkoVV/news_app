import './mobile-menu';
import './searchForm';
import { refs } from './refs';
import { onToglerClick } from './togler';
import { onTabsClick } from './on-tabs-click';
import { verifyUser } from './autorization';
import { onAuthorizationSubmit, onAuthorizationCancel } from './autorization';

verifyUser();

refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.mobileToggler.addEventListener('click', onToglerClick);

refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);

refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

export function renderDataFavorite () {

    if (fetchNew.favorite === true){
  renderFavoritesCardsInLibrary(results, refs.favoritesContainer)
}
};

// функція яка видаляє якщо фолс

function onFavoriteBtnRemoveClick() {
    const savedLocalNews = localStorage.getItem('bite-search');
      const url = e.target.id;
      const results = JSON.parse(savedLocalNews);
    for (const object of results) {
      if (object.id === Number(id)) {
        results.splice(results.indexOf(object), 1);
        break;
      }
    }
    localStorage.setItem('results', JSON.stringify(results));
    if (
      
      refs.favoritesListBtn.checked
    ) {
        renderDataFavorite();
    }
  }
// функція що рендерить 



function renderFavoritesCardsInLibrary (results, container) {
    const favoritesList = results.map (
        (
            { imgUrl, title, section, abstract, published_date, url },
            index
        ) => {
            if (ifFirstPage) {
                if (window.matchMedia('(min-width: 1280px)').matches) {
                    if (index > 7) {
                        return;
                    }
                } else if (
                    window.matchMedia('(min-width: 768px)').matches
                ) {
                    if (index > 6) {
                        return;
                    }
                } else {
                    if (index > 3) {
                        return;
                    }
                }
            }

            return `<div class="news__item">
        <p class="news__section">${section}</p>
        <div class="news__img">
          <img src="${imgUrl}" alt="${title}" loading="lazy"/>
          <button id="${url}" type="button" class="news__btn" id = "removeFavorites" >Remove from favorite
          <svg class="news__btn-icon" width="20" height="20">
            <use href="#icon-heart-border"></use>
            </svg></button></div>
        <div class="info">
          <p class="info__title">${title}</p>
          <p class="info__abstract">${abstract}</p>
          <p class="info__published-date">${published_date}</p>
          <a href="${url}" target="_blank"
            rel="noopener noreferrer nofollow"
             class="info__link">Read more</a>
        </div></div>`;
        }
    )
    .join('');

    container.innerHTML = favoritesList;
}