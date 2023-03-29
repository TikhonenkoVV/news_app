import { refs } from './refs';

const hideClass = 'content-hidden';

export function showMainContent() {
    refs.newsNotFoundSection.classList.add(hideClass);
    refs.newsSection.classList.remove(hideClass);
    refs.paginationWrapper.classList.remove(hideClass);
}

export function hideMainContent() {
    refs.newsSection.classList.add(hideClass);
    refs.paginationWrapper.classList.add(hideClass);
    refs.seachQuery.value = '';
    refs.newsNotFoundSection.classList.remove(hideClass);
}
