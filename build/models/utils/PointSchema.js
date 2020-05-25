"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var PointSchema = new _mongoose.Schema({
  type: {
    type: String,
    "enum": ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});
var _default = PointSchema;
exports["default"] = _default;