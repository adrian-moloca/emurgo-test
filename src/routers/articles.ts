import { Router } from 'express';
import { controller } from '../controllers/controller';
import { joi } from '../helpers/joi/joi';

export const articlesRouter = Router();

articlesRouter.get('/search', joi.query(joi.queries.articles.search), controller.articles.search);
articlesRouter.get(
    '/headlines',
    joi.query(joi.queries.articles.headlines),
    controller.articles.topHealines
);
