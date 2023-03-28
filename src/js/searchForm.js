import { Notify } from 'notiflix';
import { fetchSearchArticles } from './fetch';
import { renderSearchedNews } from './templates/templates';
import { normalize } from './normalize';
import { load } from './storage';
import { createPagination } from './pagination';
// const throttle = require('lodash.throttle');
import throttle from 'lodash.throttle';
import { hideMainContent, showMainContent } from './news-not-found';

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
        } = await fetchSearchArticles(0, query);
        if (!docs.length) {
            hideMainContent();
            // Notify.failure('No news founded');
            return;
        }
        showMainContent();

        normalize(docs);

        renderSearchedNews(load('bite-search'), true);
        let results = [];
        results.push(...load('bite-search'));
        disableButtons();

        for (let i = 1; i <= 8; i += 1) {
            try {
                const {
                    response: { docs },
                } = await fetchSearchArticles(i, query);
                normalize(docs);
                results.push(...load('bite-search'));
                if (!docs.length) {
                    return;
                }
            } catch (err) {
                console.log(err);
            }
            await new Promise(res => setTimeout(res, 500));
            createPagination(results, renderSearchedNews);
            disableButtons();
            if (i === 8) {
                enableButtons();
            }
        }

        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true);
                createPagination(load('bite-search'), renderGallery);
            }, 1000)
        );
    } catch (err) {
        console.log(err);
    }
};

function disableButtons() {
    const paginationButtons = document.querySelectorAll('li[data-page]');
    const btnNextPg = document.querySelector('.pagination__next-page');
    for (button of paginationButtons) {
        button.classList.add('disabled');
    }
    btnNextPg.setAttribute('disabled', true);
};

function enableButtons() {
    const paginationButtons = document.querySelectorAll('li[data-page]');
    const btnNextPg = document.querySelector('.pagination__next-page');
    for (button of paginationButtons) {
        button.classList.remove('disabled');
    }
    btnNextPg.removeAttribute('disabled');
};