'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KudosContractService = require('../services/KudosContractService');

var _KudosContractService2 = _interopRequireDefault(_KudosContractService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// let registerBusiness = async () => {
//
//   await KudosContractService.registerAsBusiness();
// };

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    // await registerBusiness();

    // await KudosContractService.registerAsBusiness();

    var isBusiness = yield _KudosContractService2.default.isBusiness();

    // test
    // test2

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `it will be ${isBusiness}`,
        input: event
      })
    };

    callback(null, response);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();