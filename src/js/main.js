import { refs } from './refs';
import { load } from './storage';
import { addDataReadNews } from './read/add-data-read-more';
import { fetchPopularArticles } from './fetch';
import { normalize } from './normalize';
import { createPagination } from './pagination';
const throttle = require('lodash.throttle');

export async function allData() {
    try {
        const data = await fetchPopularArticles();
        const { results, num_results } = data;

        normalize(results);

        renderGallery(load('bite-search'), true);
        createPagination(load('bite-search'), renderGallery);

        window.addEventListener('resize', throttle(((e) => {
            renderGallery(load('bite-search'), true);
            createPagination(load('bite-search'), renderGallery);
        }), 1000));
    } catch (error) {
        console.log(error);
    }
}

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
              <button id="${url}" type="button" class="news__btn">Add to favorite
              <svg class="news__btn-icon" width="20" height="20">
                <use href="#icon-heart-border"></use>
                </svg></button>
                <p class="overlay visually-hidden">Already read<svg class="already" width="20" height="20">
                <use href="#icon-already-read"></use>
                </svg></p></div>
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
refs.newsContainer.addEventListener('click', addDataReadNews);

export function addOverLay(e) {
    let elements =
        e.target.parentNode.previousSibling.previousSibling.lastElementChild;
    elements.classList.remove('visually-hidden');
}
