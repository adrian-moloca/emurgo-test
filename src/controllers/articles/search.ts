import { NextFunction, Request, Response } from 'express';
import { getSearchUrl } from '../../helpers/api/helpers';
import { SearchQueryParans, SearchResponseData } from '../../types/gnews.types';

export const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as SearchQueryParans;

        const url = getSearchUrl(queryParams, 'search');

        fetch(url)
            .then((response) => response.json())
            .then((data: SearchResponseData) => {
                const articles = data.articles;

                return res.status(200).json({
                    articles,
                });
            });
    } catch (error) {
        return next(error);
    }
};
