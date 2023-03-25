import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './js/fetch';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import * as weatherBanner from './js/weather-banner';
import { verifyUser } from './js/autorization';
import { onAuthorizationSubmit } from './js/autorization';

console.log(fetchCategoryArticles());

refs.togler.addEventListener('click', onToglerClick);

refs.tabs.addEventListener('click', onTabsClick);

refs.authorizationSubmit.addEventListener('submit', onAuthorizationSubmit);

verifyUser();
