import './js/mobile-menu';
import { handleScreenSizeChange } from './js/categories';
import './js/searchForm';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { verifyUser } from './js/autorization';
import {
    onAuthorizationSubmit,
    onAuthorizationCancel,
} from './js/autorization';

handleScreenSizeChange();

refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

refs.categoriesBtns.addEventListener('click', onClickBtns);
refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);

import * as weatherBanner from './js/weather-banner';

checkCurrentTheme();
refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);

refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

verifyUser();
