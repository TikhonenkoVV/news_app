import { refs } from './refs';
import { load, save } from './storage';

const USER_KEY = 'bite-user-autorize';

export const verifyUser = () => {
    !load(USER_KEY)
        ? refs.authorizationModal.classList.remove('is-hidden')
        : refs.authorizationModal.classList.add('is-hidden');
};

export const onAuthorizationSubmit = e => {
    e.preventDefault();
    save(USER_KEY, 'autorize');
};
