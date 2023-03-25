import {
    fetchPopularArticles,
    fetchSearchArticles,
    fetchCategoryArticles,
} from './js/fetch';
import { refs } from './js/refs';
import { onToglerClick } from './js/togler';

refs.togler.addEventListener('click', onToglerClick);

// console.log(fetchPopularArticles());
// console.log(fetchSearchArticles(2, 'china'));
// console.log(fetchCategoryArticles(5, 'arts'));

// async function allData() {
//     const { data } = await fetchPopularArticles();
//     const { results, num_results } = data;
//     const users = results
//         .map(({ published_date, section, abstract, media, title }) => {
//             let url;
//             const arr = media[0];
//             arr ? (url = arr['media-metadata'][0].url) : (url = '');
//             return `<img src="${url}" />`;
//         })
//         .join('');
//     return console.log(users);
// }

// allData();
