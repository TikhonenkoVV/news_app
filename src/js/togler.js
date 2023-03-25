export const onToglerClick = e => {
    document.body.classList.toggle('dark');
    const inputRef = document.querySelector('.header__input-search');
    const isDarkTheme = document.body.classList.contains('dark');
    setTheme(isDarkTheme);
    if (isDarkTheme) {
        console.log('nsjka');
        changeRefStyle(
            inputRef,
            { option: 'backgroundColor', value: '#2e2e2e' },
            { option: 'borderColor', value: '#FFFFFF' },
            { option: 'color', value: '#FFFFFF' }
        );
        return;
    }
    changeRefStyle(
        inputRef,
        { option: 'backgroundColor', value: '#FFFFFF' },
        { option: 'borderColor', value: '#2e2e2e' },
        { option: 'color', value: 'black' }
    );
};

export function setTheme(isDarkTheme) {
    localStorage.setItem('theme', !isDarkTheme ? '' : 'dark');
    const togglerRef = document.querySelector('.theme__lever');
    if (isDarkTheme) {
        togglerRef.style.transform = 'translateX(20px)';
        return;
    }
    togglerRef.style.transform = 'translateX(0px)';
}

export function checkCurrentTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        onToglerClick();
        return;
    }
}

function changeRefStyle(ref, ...styles) {
    styles.forEach(item => {
        ref.style[item.option] = item.value;
    });
}
