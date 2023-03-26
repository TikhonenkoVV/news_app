import './js/mobile-menu.js';
import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './js/fetch';
import './js/searchForm';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import * as weatherBanner from './js/weather-banner';
import { verifyUser } from './js/autorization';
import {
    onAuthorizationSubmit,
    onAuthorizationCancel,
} from './js/autorization';

checkCurrentTheme();
refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);

refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

verifyUser();
