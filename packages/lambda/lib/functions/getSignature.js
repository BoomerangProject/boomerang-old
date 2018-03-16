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

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, context, callback) {
    var isBusiness, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _KudosContractService2.default.isBusiness();

          case 2:
            isBusiness = _context.sent;


            // test
            // test2

            response = {
              statusCode: 200,
              body: JSON.stringify({
                message: 'it will be ' + isBusiness,
                input: event
              })
            };


            callback(null, response);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();