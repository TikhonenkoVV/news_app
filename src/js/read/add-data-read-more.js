import { addRemoveDataFavorite } from './addremove-data-favorite';
import { load, save } from '../storage';

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
    let userGallery = load('user-gallery');
    userGallery = load('user-gallery');

    let newArr = [];
    if (userGallery) newArr.push(...userGallery);
    const savedLocalReads = localStorage.getItem('user-gallery')
    const results = JSON.parse(savedLocalReads);
    if (results) {
        // const filterResults = results.filter(result => result.readMore !== '');
        const index = results.findIndex(result => url === result.url);
        if (index !== -1) {
        results[index].readMore = formattedDate;
        localStorage.setItem('user-gallery', JSON.stringify(results));
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
