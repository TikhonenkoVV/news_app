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
import { verifyUser } from './js/autorization';
import {
    onAuthorizationSubmit,
    onAuthorizationCancel,
} from './js/autorization';

refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);

refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

verifyUser();
