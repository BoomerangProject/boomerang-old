"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _addPendingReview = require("./addPendingReview");

var _addPendingReview2 = _interopRequireDefault(_addPendingReview);

var _getNonceForAddingUserToRegistry = require("./getNonceForAddingUserToRegistry");

var _getNonceForAddingUserToRegistry2 = _interopRequireDefault(_getNonceForAddingUserToRegistry);

var _incrementNonceForAddingUserToRegistry = require("./incrementNonceForAddingUserToRegistry");

var _incrementNonceForAddingUserToRegistry2 = _interopRequireDefault(_incrementNonceForAddingUserToRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const database = {

  addPendingReview: _addPendingReview2.default,
  getNonceForAddingUserToRegistry: _getNonceForAddingUserToRegistry2.default,
  incrementNonceForAddingUserToRegistry: _incrementNonceForAddingUserToRegistry2.default
};

exports.default = database;