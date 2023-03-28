import './mobile-menu';
import './searchForm';
import { refs } from './refs';
import { onToglerClick, checkCurrentTheme } from './togler';
import { onTabsClick } from './on-tabs-click';
import { verifyUser, checkAuth } from './autorization';
import { onAuthorizationSubmit, onAuthorizationCancel } from './autorization';
import { load } from './storage';

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);
refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

function  favoriteRender () {
console.log(load('bite-search'));
  renderFavoritesCardsInLibrary(load('bite-search'), false );
}

favoriteRender();
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
   {
        // renderDataFavorite();
    }
  }
// функція що рендерить 


function renderFavoritesCardsInLibrary (results, ifFirstPage) {

    const favoritesList = results.map (
      
        (
            { imgUrl, title, section, abstract, published_date, url, favorite },
            index
        ) => { 
          if( !favorite === true){
            return;
          }
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

            return `<div class="news__item favorite_item">
        <p class="news__section">${section}</p>
        <div class="news__img">
          <img src="${imgUrl}" alt="${title}" loading="lazy"/>
          <button id="${url}" type="button" class="news__btn" >Remove from favorite
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
      

    refs.favoritesContainer.innerHTML = favoritesList;


}

// export function hiddenCard(e) {
//   let elements = e.target.parentNode;
//   elements.classList.add('visually-hidden');
// }

function removeItem() {
  document.querySelector(".favorite_item").classList.add('visually-hidden');
}

const buttonRemove = document.querySelector('.favorites_btn');

buttonRemove.addEventListener('click', removeItem)

checkAuth()

verifyUser();
checkCurrentTheme();