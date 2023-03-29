import { renderGalleryReadOnDays } from './render-markup-read';
import { sortReadNewsData } from './sort-news-data';
import { addDataReadNews } from './add-data-read-more';
import { refs } from '../refs';
import { fetchArrayWithDBReedNews } from '../autorization';

renderGalleryReadOnDays();
checkAuth();

refs.boxItems.addEventListener('click', addDataReadNews);
const array = sortReadNewsData();
renderGalleryReadOnDays(array);
