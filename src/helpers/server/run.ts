import http from 'http';
import { Express } from 'express';
import Logging from '../logger/logger';

export const run = (app: Express, port: number) => {
    try {
        http.createServer(app).listen(port, () => {
            Logging.info(`Server is running on port ${port}`, 'Run Server');
        });
    } catch (error) {
        Logging.error(`${error}`);
    }
};
