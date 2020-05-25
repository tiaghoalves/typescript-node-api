"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseArrayAsString = void 0;

var parseArrayAsString = function parseArrayAsString(arrayAsString) {
  return arrayAsString.split(",").map(function (item) {
    return item.trim();
  });
};

exports.parseArrayAsString = parseArrayAsString;