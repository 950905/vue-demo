const flightsModels = require('../models/manager.js');

exports.render = function(req, res) {

  const flightsModel = flightsModels(req, 'index');

  res.render(flightsModel.viewPath, {
        acceptLanguage: flightsModel.acceptLanguage
    });

};
