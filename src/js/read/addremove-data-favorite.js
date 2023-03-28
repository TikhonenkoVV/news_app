import { load, save } from '../storage';

export const addRemoveDataFavorite = e => {
    if (e.target.nodeName !== "BUTTON") {
        return;
    }
    const url = e.target.id;
    let userGallery = load('user-gallery');
    userGallery = load('user-gallery');

    let newArr = [];
    if (userGallery) newArr.push(...userGallery);
    const savedLocalFavorite = localStorage.getItem('user-gallery')
    const results = JSON.parse(savedLocalFavorite);

    if (results) {
        const array = results.map(result => {
           if (result.url !== url) return result;
           result.favorite = !result.favorite;
           return result;
        });
        localStorage.setItem("user-gallery", JSON.stringify(array)); 
        const index = results.findIndex(result => url === result.url);
        if (index !== -1) return;
    };

    const savedLocalNews = localStorage.getItem('bite-search');
    JSON.parse(savedLocalNews).map(fetchNew => {
        if (url !== fetchNew.url) return;
        console.log(url);
        console.log(fetchNew.url);
        if (fetchNew.favorite === true) {
            fetchNew.favorite = false;
        }
        fetchNew.favorite = true;
        newArr.push(fetchNew);
        localStorage.setItem("user-gallery", JSON.stringify(newArr));
});
};