"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _truffleContract = require("truffle-contract");

var _truffleContract2 = _interopRequireDefault(_truffleContract);

var _Kudos = require("../../buildsrc/ethereum/build/contracts/Kudos.json");

var _Kudos2 = _interopRequireDefault(_Kudos);

var _Web3Provider = require("./Web3Provider");

var _Web3Provider2 = _interopRequireDefault(_Web3Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KudosContract = (0, _truffleContract2.default)(_Kudos2.default);
KudosContract.setProvider(_Web3Provider2.default);

var KudosContractService = function () {
  function KudosContractService() {
    _classCallCheck(this, KudosContractService);
  }

  _createClass(KudosContractService, [{
    key: "getInstance",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var instance;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return KudosContract.at("0xCb6e15D2D929bedDc9F98DE36F9Fa6ac223d0453");

              case 2:
                instance = _context.sent;
                return _context.abrupt("return", instance);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInstance() {
        return _ref.apply(this, arguments);
      }

      return getInstance;
    }()
  }, {
    key: "isBusiness",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var instance, isBusiness;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.getInstance();

              case 2:
                instance = _context2.sent;
                _context2.next = 5;
                return instance.isBusiness("0xdcee2f1da7262362a962d456280a928f4f90bb5e");

              case 5:
                isBusiness = _context2.sent;
                return _context2.abrupt("return", isBusiness);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function isBusiness() {
        return _ref2.apply(this, arguments);
      }

      return isBusiness;
    }()
  }, {
    key: "registerAsBusiness",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var instance;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.getInstance();

              case 2:
                instance = _context3.sent;
                _context3.next = 5;
                return instance.registerAsBusiness({ from: "0xdcee2f1da7262362a962d456280a928f4f90bb5e" });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function registerAsBusiness() {
        return _ref3.apply(this, arguments);
      }

      return registerAsBusiness;
    }()
  }]);

  return KudosContractService;
}();

exports.default = new KudosContractService();