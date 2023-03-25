import './js/mobile-menu.js';
import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './js/fetch';
// console.log(fetchPopularArticles());
// console.log(fetchSearchArticles(2, 'china'));
// console.log(fetchCategoryArticles(5, 'arts'));
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
refs.togler.addEventListener('click', onToglerClick);
refs.mobileToggler.addEventListener('click', onToglerClick);
