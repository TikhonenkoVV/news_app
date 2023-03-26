import { refs } from './refs';

export const onTabsClick = e => {
    const currentTab = document.querySelector('.authorization__btn.current');
    currentTab.classList.remove('current');
    e.target.classList.add('current');
    if (e.target.classList.contains('authorization__btn--reg')) {
        refs.authorizationSubmit.textContent = 'Register';
        refs.confirmPass.classList.remove('visually-hidden');
    } else {
        refs.authorizationSubmit.textContent = 'Log in';
        refs.confirmPass.classList.add('visually-hidden');
    }
};
