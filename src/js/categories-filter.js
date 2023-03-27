import { refs } from './refs';
import axios from 'axios';
import Notiflix from 'notiflix';
import { createPagination } from './pagination';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'e3QVyAs0wF8oNwOW75RSlccT9UsAdwt7';

// refs.categoriesBtns.addEventListener('click', onClickBtns());

// refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown());

export const onClickBtns = async e => {
    e.preventDefault();
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const category = e.target.textContent.trim();
    try {
        // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
        const { data } = await axios.get(
            `${BASE_URL}/topstories/v2/${category}.json?`,
            {
                params: {
                    'api-key': API_KEY,
                },
            }
        );
        const { results } = data;
        const users = results.map(
            ({ published_date, section, abstract, multimedia, title, url }) => {
                let favorite = '';
                let readMore = '';
                let imgUrl = multimedia[2].url;
                return {
                    favorite,
                    readMore,
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                };
            }
        );
        renderGallery(users);
        createPagination(users, renderGallery);
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
            Notiflix.Notify.warning('No news found for selected category.');
        } else {
            Notiflix.Notify.failure(
                'Something went wrong. Please try again later.'
            );
        }
    }
};

export const onClickBtnsDropdown = async e => {
    e.preventDefault();
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const category = e.target.textContent.trim();

    try {
        // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
        const { data } = await axios.get(
            `${BASE_URL}/topstories/v2/${category}.json?`,
            {
                params: {
                    'api-key': API_KEY,
                },
            }
        );
        const { results } = data;
        const users = results.map(
            ({ published_date, section, abstract, multimedia, title, url }) => {
                let favorite = '';
                let readMore = '';
                let imgUrl = multimedia[1].url;
                return {
                    favorite,
                    readMore,
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                };
            }
        );
        renderGallery(users);
        createPagination(users, renderGallery);
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
            Notiflix.Notify.warning('No news found for selected category.');
        } else {
            Notiflix.Notify.failure(
                'Something went wrong. Please try again later.'
            );
        }
    }
};

export function renderGallery(users) {
    const gallaryMarkup = users
        .map(
            (
                { imgUrl, title, section, abstract, published_date, url },
                index
            ) => {
                if (window.matchMedia('(min-width: 1280px)').matches) {
                    if (index > 7) {
                        return;
                    }
                } else if (window.matchMedia('(min-width: 768px)').matches) {
                    if (index > 6) {
                        return;
                    }
                } else {
                    if (index > 3) {
                        return;
                    }
                }
                return `<div class="news__item">
            <p class="news__section">${section}</p>
            <div class="news__img">
              <img src="${imgUrl}" alt="${title}" loading="lazy"/>
              <button type="button" class="news__btn">Add to favorite
              <svg class="news__btn-icon" width="20" height="20">
                <use href="#icon-heart-border"></use>
                </svg></button></div>
            <div class="info">
              <p class="info__title">${title}</p>
              <p class="info__abstract">${abstract}</p>
              <p class="info__published-date">${published_date}</p>
              <a href="${url}" target="_blank"
                rel="noopener noreferrer nofollow"
                 class="info__link">Read more</a>
            </div></div>`;
            }
        )
        .join('');

    refs.newsContainer.innerHTML = gallaryMarkup;
}
