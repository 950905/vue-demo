const fs = require('fs');
// const multer = require('multer');
const rp = require('request-promise');

const logger = require('../config/log').logger;

// const upload = multer({ dest: 'src/uploads/' });

const proxyRequest = require('../models/proxyRequest');
const { OUTSIDEAPI, SOURCEAPI } = require('../lib/api-pool.js');

const deleteFolderRecursive = function(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
  }
};

const logOption = (object) => {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
    for (let key in object) {
      logger.info(key, object[key])
    }
  }
}

const handleErr = (err) => {
  // TODO:do something
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod') {
    logger.error('error', err)
  }
};

const handleRes = (res, data, uploadImg) => {

  if (Object.prototype.toString.call(data) === '[object String]') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      res.json({ resultCode: 500, errorMessage: '返回并不是json格式数据' });
      res.end();
      return;
    }
  }
  if (uploadImg) {
    deleteFolderRecursive('src/uploads')
  }
  res.json(data);
  res.end();
};

module.exports = function(app) {
  // 获取保单列表
  app.post(SOURCEAPI.getOrderList, (req, res) => {

    const url = `${OUTSIDEAPI.getOrderList}`;
    const options = proxyRequest.postModels(req, 'json', url, false);
    rp(options)
      .then(parsedBody => handleRes(res, parsedBody.body))
      .catch(err => handleErr(err));

  });

  // 获取用户信息
  app.get(SOURCEAPI.getUserInfo, (req, res) => {
    const url = `${OUTSIDEAPI.getUserInfo}`;
    const options = proxyRequest.getModels(req, 'json', url, true);
    logOption({
      'url': url,
      'headers': req.headers,
      'options': options
    })
    rp(options)
      .then(parsedBody => handleRes(res, parsedBody))
      .catch(err => handleErr(err));

  });

  // 获取订单详情
  app.get(SOURCEAPI.getOrderDetail, (req, res) => {

    const url = `${OUTSIDEAPI.getOrderDetail}/${req.params.orderCode}`;
    const options = proxyRequest.getModels(req, 'json', url, true);
    rp(options)
      .then(parsedBody => handleRes(res, parsedBody))
      .catch(err => handleErr(err));

  });
};
