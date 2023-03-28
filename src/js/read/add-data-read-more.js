import { addRemoveDataFavorite } from './addremove-data-favorite';
import { load, save } from '../storage';
import { addOverLay } from '../main';
import { updateReedFunc } from '../autorization';

export const addDataReadNews = e => {
    addRemoveDataFavorite(e);
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
    if (userGallery) newArr.push(...userGallery);


    if (userGallery) {
        const index = userGallery.findIndex(obj => url === obj.url);
        if (index !== -1) {
        userGallery[index].readMore = formattedDate;
        localStorage.setItem('user-gallery', JSON.stringify(userGallery));
         return;
        }
    };
    // updateReedFunc(newArr)

    const savedLocalNews = localStorage.getItem('bite-search');
    JSON.parse(savedLocalNews).map(fetchNew => {
        if (url === fetchNew.url) {
            fetchNew.readMore = formattedDate;
            newArr.push(fetchNew);
            localStorage.setItem('user-gallery', JSON.stringify(newArr));
        }
    });
};
