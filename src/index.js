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
import { onToglerClick, checkCurrentTheme } from './js/togler';
checkCurrentTheme();
refs.togler.addEventListener('click', onToglerClick);
refs.mobileToggler.addEventListener('click', onToglerClick);
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';

import * as weatherBanner from './js/weather-banner';
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

import { handleScreenSizeChange } from './js/categories.js';
handleScreenSizeChange();

import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter.js';
refs.categoriesBtns.addEventListener('click', onClickBtns);
refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);
