const express = require('express')
const { RateRouter } = require('../routes/rate.route')
const { SubscriptionRouter } = require('../routes/subscription.route')
const mongoose = require('mongoose')
require('./config/cronJob')

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/rate', RateRouter);
app.use('/subscribe', SubscriptionRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

if (process.env.MONGODB_URI == null) throw Error('MONGODB_URI can\'t be empty')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });
}).catch(err => {
  console.error('Connection error', err.message)
})
