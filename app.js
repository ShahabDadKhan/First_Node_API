const express = require('express');
const morgan = require('morgan');

const { get } = require('http');
const app = express();

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');

// 1) Middlewares
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  // This will run only if we are in development process
  app.use(morgan('dev'));
}
// Basically in the above code, we set up morgan, and since it’s a middleware,
// So we used the .use() method to tell express to use that as a middleware in our app.
// Other than that we have used ‘dev’ as a preset. Some other presets available are combined, common, short, tiny.
// Each preset returns different information.

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// We define the Global middleware on the top before anyother middlewear
app.use((req, res, next) => {
  console.log('Hi aya hu lekr middlewear se');
  // Important to excecute the next function otherwise it will stuck in endless loop
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
// Creating Route for each resource
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Patch Request
// app.patch('/api/v1/tours/:id',editTour)

// Post Request
// app.post('/api/v1/tours', addTour)

// Delete Request
// app.delete('/api/v1/tours/:id', deleteTour)

module.exports = app;
