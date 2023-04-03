import './js/searchForm';
import './js/mobile-menu';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { allData } from './js/main';
import { handleScreenSizeChange } from './js/categories';
import { handleSubmit } from './js/searchForm';
import { onBannerLoad, displayBanner } from './js/weather-banner';
import { checkCurrentLocation } from './js/check-current-location';
import { verifyUser } from './js/verify-user';
import {
    onSignInUpNavClick,
    onSignInSubmit,
    onSignUpSubmit,
    onSignInBtnCloseClick,
} from './js/sign-in-up';
import { favoriteRender, onFavoriteBtnRemoveClick } from './js/favorite-page';
import { addDataReadNews } from './js/read/add-data-read-more';

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.form.addEventListener('submit', handleSubmit);

checkCurrentTheme();
handleScreenSizeChange();

if (refs.categoriesBtns && refs.categoriesDropdown) {
    refs.categoriesBtns.addEventListener('click', onClickBtns);
    refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);
}

if (checkCurrentLocation() === 'index') {
    allData();
    setTimeout(() => {
        onBannerLoad();
        displayBanner();
    }, 300);
    refs.newsContainer.addEventListener('click', addDataReadNews);
}

if (
    checkCurrentLocation() === 'favorite' ||
    checkCurrentLocation() === 'read'
) {
    Array.from(refs.passAccessBtns, passAccessBtn => {
        passAccessBtn.addEventListener('click', el => {
            // console.log(el.target);
            if (el.currentTarget.nodeName !== 'BUTTON') return;
            let ico = el.target.querySelectorAll('.autorize__use');
            let input = el.currentTarget.nextElementSibling;
            input.getAttribute('type') === 'password'
                ? input.setAttribute('type', 'text')
                : input.setAttribute('type', 'password');
            ico.forEach(el => {
                el.classList.toggle('show');
            });
        });
    });
    refs.autorizeNav.addEventListener('click', onSignInUpNavClick);
    refs.formSignIn.addEventListener('submit', onSignInSubmit);
    refs.formSignUp.addEventListener('submit', onSignUpSubmit);
    refs.signinBtnClose.addEventListener('click', onSignInBtnCloseClick);
    if (checkCurrentLocation() === 'favorite') {
        favoriteRender();
        refs.favoritesContainer.addEventListener(
            'click',
            onFavoriteBtnRemoveClick
        );
    }
}

verifyUser();
