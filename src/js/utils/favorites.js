
// const savedFetchNews = localStorage.getItem('fetchPopularArticles');
// const parsedFetchNews = JSON.parse(savedFetchNews);

import { refs } from './refs';

// export const addDataReadNewsFavorite = e => {
//     console.log(e);
//     if (e.target.nodeName !== "BUTTON") {
//         return;
//       }
//     const results = parsedFetchNews.map(fetchNew => {
//         const url = e.currentTarget.parentNode.id;
//         console.log(url);
//         if (url === fetchNew.url) {
//             // fetchNew.readMore = formattedDate;
//             console.log(fetchNew);
//             return fetchNew;
//         }
//     return fetchNew;
//     });
//     localStorage.setItem("fetchPopularArticles", JSON.stringify(results));
//     // sortReadNewsData()
// };

const favoritesBtnRemove = document.getElementById('favoritesRemove');


let favorites = [];

const favoritesList = JSON.parse(localStorage.getItem('favorites'));

if (favoritesList) {
    favorites = favoritesList;
  }

refs.favoritesListBtn.addEventListener('click', renderFavoritesList);

export function renderFavoritesList() {
    const parsedFavorites = JSON.parse(localStorage.getItem('favorites'));
  
    if (!parsedFavorites || parsedFavorites.length === 0) {
    //   refs.noFavoritesAlert.classList.remove('alert-block--hidden');
    //   refs.newsContainer.classList.add('news-favorites--hidden');
      return;
    }
  
    // refs.noFavoritesAlert.classList.add('alert-block--hidden');
    // refs.newsContainer.classList.remove('news-favorites--hidden');
    renderNewsCardsInLibrary(parsedFavorites, newsContainer);
  }


  export function renderNewsCardsInLibrary(parsedFavorites, container) {

//     const savedFetchNews = localStorage.getItem('fetchPopularArticles');
// const parsedFetchNews = JSON.parse(savedFetchNews);

  const favoritesList = parsedFavorites
  .map(
    (
        { imgUrl, title, section, abstract, published_date, url },
        index
    ) => {
        if (window.matchMedia('(min-width: 1280px)').matches) {
            if (index > 7) {
                return;
            }
        } else if (window.matchMedia('(min-width: 768px)').matches) {
            if (index > 6) {
                return;
            }
        } else {
            if (index > 3) {
                return;
            }
        }

        return `<div id="${url}" class="news__item">
        <p class="news__section">${section}</p>
        <div class="news__img">
          <img src="${imgUrl}" alt="${title}" loading="lazy"/>
          <button type="button" class="news__btn" id = 'favoritesRemove' >Remove from favorite
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

container.insertAdjacentHTML('beforeend', favoritesList);


    
    }

    function onFavoritesBtnRemoveClick() {
         for (const object of favorites ) {
          if (object.id === Number(id)) {
            favorites.splice(favorites.indexOf(object), 1);
            break;
          }
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (
        
          refs.favoritesListBtn.checked
        ) {
          renderFavoritesList();
        }
      }

      favoritesBtnRemove.addEventListener('click', onFavoritesBtnRemoveClick);

    //   function onFavoritesBtnAddClick() {
       
    //     favorites.push(newsObject);
    //     localStorage.setItem('fvorites', JSON.stringify(favorites));
    //     if (
         
    //       refs.queueListBtnInput.checked
    //     ) {
    //       renderQueueList();
    //     }
    //   }