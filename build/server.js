"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var devController = _interopRequireWildcard(require("./controllers/dev.controller"));

var searchController = _interopRequireWildcard(require("./controllers/search.controller"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 3333 : _process$env$PORT; // ref: https://mongoosejs.com/docs/deprecations.html

_mongoose["default"].set("useCreateIndex", true);

_mongoose["default"].connect("mongodb+srv://master:051710master@cluster0-rkknr.mongodb.net/week10?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})["catch"](function (err) {
  console.log(err);
});

app.use(_express["default"].json());
/**
 * Application routes
 */

app.get("/devs", devController.index);
app.post("/devs", devController.store);
app.put("/devs/:id", devController.update);
app["delete"]("/devs/:id", devController.destroy);
app.get("/search", searchController.index);
app.listen(PORT, function () {
  console.log("Server rodando na porta: ".concat(PORT));
});