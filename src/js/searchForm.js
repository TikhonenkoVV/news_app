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
        } = await fetchSearchArticles(1, query);
        if (!docs.length) {
            hideMainContent();
            // Notify.failure('No news founded');
            return;
        }
        showMainContent();

        normalize(docs);

        renderSearchedNews(load('bite-search'), true);

        createPagination(load('bite-search'), renderSearchedNews);
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
