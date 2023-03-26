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

const createBtnsMarkupMobile = results => {
    return results
        .map(({ display_name }) => {
            return `<a href="" class="home__dropdown-menu--item"><button class="home__dropdown-item" type="button">${display_name}</button></a>`;
        })
        .join('');
};

const renderMarkupMobile = results => {
    categoriesDropdown.innerHTML = createBtnsMarkupMobile(results);
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
            return `<a href="" class="home__dropdown-menu--item"><button class="home__dropdown-item" type="button">${display_name}</button></a>`;
        })
        .join('');

    categoriesBtns.innerHTML = buttonsMarkup;
    categoriesDropdown.innerHTML = dropdownMarkup;
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
            return `<a href="" class="home__dropdown-menu--item"><button class="home__dropdown-item" type="button">${display_name}</button></a>`;
        })
        .join('');

    categoriesBtns.innerHTML = buttonsMarkup;
    categoriesDropdown.innerHTML = dropdownMarkup;
};

let timeout;

window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            // mobile
            console.log('<768px');
            categoriesBtns.innerHTML = '';
            fetchCategoryArticles().then(({ results }) => {
                renderMarkupMobile(results);
            });
        } else if (screenWidth < 1280) {
            // tablet
            console.log('>768px');
            categoriesBtns.innerHTML = '';
            fetchCategoryArticles().then(({ results }) => {
                createBtnsMarkupTablet(results);
            });
        } else {
            // desktop
            console.log('>1280px');
            categoriesBtns.innerHTML = '';
            fetchCategoryArticles().then(({ results }) => {
                createBtnsMarkupDesktop(results);
            });
        }
    }, 500);
});

// if (matchMedia) {
//     const screenMobile = window.matchMedia('(min-width:320px)');
//     screenMobile.addListener(changesMobile);
//     changesMobile(screenMobile);
// }

// function changesMobile(screenMobile) {
//     if (screenMobile.matches) {
//         console.log('<768px');
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             renderMarkupMobile(results);
//         });
//     }
// }

// if (matchMedia) {
//     const screenTablet = window.matchMedia('(min-width:768px)');
//     screenTablet.addListener(changesTablet);
//     changesTablet(screenTablet);
// }

// function changesTablet(screenTablet) {
//     if (screenTablet.matches) {
//         console.log('>768px');
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             createBtnsMarkupTablet(results);
//         });
//     }
// }

// if (matchMedia) {
//     const screenDesktop = window.matchMedia('(min-width:1280px)');
//     screenDesktop.addListener(changesDesktop);
//     changesDesktop(screenDesktop);
// }

// function changesDesktop(screenDesktop) {
//     if (screenDesktop.matches) {
//         console.log('>1280px');
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             createBtnsMarkupDesktop(results);
//         });
//     } else {
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             createBtnsMarkupTablet(results);
//         });
//     }
// }
