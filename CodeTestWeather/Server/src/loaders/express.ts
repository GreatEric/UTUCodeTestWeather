import express from 'express';
import bodyParser from 'body-parser';
import routes from '../api';
import config from '../config';

/**
 * Express config module
 * 1.Config health check endpoint
 * 2.Configure to allow cross-domain access
 * 3.Configure requst body json transform
 * 4.Load api routes
 * 4.Configure error handlers
 *
 * @author: Eric
 * @date 15/04/2021 9:01 pm
 */
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');



  // transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
