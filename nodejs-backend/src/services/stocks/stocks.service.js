const { Stocks } = require('./stocks.class');
const createModel = require('../../models/stocks.model');
const hooks = require('./stocks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/stocks', new Stocks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('stocks');

  service.hooks(hooks);
};