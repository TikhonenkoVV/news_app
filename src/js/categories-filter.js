import { refs } from './refs';
import axios from 'axios';
import Notiflix from 'notiflix';
import { createPagination } from './pagination';
import { hideMainContent, showMainContent } from './news-not-found';
const throttle = require('lodash.throttle');

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'e3QVyAs0wF8oNwOW75RSlccT9UsAdwt7';

// refs.categoriesBtns.addEventListener('click', onClickBtns());

// refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown());

export const onClickBtns = async e => {
    e.preventDefault();
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const category = encodeURIComponent(e.target.dataset.section.trim());
    try {
        // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
        const { data } = await axios.get(
            `${BASE_URL}/news/v3/content/all/${category}.json`,
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
                let imgUrl =
                    multimedia && multimedia.length > 0
                        ? multimedia[multimedia.length - 1].url
                        : '';
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
        renderGallery(users, true);
        createPagination(users, renderGallery);
        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true);
                createPagination(load('bite-search'), renderGallery);
            }, 1000)
        );
        showMainContent();
    } catch (error) {
        hideMainContent();
        console.log(error);
        // if (error.response && error.response.status === 404) {
        //     Notiflix.Notify.warning('No news found for selected category.');
        // } else {
        //     Notiflix.Notify.failure(
        //         'Something went wrong. Please try again later.'
        //     );
        // }
    }
};

export const onClickBtnsDropdown = async e => {
    e.preventDefault();
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }
    const category = encodeURIComponent(e.target.dataset.section.trim());

    try {
        // виконуємо запит на бекенд з параметрами, відповідними до вибраної категорії
        const { data } = await axios.get(
            `${BASE_URL}/news/v3/content/all/${category}.json`,
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
                let imgUrl =
                    multimedia && multimedia.length > 0
                        ? multimedia[multimedia.length - 1].url
                        : '';
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
        renderGallery(users, true);
        createPagination(users, renderGallery);
        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true);
                createPagination(load('bite-search'), renderGallery);
            }, 1000)
        );
        showMainContent();
    } catch (error) {
        hideMainContent();
        console.log(error);
        // if (error.response && error.response.status === 404) {
        //     // Notiflix.Notify.warning('No news found for selected category.');
        // } else {
        //     Notiflix.Notify.failure(
        //         'Something went wrong. Please try again later.'
        //     );
        // }
    }
};

export function renderGallery(users, ifFirstPage) {
    const gallaryMarkup = users
        .map(
            (
                { imgUrl, title, section, abstract, published_date, url },
                index
            ) => {
                if (ifFirstPage) {
                    if (window.matchMedia('(min-width: 1280px)').matches) {
                        if (index > 7) {
                            return;
                        }
                    } else if (
                        window.matchMedia('(min-width: 768px)').matches
                    ) {
                        if (index > 6) {
                            return;
                        }
                    } else {
                        if (index > 3) {
                            return;
                        }
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
