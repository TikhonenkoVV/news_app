import { fetchCategoryArticles } from './fetch';

const categoriesBtns = document.querySelector('.home__category');
const categoriesDropdown = document.querySelector('.home__dropdown-menu');

const categoryButton = document.querySelector('.home__category-button');
const openIcon = document.querySelector('.home__category-button-icon--open');
const closeIcon = document.querySelector('.home__category-button-icon--close');

categoryButton.addEventListener('click', () => {
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    categoriesDropdown.classList.toggle('hidden');
});

const cachedResults = {};

const createBtnsMarkupMobile = results => {
    categoriesBtns.innerHTML = '';

    const dropdownMarkup = results
        .map(({ display_name }) => {
            return `<button class="home__dropdown-item" type="button">${display_name}</button>`;
        })
        .join('');
    categoriesDropdown.insertAdjacentHTML('beforeend', dropdownMarkup);
};

const createBtnsMarkupTablet = results => {
    const buttonsMarkup = results
        .slice(0, 4)
        .map(({ display_name }) => {
            return `<button class="home__category-button" type="button">
                    ${display_name}
                </button>`;
        })
        .join('');

    const dropdownMarkup = results
        .slice(4)
        .map(({ display_name }) => {
            return `<button class="home__dropdown-item" type="button">${display_name}</button>`;
        })
        .join('');

    categoriesBtns.innerHTML = buttonsMarkup;
    categoriesDropdown.insertAdjacentHTML('beforeend', dropdownMarkup);
};

const createBtnsMarkupDesktop = results => {
    const buttonsMarkup = results
        .slice(0, 6) // обмежуємо результат лише першими 7 категоріями
        .map(({ display_name }) => {
            return `<button class="home__category-button" type="button">
                    ${display_name}
                </button>`;
        })
        .join('');

    const dropdownMarkup = results
        .slice(6) // обмежуємо результат всіма категоріями, що залишилися
        .map(({ display_name }) => {
            return `<button class="home__dropdown-item" type="button">${display_name}</button>`;
        })
        .join('');

    categoriesBtns.innerHTML = buttonsMarkup;
    categoriesDropdown.insertAdjacentHTML('beforeend', dropdownMarkup);
};

const renderMarkup = () => {
    if (window.innerWidth >= 1280) {
        if (cachedResults.desktop) {
            createBtnsMarkupDesktop(cachedResults.desktop);
        } else {
            fetchCategoryArticles().then(({ results }) => {
                createBtnsMarkupDesktop(results);
                cachedResults.desktop = results;
            });
        }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        if (cachedResults.tablet) {
            createBtnsMarkupTablet(cachedResults.tablet);
        } else {
            fetchCategoryArticles().then(({ results }) => {
                createBtnsMarkupTablet(results);
                cachedResults.tablet = results;
            });
        }
    } else {
        if (cachedResults.mobile) {
            createBtnsMarkupMobile(cachedResults.mobile);
        } else {
            fetchCategoryArticles().then(({ results }) => {
                createBtnsMarkupMobile(results);
                cachedResults.mobile = results;
            });
        }
    }
};

window.addEventListener('load', renderMarkup);
