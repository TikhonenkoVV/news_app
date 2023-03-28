import { refs } from "../refs";
import { auth, firebaseApp } from '../auth';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, getDoc} from "firebase/firestore"; 

let db = ''
let currentUser = {}
let galery = []

export const renderGalleryReadOnDays = () => {
    const checkAuth = async () => {
        auth.onAuthStateChanged(user => {
            console.log('AuthUser ===', user)
            console.log(`Авторизований user === ${user.email}`)
            currentUser = user.email
            db = getFirestore(firebaseApp);
            fetchArrayWithDBReedNews()
          })
    }
    
    const fetchArrayWithDBReedNews = async () => {
        console.log('fetchArrayDBReed')
        const docRef = doc(db, currentUser, "reedNews");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            galery[0] = await docSnap.data().reedNews
            // console.log(docSnap.data().reedNews);
            // return docSnap.data().reedNews
            galery[0] = await docSnap.data().reedNews
            // console.log(sortReadNewsData[0][0].readMore)
            // console.log(galery[0][0].readMore)
            let markup = '';
            const gallaryMarkup = galery.map(arr => {
                const date = arr[0].readMore;
                const markupDtae = `
            <div class="news__item-date">
                <button class="data-read" type="button">
                    <p class="data-read__text">${date}</p>
                    <svg class="data-read__icon" width="9" height="14">
                        <use xlink:href="./images/sprite.svg#icon-arrow-up"></use>
                    </svg>
                </button>
            </div>`
            const markupNews = arr.map(({imgUrl, title, section, abstract, published_date, url}) => {return `
            <div class="news__item-read hover">
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

    checkAuth()
};