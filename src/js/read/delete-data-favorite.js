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