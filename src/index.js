import './js/mobile-menu.js';
import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './js/fetch';
import './js/searchForm';
// console.log(fetchPopularArticles());
// console.log(fetchSearchArticles(2, 'china'));
// console.log(fetchCategoryArticles(5, 'arts'));
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import * as weatherBanner from './js/weather-banner';

checkCurrentTheme();
refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
console.log();
