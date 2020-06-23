
module.exports = function(app) {

  let index = require('../controllers/index');

  // 首页
  app.get('/', index.render);
  app.get('/about', index.render);
};

