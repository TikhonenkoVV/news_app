import { renderGalleryReadOnDays } from './render-markup-read';
import { sortReadNewsData } from './sort-news-data';
import { addDataReadNews } from './add-data-read-more';
import { refs } from '../refs';
import { verifyUser, fetchArrayWithDBReedNews } from '../autorization';

verifyUser();

renderGalleryReadOnDays();

refs.boxItems.addEventListener('click', addDataReadNews);
const array = sortReadNewsData();
renderGalleryReadOnDays(array);
