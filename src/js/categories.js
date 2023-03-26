import { fetchCategoryArticles } from './fetch';
import { refs } from './refs';

refs.categoryButton.addEventListener('click', event => {
    event.preventDefault();
    refs.openIcon.classList.toggle('hidden');
    refs.closeIcon.classList.toggle('hidden');
    refs.categoriesDropdown.classList.toggle('hidden');
});

document.body.addEventListener('click', event => {
    event.preventDefault();
    const isClickInside = refs.categoriesDropdown.contains(event.target);
    const isClickOnButton = refs.categoryButton.contains(event.target);
    if (!isClickInside && !isClickOnButton) {
        refs.categoriesDropdown.classList.add('hidden');
        refs.openIcon.classList.remove('hidden');
        refs.closeIcon.classList.add('hidden');
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
    refs.categoriesDropdown.innerHTML = createBtnsMarkupMobile(results);
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

    refs.categoriesBtns.innerHTML = buttonsMarkup;
    refs.categoriesDropdown.innerHTML = dropdownMarkup;
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

    refs.categoriesBtns.innerHTML = buttonsMarkup;
    refs.categoriesDropdown.innerHTML = dropdownMarkup;
};

let timeout;

export function handleScreenSizeChange() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        // mobile
        refs.categoriesBtns.innerHTML = '';
        fetchCategoryArticles().then(({ results }) => {
            renderMarkupMobile(results);
        });
    } else if (screenWidth < 1280) {
        // tablet
        refs.categoriesBtns.innerHTML = '';
        fetchCategoryArticles().then(({ results }) => {
            createBtnsMarkupTablet(results);
        });
    } else {
        // desktop
        refs.categoriesBtns.innerHTML = '';
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
