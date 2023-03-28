import { addRemoveDataFavorite } from './addremove-data-favorite';
import { load, save } from '../storage';
import { addOverLay } from '../main';

export const addDataReadNews = e => {
    addRemoveDataFavorite(e);
    if (!e.target.classList.contains('info__link')) {
        return;
    }
    addOverLay(e);
    let userGallery = load('user-gallery');
    userGallery = load('user-gallery');

    let newArr = [];
    if (userGallery) newArr.push(...userGallery);
    const savedLocalNews = localStorage.getItem('bite-search');
    const results = JSON.parse(savedLocalNews).map(fetchNew => {
        const url = e.target.href;
        if (url === fetchNew.url) {
            const date = new Date();
            const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            fetchNew.readMore = formattedDate;
            newArr.push(fetchNew);
            console.log();
            localStorage.setItem('user-gallery', JSON.stringify(newArr));
        }
    });
};
