import './js/mobile-menu';
import './js/searchForm';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { handleScreenSizeChange } from './js/categories';

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);

handleScreenSizeChange();

refs.categoriesBtns.addEventListener('click', onClickBtns);
refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);

import * as weatherBanner from './js/weather-banner';

import { allData } from './js/main';

allData();
