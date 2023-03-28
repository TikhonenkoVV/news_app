import { refs } from "../refs";
import { auth, firebaseApp } from '../auth';

import { onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, getDoc} from "firebase/firestore"; 

let db = ''
let currentUser = {}

export const renderGalleryReadOnDays = () => {
    auth.onAuthStateChanged(user => {
        console.log(`Авторизований user === ${user.email}`)
        currentUser = user.email
        db = getFirestore(firebaseApp);
        fetchArrayWithDBReedNews()
      })
    const fetchArrayWithDBReedNews = async () => {
      console.log('fetchArrayDBReed')
      const docRef = doc(db, currentUser, "reedNews");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          let galery = await docSnap.data().reedNews
          let arr = galery.reduce((acc, obj) => { //====
            const key = obj.key;
            const collection = acc.get(key);
            if (!collection) {
              acc.set(key, [obj]);
            } else {
              collection.push(obj);
            }
            return acc;
          }, new Map());
           const result = Array.from(arr.values());
          let markup = '';
    const gallaryMarkup = result.map(arr => {
        const date = arr[0].readMore;
        const markupDtae = `
    <div class="news__item-date">
        <button class="data-read" type="button">
            <p class="data-read__text">${date}</p>
            <svg class="data-read__icon" width="9" height="15">
                <use xlink:href="#icon-arrow-up"></use>
            </svg>
        </button>
    </div>`
    const markupNews = arr.map(({imgUrl, title, section, abstract, published_date, url}) => {return `
    <div class="news__item-read">
        <p class="news__section">${section}</p>
        <div class="news__img">
            <img src="${imgUrl}" alt="${title}" loading="lazy"/>
            <button  id="${url}" type="button" class="news__btn">Add to favorite
                <svg class="news__btn-icon" width="20" height="20">
                    <use href="#icon-heart-border"></use>
                </svg>
            </button>
        </div>
        <div class="info">
            <p class="info__title">${title}</p>
            <p class="info__abstract">${abstract}</p>
            <p class="info__published-date">${published_date}</p>
            <a href="${url}" target="_blank" rel="noopener noreferrer nofollow"
                class="info__link">Read more</a>
        </div>
    </div>`
    }).join('');
    markup = markupDtae + markupNews;
    refs.boxItems.insertAdjacentHTML('beforeend', markup);
    });
      } else {
          console.log("No such document reedNews!");
      }
    }
};
