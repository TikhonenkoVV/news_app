export const openCloseNews = (e) => {
    if (e.target.classList.contains('data-read') || e.target.classList.contains('data-read__text') || e.target.classList.contains('data-read__icon') ) {
      const readItems = document.querySelectorAll('.news__item-read');
      const arrow = document.querySelector('.data-read__icon');
      arrow.classList.toggle('rotate');
      readItems.forEach((item) => {
        item.classList.toggle('hide');
      });
    }
  };
