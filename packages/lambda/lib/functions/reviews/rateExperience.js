'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KudosContractService = require('../../services/KudosContractService');

var _KudosContractService2 = _interopRequireDefault(_KudosContractService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event, context, callback) {
    var queryStringParameters, businessAddress, businessRating, businessReviewText, workerAddress, workerRating, workerReviewText, ipfsHash, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryStringParameters = event.queryStringParameters;
            businessAddress = queryStringParameters["businessAddress"];
            businessRating = queryStringParameters["businessRating"];
            businessReviewText = queryStringParameters["businessReviewText"];
            workerAddress = queryStringParameters["workerAddress"];
            workerRating = queryStringParameters["workerRating"];
            workerReviewText = queryStringParameters["workerReviewText"];
            ipfsHash = addExperienceToIpfs(businessRating, businessReviewText, workerRating, workerReviewText);
            response = {
              statusCode: 200,
              body: JSON.stringify({
                message: 'businessAddress = ' + businessAddress + '\n      businessRating = ' + businessRating + '\n      workerAddress = ' + workerAddress + '\n      workerRating = ' + workerRating,
                input: event
              })
            };


            callback(null, response);

          case 10:
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

/*
    await kudos.rateExperience( signature.v,
                                signature.r,
                                signature.s,
                                business,
                                5,
                                worker,
                                5,
                                ipfsHashInBytes("QmdXuenGKXGmSBdFZdfWqcHzZuDKiQ8eUZ1h5ZQHGNdVLy"),
                                {from: user});
 */