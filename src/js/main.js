import { refs } from './refs';

import { fetchPopularArticles } from './fetch';

async function allData() {
    try {
        const { data } = await fetchPopularArticles();
        console.log(`data`, data);
        const { results, num_results } = data;

        const users = results.map(
            ({ published_date, section, abstract, media, title, url }) => {
                let imgUrl = '';
                const arrImg = media[0];
                if (arrImg !== undefined) {
                    imgUrl = arrImg['media-metadata'][2].url;
                }
                return {
                    imgUrl,
                    title,
                    section,
                    abstract,
                    published_date,
                    url,
                };
            }
        );
        console.log(`newsArr`, users);
        renderGallery(users);
    } catch (error) {
        console.log(error);
    }
}

allData();

function renderGallery(users) {
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

    // galleryContainer.innerHTML = gallaryMarkup;
    refs.newsContainer.insertAdjacentHTML('beforeend', gallaryMarkup);
}

// const users1 = results.map(
//     ({ published_date, section, abstract, media, title }) => {
//         let url = '';
//         const arr = media[0];
//         if (arr !== undefined) {
//             url = arr['media-metadata'][2].url;
//         }
//         return { url, section };
//     }
// );

// `<div class="news__item">
//             <p class="news__section">${section}</p>
//             <div class="news__img">
//               <img src="${imgUrl}" alt="${title}" loading="lazy"/>
//               <button class="news__btn">Add to favorite
//               <svg class="news__btn-icon" width="20" height="20">
//                 <use href="./images/sprite.svg#icon-heart-border"></use>
//                 </svg></button></div>
//             <div class="info">
//               <p class="info__title">${title}</p>
//               <p class="info__abstract">${abstract}</p>
//               <p class="info__published-date">${published_date}</p>
//               <a href="${url}" target="_blank"
//                 rel="noopener noreferrer nofollow"
//                  class="info__link">Read more</a>
//             </div></div>`;

// const tempArr = results.map(
//     ({ published_date, section, abstract, media, title }) => {
//         return {
//             url: [index].media[0]["media-metadata"][2].url,
//             title,
//             section,
//             abstract,
//             published_date,
//         };
//     }
// );
// const bookGenres = book['genres'];

// const users = results.map(
//     ({ published_date, section, abstract, media, title }, index, arr) => {
//         const image = data.results[0].media[0]['media-metadata'][2].url;
//         const test = JSON.stringify(image);
//         console.log(`image`, test);
//         return {
//             temp: index,
//             url: test,
//             title,
//             section,
//             abstract,
//             published_date,
//         };
//     }
// );

// const { published_date, section, abstract, media, title } = results[8];

// console.log(`results8`, results[8]);

// console.log(`img`, media[0]['media-metadata'][2].url);
// console.log(`title`, title);
// console.log(`section`, section);
// console.log(`abstract`, abstract);
// console.log(`published_date`, published_date);
// const user = {
//     url: media[0]['media-metadata'][2].url,
//     title,
//     section,
//     abstract,
//     published_date,
// };
// console.log(`user`, user);

// массив
//     .map((element, index, array) => {
//         // Тіло колбек-функції
//         if (index === 2) {
// <li class="weather"></li>;
//         }
//     })
//     .join('');
