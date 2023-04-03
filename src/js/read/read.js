import { renderGalleryReadOnDays } from './render-markup-read';
import { sortReadNewsData } from './sort-news-data';
import { addDataReadNews } from './add-data-read-more';
import { refs } from '../refs';
import {
    checkAuth,
    onAuthorizationSubmit,
    onAuthorizationCancel,
    fetchArrayWithDBReedNews,
} from '../autorization';
import '../mobile-menu';
import '../searchForm';
import { onToglerClick, checkCurrentTheme } from '../togler';

checkCurrentTheme();

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);

renderGalleryReadOnDays();

refs.boxItems.addEventListener('click', addDataReadNews);
const array = sortReadNewsData();
renderGalleryReadOnDays(array);
