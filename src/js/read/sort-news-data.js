export const sortReadNewsData = () => {
    const savedLocalNews = localStorage.getItem('user-gallery');
    const filterArray = JSON.parse(savedLocalNews).filter(({ readMore }) => readMore !== '');
    const groupedByKey = filterArray.reduce((acc, obj) => {
        const key = obj.key;
        const collection = acc.get(key);
        if (!collection) {
          acc.set(key, [obj]);
        } else {
          collection.push(obj);
        }
        return acc;
      }, new Map());
      const result = Array.from(groupedByKey.values());
    return result;
};