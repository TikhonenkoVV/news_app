export const addDataFavorite = e => {
    if (e.target.nodeName !== "BUTTON") {
        return;
    }
    const savedLocalNews = localStorage.getItem('bite-search');
      const url = e.target.id;
      const results = JSON.parse(savedLocalNews).map(fetchNew => {
        if (url !== fetchNew.url) return fetchNew;
        fetchNew.favorite = true;
    return fetchNew;
});
localStorage.setItem("bite-search", JSON.stringify(results));
};

    const url = e.target.id;
    const savedLocalFavorite = localStorage.getItem('user-gallery');
    const results = JSON.parse(savedLocalFavorite);
        const array = results.map(result => {
           if (results.url !== url) return;
           result.favorite = false;
        });
        localStorage.setItem("user-gallery", JSON.stringify(array)); 
}
