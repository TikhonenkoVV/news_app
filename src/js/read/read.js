import { renderGalleryReadOnDays } from "./render-markup-read";
import { sortReadNewsData } from "./sort-news-data";
import { openCloseNews } from "./open-close-news";
import { refs } from "../refs";
import { fetchArrayWithDBReedNews } from '../autorization';


const array = sortReadNewsData();

// тут замість array потрібно підставити результат функції fetchArrayWithDBReedNews()

renderGalleryReadOnDays(array);

refs.boxItems.addEventListener('click', openCloseNews);