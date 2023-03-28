import { addRemoveDataFavorite } from './addremove-data-favorite';
import { load, save } from '../storage';
import { addOverLay } from '../main';

export const addDataReadNews = e => {
    addRemoveDataFavorite(e);
    if (!e.target.classList.contains('info__link')) {
        return;
    }
    const url = e.target.href;
    const todayDate = () => {
        const date = new Date();
        return `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()}`;
    };
    const formattedDate = todayDate();
    console.log(formattedDate);
    addOverLay(e);
    let userGallery = load('user-gallery');
    userGallery = load('user-gallery');

    let newArr = [];
    if (userGallery) newArr.push(...userGallery);

    if (userGallery) {
        // const filteruserGallery = userGallery.filter(obj => obj.readMore !== '');
        const index = userGallery.findIndex(obj => url === obj.url);
        if (index !== -1) {
        userGallery[index].readMore = formattedDate;
        localStorage.setItem('user-gallery', JSON.stringify(userGallery));
         return;
        }
    };

    const savedLocalNews = localStorage.getItem('bite-search');
    JSON.parse(savedLocalNews).map(fetchNew => {
        if (url === fetchNew.url) {
            fetchNew.readMore = formattedDate;
            newArr.push(fetchNew);
            localStorage.setItem('user-gallery', JSON.stringify(newArr));
        }
    });
};
