import { env } from '../../configs/environment.config';
import { SearchQueryParans, TopHeadlinesQueryParans } from '../../types/gnews.types';

export const getSearchUrl = (
    queryParams: SearchQueryParans | TopHeadlinesQueryParans,
    scope: 'search' | 'headlines'
): string => {
    try {
        const baseUrl = env.gnews.baseUrl;
        const endpoint = scope === 'search' ? '/search?' : '/top-headlines?';
        const authQuery = `&apikey=${env.gnews.apiKey}`;
        const searchQuery = queryParams.q ? `q=${queryParams.q}` : '';
        const maxQuery = queryParams.max ? `&max=${queryParams.max}` : '';
        const langQuery = queryParams.lang ? `&lang=${queryParams.lang}` : '';
        const countryQuery = queryParams.country ? `&country=${queryParams.country}` : '';
        const inQuery = queryParams.in ? `&in=${queryParams.in}` : '';
        const nullableQuery = queryParams.nullable ? `&nullable=${queryParams.nullable}` : '';
        const fromQuery = queryParams.from ? `&from=${queryParams.from}` : '';
        const toQuery = queryParams.to ? `&to=${queryParams.to}` : '';
        const sortbyQuery = queryParams.sortby ? `&sortby=${queryParams.sortby}` : '';
        const categoryQuery =
            'category' in queryParams && queryParams.category
                ? `&category=${queryParams.category}`
                : '';

        return (
            baseUrl +
            endpoint +
            searchQuery +
            maxQuery +
            langQuery +
            countryQuery +
            inQuery +
            nullableQuery +
            fromQuery +
            toQuery +
            sortbyQuery +
            categoryQuery +
            authQuery
        );
    } catch (error) {
        throw error;
    }
};
