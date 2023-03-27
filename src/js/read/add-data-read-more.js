import { addRemoveDataFavorite } from "./addremove-data-favorite";

export const addDataReadNews = e => {
    addRemoveDataFavorite(e);
    if (!e.target.classList.contains('info__link')) {
        return;
      }
    const savedLocalNews = localStorage.getItem('bite-search');
    const results = JSON.parse(savedLocalNews).map(fetchNew => {
        const url = e.target.href;
        if (url === fetchNew.url) {
            const date = new Date();
            const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            fetchNew.readMore = formattedDate;
            console.log(fetchNew);
            return fetchNew;
        }
    return fetchNew;
    });
    localStorage.setItem("bite-search", JSON.stringify(results));
};
