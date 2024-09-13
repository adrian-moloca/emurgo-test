import { NextFunction, Request, Response } from 'express';
import { cache } from '../server/create';

export const cacheMiddleware = async (req: Request, res: any, next: NextFunction) => {
    try {
        const key = req.url;

        const cachedRes = cache.get(key);

        if (cachedRes) {
            const parsed = JSON.parse(cachedRes as string);
            return res.status(200).json(parsed);
        }

        res.originalSend = res.send;
        res.send = async (body: string) => {
            try {
                await res.originalSend(body);

                if (res.statusCode === 200) {
                    cache.set(key, body, 60 * 60 * 24);
                }
            } catch (error) {
                return next(error);
            }
        };

        next();
    } catch (error) {
        return next(error);
    }
};
