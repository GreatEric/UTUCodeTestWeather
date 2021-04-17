import config from './config';
import express from 'express';
import Logger from './loaders/logger';
import fs from 'fs';
import path from "path";
import cors from 'cors';

/**
 * Application entry
 *
 * @author: Eric
 * @date 15/04/2021 8:35 pm
 */
async function startServer() {
    const app = express();

    // Enable Cross Origin
    app.use(cors());

    await require('./loaders').default({ expressApp: app });

    app.listen(config.port, () => {
        const bannerPath = path.join(__dirname, './banner.txt');
        Logger.info(fs.readFileSync(bannerPath,'utf8'));

        Logger.info(`✌ API Application Running at: http://localhost:${config.port}`);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });
}

startServer();