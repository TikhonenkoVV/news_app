import { refs } from '../refs';
import { BASE_IMG_URL } from '../utils/constants';
import noPoster from '../../images/no_poster.jpg';
export function renderSearchedNews(news) {
    const markup = news
        .map(
            (
                {
                    multimedia,
                    headline: { main },
                    section_name,
                    abstract,
                    pub_date,
                    web_url,
                },
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
            <p class="news__section">${section_name}</p>
            <div class="news__img">
              <img src="${
                  multimedia?.[0]?.url
                      ? BASE_IMG_URL + multimedia?.[0]?.url
                      : noPoster
              }" alt="${main}" loading="lazy"/>
              <button type="button" class="news__btn">Add to favorite
              <svg class="news__btn-icon" width="20" height="20">
                <use href="#icon-heart-border"></use>
                </svg></button></div>
            <div class="info">
              <p class="info__title">${main}</p>
              <p class="info__abstract">${abstract}</p>
              <p class="info__published-date">${pub_date.split('T')[0]}</p>
              <a href="${web_url}" target="_blank"
                rel="noopener noreferrer nofollow"
                 class="info__link">Read more</a>
            </div></div>`;
            }
        )
        .join('');

    refs.newsContainer.innerHTML = markup;
}
