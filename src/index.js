import './js/searchForm';
import './js/mobile-menu';
import { refs } from './js/refs';
import { onToglerClick, checkCurrentTheme } from './js/togler';
import { onTabsClick } from './js/on-tabs-click';
import { onClickBtns, onClickBtnsDropdown } from './js/categories-filter';
import { allData } from './js/main';
import { handleScreenSizeChange } from './js/categories';
import { handleSubmit } from './js/searchForm';
import { checkAuth, updateReedFunc } from './js/autorization';
import * as weatherBanner from './js/weather-banner';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import './calendar.css';
import { Notify } from 'notiflix';
const options = {
    enableTime: false,
    time_24hr: true,
    defaultDate: new Date(),
    maxDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date().getTime();
        const selectedDate = selectedDates[0].getTime();
        const ms = selectedDate - currentDate;
        refs.arrowDown.classList.toggle('visually-hidden');
        refs.arrowUp.classList.toggle('visually-hidden');
    },
    onOpen() {
        refs.arrowDown.classList.toggle('visually-hidden');
        refs.arrowUp.classList.toggle('visually-hidden');
    },
};

flatpickr('#datetime-picker', options);

refs.mobileToggler.addEventListener('click', onToglerClick);
refs.togler.addEventListener('click', onToglerClick);
refs.tabs.addEventListener('click', onTabsClick);
refs.form.addEventListener('submit', handleSubmit);

checkCurrentTheme();
handleScreenSizeChange();

if (refs.categoriesBtns && refs.categoriesDropdown) {
    refs.categoriesBtns.addEventListener('click', onClickBtns);
    refs.categoriesDropdown.addEventListener('click', onClickBtnsDropdown);
}
allData();
checkAuth()
