

module.exports = function(req, viewPagePath) {

  let acceptLanguage = req.locale.toUpperCase();

  let viewPath = viewPagePath;

  return {
    viewPath: viewPath,
    acceptLanguage: acceptLanguage
  };

};
