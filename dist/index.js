'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pagination = exports.DataColumn = exports.DataTable = undefined;

var _DataTable = require('./lib/DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _DataColumn = require('./lib/DataColumn');

var _DataColumn2 = _interopRequireDefault(_DataColumn);

var _Pagination = require('./lib/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  DataTable: _DataTable2.default,
  DataColumn: _DataColumn2.default,
  Pagination: _Pagination2.default
};
exports.DataTable = _DataTable2.default;
exports.DataColumn = _DataColumn2.default;
exports.Pagination = _Pagination2.default;