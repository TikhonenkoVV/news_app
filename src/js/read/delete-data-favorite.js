export const addDataFavorite = e => {
    if (e.target.nodeName !== "BUTTON") {
        return;
    }
    const url = e.target.id;
    const savedLocalFavorite = localStorage.getItem('user-gallery');
    const results = JSON.parse(savedLocalFavorite);
        const array = results.map(result => {
           if (results.url !== url) return;
           result.favorite = false;
        });
        localStorage.setItem("user-gallery", JSON.stringify(array)); 
}
