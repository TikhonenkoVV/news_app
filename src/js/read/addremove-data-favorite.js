import { load, save } from '../storage';

export const addRemoveDataFavorite = e => {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const url = e.target.id;
    let userGallery = load('user-gallery');
    userGallery = load('user-gallery');

    let newArr = [];
    if (userGallery) newArr.push(...userGallery);

    if (userGallery) {
        const array = userGallery.map(obj => {
            if (obj.url !== url) return obj;
            obj.favorite = !obj.favorite;
            return obj;
        });
        localStorage.setItem('user-gallery', JSON.stringify(array));
        const index = userGallery.findIndex(obj => url === obj.url);
        if (index !== -1) return;
    }

    const savedLocalNews = localStorage.getItem('bite-search');
    JSON.parse(savedLocalNews).map(fetchNew => {
        if (url !== fetchNew.url) return;
        console.log(url);
        console.log(fetchNew.url);
        const url = e.target.id;
        const results = JSON.parse(savedLocalNews).map(fetchNew => {
            if (url !== fetchNew.url) return fetchNew;
            if (fetchNew.favorite === true) {
                fetchNew.favorite = false;
            }
            fetchNew.favorite = true;
            newArr.push(fetchNew);
            localStorage.setItem('user-gallery', JSON.stringify(newArr));
        });
        // };
        e.target.innerHTML = `Remove from favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-fill"></use></svg>`;
        console.log(e.target.textContent);
        return fetchNew;
    });
    localStorage.setItem('bite-search', JSON.stringify(results));
};
