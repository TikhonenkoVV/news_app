import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    maxDate: new Date().fp_incr(90),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date().getTime();
        const selectedDate = selectedDates[0].getTime();
        const ms = selectedDate - currentDate;
        if (selectedDate > currentDate) {
            refs.startButton.disabled = false;
        } else {
            Notify.failure('Please choose a date in the future');
            refs.startButton.disabled = true;
        }
    },
};

flatpickr('#datetime-picker', options);
