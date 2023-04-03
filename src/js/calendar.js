import { refs } from './refs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../calendar.css';

export let selectedDate = null;

const options = {
    enableTime: false,
    time_24hr: true,
    //defaultDate: new Date(),
    maxDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // const currentDate = new Date().getTime();
        // const selectedDate = selectedDates[0].getTime();
        // const ms = selectedDate - currentDate;
        refs.arrowDown.classList.toggle('visually-hidden');
        refs.arrowUp.classList.toggle('visually-hidden');
        if (selectedDates && selectedDates.length > 0) {
            selectedDate = selectedDates[0];
        } else {
            selectedDate = null;
        }
    },
    onOpen() {
        refs.arrowDown.classList.toggle('visually-hidden');
        refs.arrowUp.classList.toggle('visually-hidden');
    },
};

const dateTimePicker = flatpickr('#datetime-picker', options);
//selectedDate = dateTimePicker.defaultDate;
