import './mobile-menu';
import './searchForm';
import { refs } from './refs';
import { onToglerClick, checkCurrentTheme } from './togler';
import { onTabsClick } from './on-tabs-click';
import { checkAuth } from './autorization';
import { onAuthorizationSubmit, onAuthorizationCancel } from './autorization';

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);
refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);

checkCurrentTheme();
checkAuth();
