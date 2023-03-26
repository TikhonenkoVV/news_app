import { refs } from './refs';
import { load, save } from './storage';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { allData } from './main';

const USER_KEY = 'bite-user-autorize';
const AUTORIZED_USER_KEY = 'autorized';
export let userLogin;

export const verifyUser = () => {
    const parceData = load(USER_KEY);
    if (!parceData) {
        refs.authorizationModal.classList.remove('is-hidden');
        disableBodyScroll(document.body);
    } else {
        refs.authorizationModal.classList.add('is-hidden');
        allData();
    }
    if (!load(AUTORIZED_USER_KEY)) {
        save(AUTORIZED_USER_KEY, { test: { pass: '' } });
    }
};

export const onAuthorizationCancel = () => {
    refs.authorizationModal.classList.add('is-hidden');
    enableBodyScroll(document.body);
};

export const onAuthorizationSubmit = e => {
    e.preventDefault();
    const currentTab = document.querySelector('.authorization__btn.current');
    const {
        elements: { email, password, confirm },
    } = e.currentTarget;
    const parceData = load(AUTORIZED_USER_KEY);
    if (currentTab.classList.contains('authorization__btn--reg')) {
        if (parceData.hasOwnProperty(email.value)) {
            alert('User already exists');
            return;
        }

        if (
            password.value === '' ||
            confirm.value === '' ||
            email.value === ''
        ) {
            alert('Fill in all fields');
            return;
        }

        if (password.value !== confirm.value) {
            alert('Passwords do not match');
            return;
        }

        refs.authorizationModal.classList.add('is-hidden');
        enableBodyScroll(document.body);
        let autorizedUser = load(AUTORIZED_USER_KEY);
        autorizedUser[email.value] = { pass: password.value };
        save(AUTORIZED_USER_KEY, autorizedUser);
        save(USER_KEY, email.value);
        allData();
    } else {
        if (
            parceData.hasOwnProperty(email.value) &&
            parceData[email.value].pass === password.value
        ) {
            refs.authorizationModal.classList.add('is-hidden');
            enableBodyScroll(document.body);
            save(USER_KEY, email.value);
            userLogin = email.value;
            allData();
        } else alert('Invalid login or password');
    }
};
