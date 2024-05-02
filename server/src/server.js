import path from 'node:path';
import express from 'express';
import 'dotenv/config';
import connectDB from '../config/db.config.js';
import router from '../routes/eventRoutes.js';
import savedRouter from '../routes/savedRouter.js';
import authRoutes from '../routes/authRoutes.js';
import cors from 'cors';
connectDB(); // call and run connectDB func

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
// const port = 3000;

app.use(express.static(path.resolve('client/dist')));
app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// // Direct login requests with '/auth' to router (see authRoutes.js)
app.use('/auth', authRoutes);

// direct requests with '/user/savedEvents/:username' to savedRouter (see savedRoutes.js)
app.use('/user/savedEvents', savedRouter, (req, res) => {
  if (!res.locals.savedEvents) {
    return res.status(404).send('No saved results found');
  }
  res.status(200).json(res.locals.savedEvents);
});

app.use('/api', router); // direct requests with '/api' to router (see eventRoutes.js)

app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/dist/index.html'));
});

// Unknown/404 route handler
app.use('*', (req, res) => {
  console.log('404 error handler triggered.');
  res.status(404).json('Page not found.');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(`Error Handling Middleware: ${errorObj.log}`);
  console.error(`Error details: ${err.message}`);
  console.error('error stack', err.stack); // stack trace
  if (!res.headersSent) {
    return res.status(errorObj.status).json(errorObj.message);
  } else {
    console.log('Attempt to send a response when headers already sent.');
  }
});

if (process.env.TEST_ENV !== 'backend') {
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
}

export default app;
