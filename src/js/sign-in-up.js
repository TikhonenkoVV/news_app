import { refs } from './refs';
import { save } from './storage';
import { chkRegUser, regUser } from './check-user';

export let signInformData = {};
export let signUpformData = {};

export const onSignInSubmit = e => {
    e.preventDefault();
    const {
        elements: { email, password },
    } = e.currentTarget;
    signInformData = {
        email: email.value,
        password: password.value,
    };
    console.log(signInformData);

    if (!chkRegUser(signInformData)) {
        alert('Wrong username or password');
        return;
    }
    e.target.classList.add('hide');
    refs.autorizeNav.classList.add('hide');
    refs.formSignIn.classList.add('hide');
    refs.profilePhoto.classList.add('show');
    refs.wellcomeLeyout.classList.add('show');
    refs.profileBtn.classList.remove('hide');
    e.currentTarget.reset();
    refs.formSignUp.reset();
    save('bite-news-app', 'autorized');
};

export const onSignUpSubmit = e => {
    e.preventDefault();
    const {
        elements: { user, email, password },
    } = e.currentTarget;
    signUpformData = {
        user: user.value,
        email: email.value,
        password: password.value,
    };
    if (regUser(signUpformData) === false) {
        alert('This email is in use. If this is you, then sign in.');
        return;
    }
    e.target.classList.add('hide');
    refs.autorizeNav.classList.add('hide');
    refs.formSignUp.classList.add('hide');
    refs.autorizeAnime.classList.add('show');
    refs.wellcomeLeyout.classList.add('show');
    refs.autorizeTitle.textContent = 'Thank you for registering!';
    refs.autorizeAnime.classList.remove('visually-hidden');
    refs.autorizeAnime.classList.add('show');
    refs.profileBtn.classList.remove('hide');
    refs.formSignIn.reset();
    e.currentTarget.reset();
    save('bite-news-app', 'autorized');
};

export const onSignInUpNavClick = e => {
    if (e.target.nodeName !== 'A') return;
    const active = document.querySelector('.autorize__nav-item.active');
    const current = e.target.parentElement;
    if (!current.classList.contains('active')) {
        active.classList.toggle('active');
        current.classList.toggle('active');
        refs.formSignIn.classList.toggle('autorize__form-signin-left');
        refs.formSignUp.classList.toggle('autorize__form-signup-left');
    }
};

export const resetStyle = () => {
    const navBtn = document.querySelectorAll('.autorize__nav-item');
    navBtn[0].classList.add('active');
    navBtn[1].classList.remove('active');
    refs.btnSignIn.classList.remove('hide');
    refs.formSignIn.classList.remove('hide');
    refs.formSignIn.classList.remove('autorize__form-signin-left');
    refs.formSignUp.classList.remove('autorize__form-signup-left');
    refs.autorizeNav.classList.remove('hide');
    refs.formSignIn.classList.remove('hide');
    refs.profilePhoto.classList.remove('show');
    refs.wellcomeLeyout.classList.remove('show');
};

export const onSignInBtnCloseClick = () => {
    refs.backdrop.classList.add('is-hidden');
};
