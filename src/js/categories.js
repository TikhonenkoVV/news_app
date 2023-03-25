import { fetchCategoryArticles } from './fetch';

const categoriesBtns = document.querySelector('.home__category');
const categoriesDropdown = document.querySelector('.home__category-dropdown');

const createBtnsMarkupTablet = results => {
    const buttonsMarkup = results
        .slice(0, 3)
        .map(({ display_name }) => {
            return `<button class="home__category-button" type="button">
                    ${display_name}
                </button>`;
        })
        .join('');

    const dropdownMarkup = results
        .slice(3)
        .map(({ display_name }) => {
            return `<button class="home__dropdown-item" type="button">${display_name}
                    <svg width="14" height="14">
                    <use href="./images/sprite.svg#icon-arrow-down"></use>
                    <use href="./images/sprite.svg#icon-arrow-up"></use>
                    </svg>
                </button>`;
        })
        .join('');

    return `
    ${buttonsMarkup}
    <div class="home__category-dropdown">
      <button class="home__category-button">Other</button>
      <div class="home__dropdown-menu">
        ${dropdownMarkup}
      </div>
    </div>
  `;
};

const renderMarkupIfTablet = results => {
    const markupTablet = createBtnsMarkupTablet(results);
    categoriesBtns.innerHTML = markupTablet;
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

    // повертаємо маркап кнопок та дропдауна
    return buttonsMarkup, dropdownMarkup;
};

const renderMarkupIfDesktop = results => {
    const { buttonsMarkup, dropdownMarkup } = createBtnsMarkupDesktop(results);

    categoriesBtns.insertAdjacentHTML();
};

const renderMarkup = () => {
    if (window.innerWidth >= 1280) {
        fetchCategoryArticles().then(({ results }) =>
            renderMarkupIfDesktop(results)
        );
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        fetchCategoryArticles().then(({ results }) =>
            renderMarkupIfTablet(results)
        );
    } else {
        // Викликати функцію для рендерингу мобільного макету
    }
};

window.addEventListener('load', renderMarkup);
