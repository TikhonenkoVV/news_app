import { Notify } from 'notiflix';
import { fetchSearchArticles } from './fetch';
import { renderSearchedNews } from './templates/templates';
import { normalize } from './normalize';
import { load } from './storage';
import { createPagination } from './pagination';

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
            Notify.failure('No news founded');
            return;
        }

        normalize(docs);

        renderSearchedNews(load('bite-search'), true);

        createPagination(load('bite-search'), renderSearchedNews);
    } catch (err) {
        console.log(err);
    }
};
