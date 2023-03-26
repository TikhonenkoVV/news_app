import { userLogin } from './autorization';
import { save } from './storage';

export const normalize = result => {
    const res = result.map(
        ({ published_date, section, abstract, media, title, url }) => {
            let imgUrl = '';
            let favorite = '';
            let readMore = '';
            const arrImg = media[0];
            if (arrImg !== undefined) {
                imgUrl = arrImg['media-metadata'][2].url;
            }
            return {
                favorite,
                readMore,
                imgUrl,
                title,
                section,
                abstract,
                published_date,
                url,
            };
        }
    );

    save('bite-search', res);

    return res;
};
