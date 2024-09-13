import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import NodeCache from 'node-cache';
import requestIp from 'request-ip';
import { mainRouter } from '../../routers/main';
import Logging, { logger } from '../logger/logger';
import { errorHandler } from '../errors/error.handler';

const router = express();

export const cache = new NodeCache({ stdTTL: 60 * 60 * 24 }); // 24 hrs

export const createServer = async () => {
    try {
        /** Cors */
        router.use(
            cors({
                origin: true,
                credentials: true,
            })
        );

        /** Helmet */
        router.use(helmet());

        /** Logger */
        router.use(logger);

        /** BodyParser */
        router.use(
            bodyParser.json({
                limit: '500mb',
            })
        );

        router.use(
            bodyParser.urlencoded({
                limit: '500mb',
                extended: true,
            })
        );

        /** Body parser */
        router.use(bodyParser.json());

        router.use(requestIp.mw());

        /** Routing */
        router.use('/api', mainRouter);

        /** Health check */
        router.get('/ping', (req, res) => {
            return res.status(200).json({
                message: 'Pong!',
            });
        });

        /** Error handler */
        router.use(errorHandler);

        return router;
    } catch (error) {
        Logging.error(`${error}`);
    }
};
