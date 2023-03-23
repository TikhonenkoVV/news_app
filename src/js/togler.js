import { refs } from './refs';

const onToglerClick = e => {
    document.body.classList.toggle('dark');
};

refs.togler.addEventListener('click', onToglerClick);
