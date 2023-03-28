export const addRemoveDataFavorite = e => {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const savedLocalNews = localStorage.getItem('bite-search');
    const url = e.target.id;
    const results = JSON.parse(savedLocalNews).map(fetchNew => {
        if (url !== fetchNew.url) return fetchNew;
        if (fetchNew.favorite === true) {
            fetchNew.favorite = false;
            return fetchNew;
        }
        fetchNew.favorite = true;
        e.target.innerHTML = `Remove from favorite<svg class="news__btn-icon" width="20" height="20"><use href="#icon-heart-fill"></use></svg>`;
        console.log(e.target.textContent);
        return fetchNew;
    });
    localStorage.setItem('bite-search', JSON.stringify(results));
};
