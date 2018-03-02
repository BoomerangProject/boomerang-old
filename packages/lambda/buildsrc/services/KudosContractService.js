"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _truffleContract = require("truffle-contract");

var _truffleContract2 = _interopRequireDefault(_truffleContract);

var _Kudos = require("ethereum/build/contracts/Kudos.json");

var _Kudos2 = _interopRequireDefault(_Kudos);

var _Web3Provider = require("./Web3Provider");

var _Web3Provider2 = _interopRequireDefault(_Web3Provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const KudosContract = (0, _truffleContract2.default)(_Kudos2.default);
KudosContract.setProvider(_Web3Provider2.default);

class KudosContractService {

  getInstance() {
    return _asyncToGenerator(function* () {

      const instance = yield KudosContract.at("0xCb6e15D2D929bedDc9F98DE36F9Fa6ac223d0453");
      return instance;
    })();
  }

  isBusiness() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const instance = yield _this.getInstance();
      const isBusiness = yield instance.isBusiness("0xdcee2f1da7262362a962d456280a928f4f90bb5e");
      return isBusiness;
    })();
  }

  registerAsBusiness() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const instance = yield _this2.getInstance();
      yield instance.registerAsBusiness({ from: "0xdcee2f1da7262362a962d456280a928f4f90bb5e" });
    })();
  }
}

exports.default = new KudosContractService();