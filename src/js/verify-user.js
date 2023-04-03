import { refs } from './refs';
import { load } from './storage';
import { resetStyle } from './sign-in-up';
import { checkCurrentLocation } from './check-current-location';

export const verifyUser = () => {
    isAutorized = load('bite-news-app');
    if (!isAutorized) {
        if (
            checkCurrentLocation() === 'favorite' ||
            checkCurrentLocation() === 'read'
        ) {
            resetStyle();
            refs.backdrop.classList.remove('is-hidden');
            refs.autorizeModal.classList.remove('is-hidden');
        }
    } else refs.profileBtn.classList.remove('hide');
};
