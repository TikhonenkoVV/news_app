import './mobile-menu';
import './searchForm';
import { refs } from './refs';
import { onToglerClick } from './togler';
import { onTabsClick } from './on-tabs-click';

refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.mobileToggler.addEventListener('click', onToglerClick);
