"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroy = exports.update = exports.store = exports.index = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _dev = _interopRequireDefault(require("../models/dev.model"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// GET /devs
var index = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var devs;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dev["default"].find({});

          case 3:
            devs = _context.sent;
            res.json(devs);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).json({
              error: _context.t0.message
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // POST /devs


exports.index = index;

var store = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$body, github_username, techs, latitude, longitude, hasDev, apiResponse, _apiResponse$data, login, avatar_url, bio, name, techsArray, location, dev;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$body = req.body, github_username = _req$body.github_username, techs = _req$body.techs, latitude = _req$body.latitude, longitude = _req$body.longitude;
            _context2.next = 4;
            return _dev["default"].findOne({
              github_username: github_username
            });

          case 4:
            hasDev = _context2.sent;

            if (!hasDev) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: "Dev já cadastrado"
            }));

          case 7:
            _context2.next = 9;
            return _axios["default"].get( // eslint-disable-next-line camelcase
            "https://api.github.com/users/".concat(github_username));

          case 9:
            apiResponse = _context2.sent;
            // eslint-disable-next-line camelcase
            _apiResponse$data = apiResponse.data, login = _apiResponse$data.login, avatar_url = _apiResponse$data.avatar_url, bio = _apiResponse$data.bio, name = _apiResponse$data.name;
            techsArray = (0, _utils.parseArrayAsString)(techs);
            location = {
              type: "Point",
              coordinates: [longitude, latitude]
            };
            _context2.next = 15;
            return _dev["default"].create({
              name: name || login,
              github_username: github_username,
              bio: bio,
              avatar_url: avatar_url,
              techs: techsArray,
              location: location
            });

          case 15:
            dev = _context2.sent;
            return _context2.abrupt("return", res.json(dev));

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 19]]);
  }));

  return function store(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}(); // PUT /devs/:id


exports.store = store;

var update = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var id, devFinded, _req$body2, name, techs, bio, avatar_url, latitude, longitude, location, query, options, doc, devUpdated;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _context3.next = 4;
            return _dev["default"].findOne({
              _id: id
            });

          case 4:
            devFinded = _context3.sent;
            _req$body2 = req.body, name = _req$body2.name, techs = _req$body2.techs, bio = _req$body2.bio, avatar_url = _req$body2.avatar_url, latitude = _req$body2.latitude, longitude = _req$body2.longitude;

            if (devFinded) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              message: "Dev não existente na base de dados."
            }));

          case 8:
            location = {
              type: "Point",
              coordinates: [longitude, latitude]
            };
            query = {
              _id: id
            };
            options = {
              "new": true
            };
            doc = {
              name: name || devFinded.name,
              bio: bio || devFinded.bio,
              // eslint-disable-next-line camelcase
              avatar_url: avatar_url || devFinded.avatar_url,
              techs: techs ? (0, _utils.parseArrayAsString)(techs) : devFinded.techs,
              location: longitude || latitude ? location : devFinded.location
            };
            _context3.next = 14;
            return _dev["default"].findOneAndUpdate(query, doc, options);

          case 14:
            devUpdated = _context3.sent;
            return _context3.abrupt("return", res.status(devUpdated ? 200 : 400).json(devUpdated || "Dev não encontrado."));

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function update(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}(); // DELETE /devs/:id


exports.update = update;

var destroy = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var id, devDeleted;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _dev["default"].findOneAndDelete({
              _id: id
            });

          case 4:
            devDeleted = _context4.sent;

            if (!devDeleted) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(200).json(devDeleted));

          case 9:
            return _context4.abrupt("return", res.status(400).json({
              message: "Dev não encontrado."
            }));

          case 10:
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function destroy(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.destroy = destroy;