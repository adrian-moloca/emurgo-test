import { Request, Response, NextFunction } from 'express';
import { TopHeadlinesQueryParans } from '../../types/gnews.types';
import { getSearchUrl } from '../../helpers/api/helpers';

export const topHealines = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as TopHeadlinesQueryParans;

        const url = getSearchUrl(queryParams, 'headlines');

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const headlines = data.headlines;

                return res.status(200).json({
                    data,
                });
            });
    } catch (error) {
        return next(error);
    }
};
