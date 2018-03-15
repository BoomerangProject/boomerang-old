'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Database = require("../../services/database/Database");

var _Database2 = _interopRequireDefault(_Database);

var _okayResponse = require("../../responses/okayResponse");

var _okayResponse2 = _interopRequireDefault(_okayResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const userAddress = function (event) {

  return event.queryStringParameters.userAddress;
};

const experienceMetadata = function (event) {

  return JSON.parse(event.body);
};

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event, context, callback) {

    _Database2.default.addPendingReview(userAddress(event), experienceMetadata(event));

    yield _Database2.default.incrementNonceForAddingUserToRegistry(event.queryStringParameters.userAddress);

    callback(null, _okayResponse2.default);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();