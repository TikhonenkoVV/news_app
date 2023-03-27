export const openCloseNews = (e) => {
    const button = e.target.closest('.data-read');
    if (button) {
      const box = button.nextElementSibling;
      box.classList.toggle('hidden');
    }
}