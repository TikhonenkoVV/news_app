import axios from 'axios';

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'SSNA0jjrClnHvEkCXo73ibZs84EuKpO5';


export const fetchPopularArticles = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/mostpopular/v2/viewed/1.json?`,
            {
                params: {
                    'api-key': API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchSearchArticles = async (PAGE_VALUE, searchTermin) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/search/v2/articlesearch.json`,
            {
                params: {
                    'api-key': API_KEY,
                    page: PAGE_VALUE,
                    q: searchTermin,
                    sort: 'relevance',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchCategoryArticles = async () => {
    try {
        const { data } = await axios.get(
            `${BASE_URL}/news/v3/content/section-list.json`,
            {
                params: {
                    'api-key': API_KEY,
                },
            }
        );
        return data;
    } catch (error) {
        console.log(error);
    }
};
