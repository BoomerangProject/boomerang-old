'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Database = require("../../services/database/Database");

var _Database2 = _interopRequireDefault(_Database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    const nonceValue = yield _Database2.default.getNonceForAddingUserToRegistry(event.queryStringParameters.businessAddress);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        nonce: nonceValue
      })
    };

    callback(null, response);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();