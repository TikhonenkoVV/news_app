import { Notify } from 'notiflix';
import { fetchSearchArticles } from './fetch';
import { renderSearchedNews } from './templates/templates';
import { normalize } from './normalize';
import { load } from './storage';
import { createPagination } from './pagination';
// const throttle = require('lodash.throttle');
import throttle from 'lodash.throttle';
import { hideMainContent, showMainContent } from './news-not-found';
import { refs } from './refs';
import { selectedDate } from './calendar';

export const handleSubmit = async e => {
    e.preventDefault();
    if (
        e.currentTarget.querySelector('.header__input-search').clientWidth < 49
    ) {
        return;
    }
    const query = e.target.searchQuery.value.trim();
    if (!query) {
        Notify.warning('Enter some query');
        return;
    }
    try {
        const {
            response: { docs },
        } = await fetchSearchArticles(0, query, selectedDate);
        if (!docs.length) {
            hideMainContent();
            // Notify.failure('No news founded');
            return;
        }
        showMainContent();

        normalize(docs);
        renderSearchedNews(load('bite-search'), true);
        createPagination(load('bite-search'), renderSearchedNews);
        disableButtons();
        addLoader();

        let results = [];
        results.push(...load('bite-search'));

        for (let i = 1; i <= 8; i += 1) {
            try {
                const {
                    response: { docs },
                } = await fetchSearchArticles(i, query);
                if (!docs.length) {
                    return;
                }
                normalize(docs);
                results.push(...load('bite-search'));
            } catch (err) {
                console.log(err);
            }
            await new Promise(res => setTimeout(res, 500));
            createPagination(results, renderSearchedNews);
            disableButtons();
        }

        enableButtons();
        removeLoader();

        window.addEventListener(
            'resize',
            throttle(e => {
                renderSearchedNews(load('bite-search'), true);
                createPagination(results, renderSearchedNews);
            }, 1000)
        );
    } catch (err) {
        console.log(err);
    }
};

function disableButtons() {
    const paginationButtons = document.querySelectorAll('li[data-page]');
    const btnNextPg = document.querySelector('.pagination__next-page');
    const btnPrevPg = document.querySelector('.pagination__prev-page');

    if (btnNextPg && paginationButtons) {
        paginationButtons.forEach(button => {
            button.classList.add('disabled');
        });
        btnNextPg.setAttribute('disabled', true);
        if (!btnPrevPg.hasAttribute('disabled'))
            btnPrevPg.setAttribute('disabled', true);
    }
}

function enableButtons() {
    const paginationButtons = document.querySelectorAll('li[data-page]');
    const btnNextPg = document.querySelector('.pagination__next-page');

    if (btnNextPg && paginationButtons) {
        paginationButtons.forEach(button => {
            button.classList.remove('disabled');
        });
        btnNextPg.removeAttribute('disabled');
    }
}

function addLoader() {
    const loaderBox = document.createElement('div');
    const wrapper = document.querySelector('.pagination__wrapper');
    loaderBox.classList.add('pagination__loader');
    loaderBox.innerHTML =
        '<p>All news are loading, please wait few seconds...</p>';
    wrapper.prepend(loaderBox);
}

export function removeLoader() {
    const loader = document.querySelector('.pagination__loader');
    loader.classList.add('visually-hidden');
}
