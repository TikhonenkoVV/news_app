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
            if (obj.favorite === true) {
                e.target.innerHTML = `Add to favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-border"></use></svg>`;
                console.log(e.target.textContent);
            }
            if (obj.favorite === false) {
                e.target.innerHTML = `Remove from favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-fill"></use></svg>`;
                console.log(e.target.textContent);
            }
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
        if (fetchNew.favorite === true) {
            fetchNew.favorite = false;
            e.target.innerHTML = `Add to favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-border"></use></svg>`;
            console.log(e.target.textContent);
        }
        fetchNew.favorite = true;
        e.target.innerHTML = `Remove from favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-fill"></use></svg>`;
        console.log(e.target.textContent);
        newArr.push(fetchNew);
        localStorage.setItem('user-gallery', JSON.stringify(newArr));
    });
};
