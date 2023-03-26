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
import { handleScreenSizeChange } from './js/categories.js';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter.js';
import { verifyUser } from './js/autorization';
import {
    onAuthorizationSubmit,
    onAuthorizationCancel,
} from './js/autorization';
import { allData } from './js/main.js';

refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

handleScreenSizeChange();

refs.categoriesBtns.addEventListener('click', onClickBtns);
refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);


//import * as weatherBanner from './js/weather-banner';

checkCurrentTheme();
refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);

refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

verifyUser();

// window.onresize = function(e) {
//     console.log(e);
// };
