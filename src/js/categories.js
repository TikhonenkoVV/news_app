import { fetchCategoryArticles } from './fetch';

const categoriesBtns = document.querySelector('.home__category');
const categoriesDropdown = document.querySelector('.home__dropdown-menu');

const categoryButton = document.querySelector('.home__category-button');
const iconCloseOpen = document.querySelector('.home__category-button-icon');
const openIcon = document.querySelector('.home__category-button-icon--open');
const closeIcon = document.querySelector('.home__category-button-icon--close');

categoryButton.addEventListener('click', event => {
    event.preventDefault();
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    categoriesDropdown.classList.toggle('hidden');
});

document.body.addEventListener('click', event => {
    event.preventDefault();
    const isClickInside = categoriesDropdown.contains(event.target);
    const isClickOnButton = categoryButton.contains(event.target);
    if (!isClickInside && !isClickOnButton) {
        categoriesDropdown.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
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

// let timeout;

// let icons = openIcon.cloneNode(true);

// function handleScreenSizeChange() {
//     const screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//         // mobile
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             renderMarkupMobile(results);
//         });
//         categoryButton.textContent = 'Categories';
//         categoryButton.removeChild(icons);
//         if (mobileIcon.parentNode !== categoryButton) {
//             categoryButton.appendChild(icons);
//         }
//     } else if (screenWidth < 1280) {
//         // tablet
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             createBtnsMarkupTablet(results);
//         });
//         categoryButton.textContent = 'Other';
//         categoryButton.removeChild(icons);
//         if (mobileIcon.parentNode !== categoryButton) {
//             categoryButton.appendChild(icons);
//         }
//     } else {
//         // desktop
//         categoriesBtns.innerHTML = '';
//         fetchCategoryArticles().then(({ results }) => {
//             createBtnsMarkupDesktop(results);
//         });
//         categoryButton.textContent = 'Other';
//         categoryButton.removeChild(icons);
//         if (desktopIcon.parentNode !== categoryButton) {
//             categoryButton.appendChild(icons);
//         }
//     }
// }

function handleScreenSizeChange() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        // mobile
        categoriesBtns.innerHTML = '';
        fetchCategoryArticles().then(({ results }) => {
            renderMarkupMobile(results);
        });
    } else if (screenWidth < 1280) {
        // tablet
        categoriesBtns.innerHTML = '';
        fetchCategoryArticles().then(({ results }) => {
            createBtnsMarkupTablet(results);
        });
    } else {
        // desktop
        categoriesBtns.innerHTML = '';
        fetchCategoryArticles().then(({ results }) => {
            createBtnsMarkupDesktop(results);
        });
    }
}

window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(handleScreenSizeChange, 500);
});

// викликаємо при завантаженні сторінки
handleScreenSizeChange();
