import { renderGalleryReadOnDays } from "./render-markup-read";
import { sortReadNewsData } from "./sort-news-data";
import { openCloseNews } from "./open-close-news";
import { refs } from "../refs";
import { fetchArrayWithDBReedNews } from '../autorization';


// const array = sortReadNewsData();

renderGalleryReadOnDays();

refs.boxItems.addEventListener('click', openCloseNews);
const array = sortReadNewsData();
renderGalleryReadOnDays(array);

// тут замість array потрібно підставити результат функції fetchArrayWithDBReedNews()

refs.boxItems.addEventListener('click', openCloseNews);
