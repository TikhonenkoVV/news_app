export const onToglerClick = e => {
    document.body.classList.toggle('dark');
    const inputRef = document.querySelector('.header__input-search');
    const isDarkTheme = document.body.classList.contains('dark');
    setTheme(isDarkTheme);
    if (isDarkTheme) {
        changeRefStyle(
            inputRef,
            { option: 'backgroundColor', value: '#2e2e2e' },
            { option: 'borderColor', value: '#FFFFFF' },
            { option: 'color', value: 'white' }
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
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.site-nav__link');
    const mobileLinks = document.querySelectorAll('.mobile-menu__item');
    // console.log(currentLocation.includes('read'));
    if (currentLocation.includes('favorite')) {
        toggleNavigationMenuClasses(navLinks, mobileLinks, 'favorite');
    } else if (currentLocation.includes('read')) {
        toggleNavigationMenuClasses(navLinks, mobileLinks, 'read');
    } else {
        toggleNavigationMenuClasses(navLinks, mobileLinks, 'home');
    }
    if (theme === 'dark') {
        onToglerClick();
        return;
    }
}

function toggleNavigationMenuClasses(navLinks, mobileNavLinks, page) {
    [...navLinks].forEach((item, index) => {
        if (item.textContent.toLowerCase() === page) {
            item.classList.add('site-nav__link--active');
            mobileNavLinks[index].classList.add('mobile-menu__item--active');
            mobileNavLinks[index]
                .querySelector('.mobile-menu__link')
                .classList.add('mobile-menu__link--active');
            mobileNavLinks[index]
                .querySelector('.mobile-menu__item-svg')
                .classList.add('mobile-menu__item-svg--active');
            mobileNavLinks[index]
                .querySelector('.mobile-menu__item-next-svg')
                ?.classList.replace(
                    'mobile-menu__item-next-svg',
                    'mobile-menu__item-next-svg--active'
                );
            return;
        }
        item.classList.remove('site-nav__link--active');
        mobileNavLinks[index].classList.remove('mobile-menu__item--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__link')
            .classList.remove('mobile-menu__link--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__item-svg')
            .classList.remove('mobile-menu__link--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__item-svg')
            .classList.remove('mobile-menu__item-svg--active');
        mobileNavLinks[index]
            .querySelector('.mobile-menu__item-next-svg--active')
            ?.classList.replace(
                'mobile-menu__item-next-svg--active',
                'mobile-menu__item-next-svg'
            );
    });
}

function changeRefStyle(ref, ...styles) {
    styles.forEach(item => {
        ref.style[item.option] = item.value;
    });
}
