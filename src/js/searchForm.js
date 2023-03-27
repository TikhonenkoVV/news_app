import { Notify } from 'notiflix';
import { fetchSearchArticles } from './fetch';
import { renderSearchedNews } from './templates/templates';
import { normalize } from './normalize';
import { renderGallery } from './main';
import { load } from './storage';
import { createPagination } from './pagination';
const throttle = require('lodash.throttle');

const ref = {
    form: document.querySelector('.search-form'),
};

ref.form.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
    e.preventDefault();
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
            Notify.failure('No news founded');
            return;
        }

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
}
