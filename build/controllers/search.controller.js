"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = void 0;

var _utils = require("../utils");

var _dev = _interopRequireDefault(require("../models/dev.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// GET /search
var index = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, latitude, longitude, techs, techsArray, devs;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$query = req.query, latitude = _req$query.latitude, longitude = _req$query.longitude, techs = _req$query.techs;

            if (!(!techs || !latitude || !longitude)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.json({
              message: "Parâmetros em formato inválido."
            }));

          case 4:
            techsArray = (0, _utils.parseArrayAsString)(techs);
            _context.next = 7;
            return _dev["default"].find({
              techs: {
                $in: techsArray
              },
              location: {
                $near: {
                  $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                  },
                  $maxDistance: 10000
                }
              }
            });

          case 7:
            devs = _context.sent;
            return _context.abrupt("return", res.json({
              devs: devs
            }));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).json({
              message: _context.t0
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function index(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.index = index;