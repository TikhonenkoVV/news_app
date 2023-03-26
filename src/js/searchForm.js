import { Notify } from 'notiflix';
import { fetchSearchArticles } from './fetch';
import { renderSearchedNews } from './templates/templates';

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
        renderSearchedNews(docs);
    } catch (err) {
        console.log(err);
    }
}
