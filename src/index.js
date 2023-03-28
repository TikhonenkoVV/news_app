import './js/searchForm';
import './js/mobile-menu';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { allData } from './js/main';
import { handleScreenSizeChange } from './js/categories';
import { handleSubmit } from './js/searchForm';
import { checkAuth, updateReedFunc } from './js/autorization';
import * as weatherBanner from './js/weather-banner';

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.form.addEventListener('submit', handleSubmit);

checkCurrentTheme();
handleScreenSizeChange();

if (refs.categoriesBtns && refs.categoriesDropdown) {
    refs.categoriesBtns.addEventListener('click', onClickBtns);
    refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);
}
allData();
checkAuth();
