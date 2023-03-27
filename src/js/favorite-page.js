import './mobile-menu';
import './searchForm';
import { refs } from './refs';
import { onToglerClick } from './togler';
import { onTabsClick } from './on-tabs-click';
import { verifyUser, checkAuth } from './autorization';
import { onAuthorizationSubmit, onAuthorizationCancel } from './autorization';

checkAuth();
verifyUser()

refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.mobileToggler.addEventListener('click', onToglerClick);

refs.authorizationCancel.addEventListener('click', onAuthorizationCancel);

refs.authorizationForm.addEventListener('submit', onAuthorizationSubmit);
