import dotenv from 'dotenv';
import Logging from './helpers/logger/logger';
import { createServer } from './helpers/server/create';
import { run } from './helpers/server/run';

dotenv.config();

(async () => {
    try {
        const app = await createServer();

        if (app) run(app, Number(process.env.PORT));
    } catch (error) {
        Logging.error(`${error}`);
    }
})();
