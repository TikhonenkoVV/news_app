export const checkCurrentLocation = () => {
    const currentLocation = window.location.pathname;
    if (currentLocation.includes('favorite')) return 'favorite';
    if (currentLocation.includes('favorite')) return 'read';
    return 'index';
};
