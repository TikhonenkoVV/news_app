import { renderGalleryReadOnDays } from './render-markup-read';
import { sortReadNewsData } from './sort-news-data';
import { addDataReadNews } from './add-data-read-more';
import { refs } from '../refs';
import {
    checkAuth,
    onAuthorizationSubmit,
    onAuthorizationCancel,
    fetchArrayWithDBReedNews,
} from '../autorization';
import '../mobile-menu';
import '../searchForm';
import { onToglerClick, checkCurrentTheme } from '../togler';
import { onTabsClick } from '../on-tabs-click';

checkCurrentTheme();

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);
refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

renderGalleryReadOnDays();
checkAuth();

refs.boxItems.addEventListener('click', addDataReadNews);
const array = sortReadNewsData();
renderGalleryReadOnDays(array);
