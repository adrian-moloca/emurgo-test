import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { JoiError } from '../errors/joiError';
import { BadRequestError } from '../errors/400error';

export const query = (queries: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await queries.validateAsync(req.query).catch((error) => {
                throw new JoiError(error);
            });

            next();
        } catch (error) {
            next(error);
        }
    };
};

const allowedLanguages = [
    'ar',
    'zh',
    'nl',
    'en',
    'fr',
    'de',
    'el',
    'he',
    'hi',
    'it',
    'ja',
    'ml',
    'mr',
    'no',
    'pt',
    'ro',
    'ru',
    'es',
    'sv',
    'ta',
    'te',
    'uk',
];

const allowedCountries = [
    'au',
    'br',
    'ca',
    'cn',
    'eg',
    'fr',
    'de',
    'gr',
    'hk',
    'in',
    'ie',
    'il',
    'it',
    'jp',
    'nl',
    'no',
    'pk',
    'pe',
    'ph',
    'pt',
    'ro',
    'ru',
    'sg',
    'es',
    'se',
    'ch',
    'tw',
    'ua',
    'gb',
    'us',
];

const timeFormat = new RegExp(
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d):([0-5]\d)(Z|[+-](0[0-9]|1[0-4]):([0-5]\d))$/
);

const commonQueryParams = {
    max: Joi.number().integer().positive().min(1).max(10).optional(),
    lang: Joi.string()
        .valid(...allowedLanguages)
        .optional(),
    country: Joi.string()
        .valid(...allowedCountries)
        .optional(),
    in: Joi.string()
        .custom((value, helpers) => {
            const fields: string[] = value.split(',');
            const allowedFields = ['title', 'description', 'content'];

            const isValid = fields.every((field) => allowedFields.includes(field.trim()));

            if (!isValid) {
                return helpers.error('Invalid options. Try [title, description, content]');
            }

            return value;
        })
        .optional(),
    nullable: Joi.string()
        .custom((value, helpers) => {
            const fields: string[] = value.split(',');
            const allowedFields = ['description', 'content', 'image'];

            const isValid = fields.every((field) => allowedFields.includes(field.trim()));

            if (!isValid) {
                return helpers.error('Invalid options. Try [description, content, image]');
            }

            return value;
        })
        .optional(),
    from: Joi.string().pattern(timeFormat).optional(),
    to: Joi.string().pattern(timeFormat).optional(),
    sortby: Joi.string().valid('publishedAt', 'relevance').optional(),
};

export const queries = {
    articles: {
        search: Joi.object({ ...commonQueryParams, q: Joi.string().required() }),
        headlines: Joi.object({
            ...commonQueryParams,
            category: Joi.string()
                .valid(
                    'general',
                    'world',
                    'nation',
                    'business',
                    'technology',
                    'entertainment',
                    'sports',
                    'science',
                    'health'
                )
                .optional(),
            q: Joi.string().optional(),
        }),
    },
};
