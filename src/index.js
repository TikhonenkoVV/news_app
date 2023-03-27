import './js/searchForm';
import './js/mobile-menu';
import { refs } from './js/refs';
import { checkAuth } from './js/autorization';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { allData } from './js/main';
import { handleScreenSizeChange } from './js/categories';
import * as weatherBanner from './js/weather-banner';

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

checkCurrentTheme();
handleScreenSizeChange();

if (refs.categoriesBtns && refs.categoriesDropdown) {
    refs.categoriesBtns.addEventListener('click', onClickBtns);
    refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);
}
allData();