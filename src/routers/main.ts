import { Router } from 'express';
import { articlesRouter } from './articles';
import { cacheMiddleware } from '../helpers/cache/helpers';

export const mainRouter = Router();

mainRouter.use('/articles', cacheMiddleware, articlesRouter);
