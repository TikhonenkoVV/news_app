import { addRemoveDataFavorite } from './addremove-data-favorite';
import { load } from '../storage';
import { addOverLay } from '../main';
import { updateReedFunc } from '../autorization';
import { openCloseNews } from './open-close-news';
import { auth, firebaseApp } from '../auth';

let db = '';
let currentUser = {};

export const addDataReadNews = e => {
    addRemoveDataFavorite(e);
    openCloseNews(e);
    if (!e.target.classList.contains('info__link')) {
        return;
    }
    const url = e.target.href;
    const todayDate = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}/${date.getFullYear()}`;
    };
    const formattedDate = todayDate();
    addOverLay(e);
    let userGallery = load('user-gallery');
    userGallery = load('user-gallery');

    let newArr = [];

    updateReedFunc(userGallery);

    if (userGallery) {
        const index = userGallery.findIndex(obj => url === obj.url);
        if (index !== -1) {
            userGallery[index].readMore = formattedDate;
            localStorage.setItem('user-gallery', JSON.stringify(userGallery));
            return;
        }
    }

    auth.onAuthStateChanged(user => {
        console.log(`Авторизований user === ${user.email}`);
        currentUser = user.email;
        db = getFirestore(firebaseApp);
        fetchArrayWithDBReedNews();
    });

    const fetchArrayWithDBReedNews = async () => {
        console.log('fetchArrayDBReed');
        const docRef = doc(db, currentUser, 'reedNews');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            let galery = await docSnap.data().reedNews;
            // console.log(galery)
            newArr.push(...galery);
            console.log(newArr);
            const savedLocalNews = localStorage.getItem('bite-search');
            JSON.parse(savedLocalNews).map(fetchNew => {
                if (url === fetchNew.url) {
                    fetchNew.readMore = formattedDate;
                    newArr.push(fetchNew);
                    updateReedFunc(newArr);
                    // localStorage.setItem('user-gallery', JSON.stringify(newArr));
                }
            });
        } else {
            console.log('No such document reedNews!');
        }
    };
    console.log(userGallery);

    // const savedLocalNews = localStorage.getItem('bite-search');
    // JSON.parse(savedLocalNews).map(fetchNew => {
    //     if (url === fetchNew.url) {
    //         fetchNew.readMore = formattedDate;
    //         newArr.push(fetchNew);
    //         updateReedFunc(newArr)
    //         localStorage.setItem('user-gallery', JSON.stringify(newArr));
    //     }
    // });
};
