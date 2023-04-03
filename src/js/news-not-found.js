import { refs } from './refs';

const hideClass = 'content-hidden';

export function showMainContent() {
    refs.newsNotFoundSection.classList.add(hideClass);
    refs.newsSection.classList.remove(hideClass);
    refs.pgWrapper.classList.remove(hideClass);
}

export function hideMainContent() {
    refs.newsSection.classList.add(hideClass);
    refs.pgWrapper.classList.add(hideClass);
    refs.seachQuery.value = '';
    refs.newsNotFoundSection.classList.remove(hideClass);
}
