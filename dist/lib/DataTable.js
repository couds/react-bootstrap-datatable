'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = (function (_React$Component) {
  _inherits(DataTable, _React$Component);

  function DataTable(props) {
    _classCallCheck(this, DataTable);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataTable).call(this, props));

    _initialiseProps.call(_this);

    var self = _this;
    self.children = [];
    _react2.default.Children.map(_this.props.children, function (child) {
      if (child.type === _Pagination2.default) {
        self.pagination = child;
      } else {
        self.children.push(child);
      }
    });

    _this.state = {
      data: props.data,
      sort: {
        field: null,
        asc: false
      },
      pagination: {
        activePage: self.pagination.props.activePage,
        itemPerPage: self.pagination.props.itemPerPage
      },
      search: {}
    };
    return _this;
  }

  _createClass(DataTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var paginator = '',
          children = [],
          Paginator = undefined,
          headers = [];

      this.children.forEach(function (child, i) {

        children.push(child);
        var props = {
          key: i,
          md: child.props.md,
          sortable: child.props.sortable,
          searchable: child.props.searchable,
          currentSearch: self.state.search[child.props.field],
          field: child.props.field,
          onSearch: _this2.search,
          isSortField: child.props.field === self.state.sort.field,
          asc: self.state.sort.asc,
          onSort: _this2.sortBy,
          searchOptions: child.props.searchOptions,
          dtStyle: _this2.props.dtStyle
        };

        headers.push(_react2.default.createElement(
          _Header2.default,
          props,
          child.props.children || child.props.title
        ));
      });

      var data = this.props.data.filter(function (row) {
        for (var i = 0, keys = Object.keys(_this2.state.search), j = keys.length; i < j; i++) {
          var field = keys[i];
          var value = _this2.state.search[keys[i]];

          if (value && row[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) === -1) {
            return false;
          }
        }
        return true;
      });

      if (self.pagination) {

        Paginator = _react2.default.cloneElement(self.pagination, {
          handleSelect: self.handleSelect,
          activePage: self.state.pagination.activePage,
          items: Math.ceil(data.length / this.state.pagination.itemPerPage)
        });
      }

      var body = [];

      data = data.sort(function (a, b) {
        if (a[_this2.state.sort.field] < b[_this2.state.sort.field]) {
          return _this2.state.sort.asc ? -1 : 1;
        }

        if (a[_this2.state.sort.field] > b[_this2.state.sort.field]) {
          return _this2.state.sort.asc ? 1 : -1;
        }
        return 0;
      });

      var start = 0;
      var end = data.length;

      if (Paginator) {
        start = (this.state.pagination.activePage - 1) * this.state.pagination.itemPerPage;
        end = start + this.state.pagination.itemPerPage;
      }

      var _loop = function _loop(i, j) {
        var row = data[i];

        body.push(_react2.default.createElement(
          'tr',
          { key: 'row' + i },
          children.map(function (child, i) {
            if (!row) {
              return _react2.default.createElement(
                'td',
                { key: i },
                _react2.default.createElement(
                  'span',
                  { style: { opacity: 0 } },
                  'N/A'
                )
              );
            }
            var text = row[child.props.field];
            if (child.props.transform) {
              text = child.props.transform(text, row, i);
            }
            return _react2.default.createElement(
              'td',
              { key: i, style: { verticalAlign: 'middle' } },
              text
            );
          })
        ));
      };

      for (var i = start, j = end; i < j; i++) {
        _loop(i, j);
      }

      var headerStyle = {};
      switch (this.props.dtStyle) {
        case 'dark':
          headerStyle = {
            backgroundColor: '#6c828b',
            color: '#FFF'
          };
          break;

      }
      return _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(
          _reactBootstrap.Table,
          { striped: true, bordered: true, condensed: true, hover: true },
          _react2.default.createElement(
            'thead',
            { style: headerStyle },
            _react2.default.createElement(
              'tr',
              null,
              headers
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            body
          )
        ),
        _react2.default.createElement(
          'div',
          { style: { marginTop: '-20px', textAlign: 'center' } },
          Paginator
        )
      );
    }
  }]);

  return DataTable;
})(_react2.default.Component);

DataTable.propTypes = {
  data: _react2.default.PropTypes.array.isRequired,
  pagination: _react2.default.PropTypes.bool,
  sizePerPage: _react2.default.PropTypes.number
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.sortBy = function (field, sortable) {

    if (!sortable) {
      return;
    }
    var self = _this3;
    return function () {
      self.setState({
        sort: {
          field: field,
          asc: self.state.sort.field === field ? !self.state.sort.asc : true
        }
      });
    };
  };

  this.search = function (field) {
    var self = _this3;
    return function (event) {
      var search = _this3.state.search;
      search[field] = event.target.value;
      _this3.setState({
        search: search,
        pagination: {
          activePage: 1,
          itemPerPage: _this3.state.pagination.itemPerPage
        }
      });

      return false;
    };
  };

  this.handleSelect = function (event, selectedEvent) {
    _this3.setState({
      pagination: {
        activePage: selectedEvent.eventKey,
        itemPerPage: _this3.state.pagination.itemPerPage
      }
    });
  };
};

exports.default = DataTable;