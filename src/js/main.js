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

        window.addEventListener(
            'resize',
            throttle(e => {
                renderGallery(load('bite-search'), true);
                createPagination(load('bite-search'), renderGallery);
            }, 1000)
        );
    } catch (error) {
        console.log(error);
    }
}

export function renderGallery(users, ifFirstPage) {
    let userGallery = load('user-gallery');

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
                let allAvailable = null;
                if (userGallery) {
                    allAvailable = userGallery.find(fruit => fruit.url === url);
                }

                if (allAvailable) {
                    // console.log(`allAvailable`, allAvailable);

                    if (allAvailable.readMore && allAvailable.favorite) {
                        console.log(`readMore & favorite`);
                        return `<div class="news__item">
            <p class="news__section">${section}</p>
            <div class="news__img">
              <img src="${imgUrl}" alt="${title}" loading="lazy"/>
              <button id="${url}" type="button" class="news__btn">Remove from favorite<svg class="news__btn-icon" width="20" height="20">
              <use href="#icon-heart-fill"></use></svg></button>
                <p class="overlay">Already read<svg class="already" width="20" height="20">
                <use href="#icon-already-read"></use>
                </svg></p></div><div class="info">
              <p class="info__title">${title}</p>
              <p class="info__abstract">${abstract}</p>
              <p class="info__published-date">${published_date}</p>
              <a href="${url}" target="_blank"
                rel="noopener noreferrer nofollow"
                 class="info__link">Read more</a></div></div>`;
                    }

                    if (allAvailable.favorite) {
                        // console.log(`favorite`);
                        return `<div class="news__item">
            <p class="news__section">${section}</p>
            <div class="news__img">
              <img src="${imgUrl}" alt="${title}" loading="lazy"/>
              <button id="${url}" type="button" class="news__btn">Remove from favorite<svg class="news__btn-icon" width="20" height="20">
              <use href="#icon-heart-fill"></use></svg></button>
                <p class="overlay visually-hidden">Already read<svg class="already" width="20" height="20">
                <use href="#icon-already-read"></use>
                </svg></p></div><div class="info">
              <p class="info__title">${title}</p>
              <p class="info__abstract">${abstract}</p>
              <p class="info__published-date">${published_date}</p>
              <a href="${url}" target="_blank"
                rel="noopener noreferrer nofollow"
                 class="info__link">Read more</a></div></div>`;
                    }

                    if (allAvailable.readMore) {
                        console.log(`readMore`);
                        return `<div class="news__item">
            <p class="news__section">${section}</p>
            <div class="news__img">
              <img src="${imgUrl}" alt="${title}" loading="lazy"/>
              <button id="${url}" type="button" class="news__btn">Add to favorite<svg class="news__btn-icon" width="20" height="20">
                <use href="#icon-heart-border"></use>
                </svg></button>
                <p class="overlay">Already read<svg class="already" width="20" height="20">
                <use href="#icon-already-read"></use>
                </svg></p></div><div class="info">
              <p class="info__title">${title}</p>
              <p class="info__abstract">${abstract}</p>
              <p class="info__published-date">${published_date}</p>
              <a href="${url}" target="_blank"
                rel="noopener noreferrer nofollow"
                 class="info__link">Read more</a></div></div>`;
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
                </svg></p></div><div class="info">
              <p class="info__title">${title}</p>
              <p class="info__abstract">${abstract}</p>
              <p class="info__published-date">${published_date}</p>
              <a href="${url}" target="_blank"
                rel="noopener noreferrer nofollow"
                 class="info__link">Read more</a></div></div>`;
            }
        )
        .join('');

    refs.newsContainer.innerHTML = gallaryMarkup;
}

export function addOverLay(e) {
    let elements = e.target.parentNode.previousSibling.lastElementChild;
    console.log(`parentNode`, elements);
    // console.log(
    //     `parentNode2`,
    //     e.target.parentNode.previousSibling.lastElementChild
    // );
    elements.classList.remove('visually-hidden');
    // elements.classList.contains(cls);
}
