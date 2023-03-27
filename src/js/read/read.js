import { renderGalleryReadOnDays } from "./render-markup-read";
import { sortReadNewsData } from "./sort-news-data";
import { openCloseNews } from "./open-close-news";
import { refs } from "../refs";

const array = sortReadNewsData();
console.log(array);
renderGalleryReadOnDays(array);

refs.boxItems.addEventListener('click', openCloseNews);