import { refs } from './refs';
import { load } from './storage';

export function favoriteRender() {
    if (!load('user-gallery')) return;
    renderFavoritesCardsInLibrary(load('user-gallery'), true);
}

export function onFavoriteBtnRemoveClick(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const savedLocalNews = localStorage.getItem('user-gallery');
    const results = JSON.parse(savedLocalNews);
    const url = e.target.id;
    results.map(obj => {
        if (obj.url !== url) return;
        obj.favorite = false;
    });
    localStorage.setItem('user-gallery', JSON.stringify(results));
    renderFavoritesCardsInLibrary(results);
}
// функція що рендерить
function renderFavoritesCardsInLibrary(results) {
    const favoritesList = results
        .map(
            (
                {
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                    favorite,
                },
                index
            ) => {
                if (!favorite === true) {
                    return;
                }
                if (window.matchMedia('(min-width: 1280px)').matches) {
                    if (index > 8) {
                        return;
                    }
                } else if (window.matchMedia('(min-width: 768px)').matches) {
                    if (index > 7) {
                        return;
                    }
                } else {
                    if (index > 4) {
                        return;
                    }
                }
                return `<div class="news__item-favorite">
        <p class="news__section">${section}</p>
        <div class="news__img">
          <img src="${imgUrl}" alt="${title}" loading="lazy"/>
          <button id="${url}" type="button" class="news__btn favorites_btn" onClick = "removeItem()" >Remove from favorite
          <svg class="news__btn-icon" width="20" height="20">
            <use href="#icon-heart-fill"></use>
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

    refs.favoritesContainer.innerHTML = favoritesList;
}
