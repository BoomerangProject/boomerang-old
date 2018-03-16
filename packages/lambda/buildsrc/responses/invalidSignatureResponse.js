"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const invalidSignatureResponse = {
  statusCode: 401,
  body: JSON.stringify({
    message: `invalid signature`
  })
};

exports.default = invalidSignatureResponse;