import './mobile-menu';
import './searchForm';
import { refs } from './refs';
import { onToglerClick, checkCurrentTheme } from './togler';
import { onTabsClick } from './on-tabs-click';
import { verifyUser, checkAuth } from './autorization';
import { onAuthorizationSubmit, onAuthorizationCancel } from './autorization';
import { load } from './storage';

import { updateFavoriteFunc } from '../js/autorization';
import { auth, firebaseApp } from '../js/auth';

import { onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, getDoc} from "firebase/firestore"; 

let db = ''
let currentUser = {}

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);
refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

function favoriteRender() {
    console.log(load('user-gallery'));
    renderFavoritesCardsInLibrary(load('user-gallery'), true);
}

favoriteRender();

function onFavoriteBtnRemoveClick(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const savedLocalNews = localStorage.getItem('user-gallery');
    const results = JSON.parse(savedLocalNews);
    updateFavoriteFunc(results)
    const url = e.target.id;
    results.map(obj => {
      if (obj.url !== url) return;
      obj.favorite = false;
    })
    localStorage.setItem('user-gallery', JSON.stringify(results));
    renderFavoritesCardsInLibrary(results);
}
// функція що рендерить
function renderFavoritesCardsInLibrary(results) {

    // console.log(results)

    auth.onAuthStateChanged(user => {
        console.log(`Авторизований user === ${user.email}`)
        currentUser = user.email
        db = getFirestore(firebaseApp);
        fetchArrayWithDBFavoriteNews()
      })

      const fetchArrayWithDBFavoriteNews = async () => {
        console.log('fetchArrayDBFavorite')
        const docRef = doc(db, currentUser, "favoriteNews");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let galery = await docSnap.data().favoriteNews
            console.log('galery fav', galery)
            console.log('results fav', results)
            const favoritesList = galery
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
            // console.log("favoriteNews:", docSnap.data().favoriteNews);
        } else {
            console.log("No such document favoriteNews!");
        }
      }

}

checkAuth();

verifyUser();
checkCurrentTheme();

refs.favoritesContainer.addEventListener('click', onFavoriteBtnRemoveClick);
