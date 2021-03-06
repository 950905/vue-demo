const fs = require('fs');

exports.postModels = function(req, type, url, decodeBase64) {

  let bodyBase64;
  let jsonRequest;
  let isJson = true;

  if (decodeBase64) {
    bodyBase64 = new Buffer(req.body.jsonFlightsRequest, 'base64');
    jsonRequest = JSON.parse(bodyBase64.toString());
  } else {
    jsonRequest = req.body;
  }

  if (type !== 'json') {
    isJson = false;
  }

  let options;

  switch (type) {
    case 'form':
      options = {
        method: 'POST',
        uri: url,
        form: req.body,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',// Set automatically
          'cookie': req.headers.cookie
        },
        simple: false
      };
      break;

    case 'formData':
      options = {
        method: 'POST',
        uri: url,
        formData: {
          path: req.body.path,
          file: {
            value: fs.createReadStream(req.file.path),
            options: {
              fileName: req.body.name,
              contentType: req.body.type
            }
          }
        },
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      break;

    default:
      options = {
        method: 'POST',
        uri: url,
        body: jsonRequest,
        resolveWithFullResponse: true,
        json: isJson
      };
      break;
  }

  return options;

};

exports.getModels = function(req, type, url, decodeBase64, cookies) {

  let bodyBase64;
  let jsonRequest;
  let options;

  // if (!decodeBase64) {

    options = {
      method: 'GET',
      uri: url,
      headers: {
        'Content-Type': 'application/json',
        'cookie': req.headers.cookie
      }
      // body: jsonRequest,
      // json: true // Automatically stringifies the body to JSON
    }

  // } else {

  //   options = {
  //     method: 'GET',
  //     uri: url,
  //     // headers: {
  //     //   'User-Agent': 'Request-Promise'
  //     // },
  //     // json: true // Automatically stringifies the body to JSON
  //   }

  // }

  if (cookies) {
    options = {
      method: 'GET',
      uri: url,
      headers: {
        'Content-Type': 'application/json',
        'cookie': req.headers.cookie
      },
      simple: false,
      json: true
    }
  }


  return options;

};
