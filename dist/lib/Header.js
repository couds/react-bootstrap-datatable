'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      var self = this;
      var sortIcons = _react2.default.createElement('div', { style: { width: '1px', height: '23px', float: 'right', marginRight: '2px' } }),
          searchIcon = '';
      if (this.props.sortable) {
        var isSortField = this.props.isSortField;
        sortIcons = _react2.default.createElement(
          'span',
          { style: { display: 'inline-block' } },
          _react2.default.createElement(
            'span',
            {
              style: { fontSize: '10px', display: 'block', color: isSortField && this.props.asc ? 'black' : 'grey', marginBottom: '-5px' } },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'triangle-top' })
          ),
          _react2.default.createElement(
            'span',
            {
              style: { fontSize: '10px', display: 'block', color: isSortField && !this.props.asc ? 'black' : 'grey', marginTop: '-5px' } },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'triangle-bottom' })
          )
        );
      }

      if (this.props.searchable) {
        var popup = _react2.default.createElement(
          _reactBootstrap.Popover,
          { id: 'search_' + this.props.field, title: 'Search' },
          _react2.default.createElement('input', { placeholder: 'Search text', onChange: this.props.onSearch(this.props.field) })
        );
        searchIcon = _react2.default.createElement(
          _reactBootstrap.OverlayTrigger,
          { trigger: 'click', placement: 'left', rootClose: true,
            overlay: popup },
          _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'search' })
        );
      }

      return _react2.default.createElement(
        'th',
        { className: this.props.md ? 'col-md-' + this.props.md : '',
          style: { cursor: 'pointer', verticalAlign: 'middle' } },
        _react2.default.createElement(
          'div',
          { style: { position: 'relative' } },
          _react2.default.createElement(
            'div',
            { style: { marginRight: this.props.searchable ? '25px' : 0 }, onClick: this.props.onSort(this.props.field, this.props.sortable) },
            this.props.children,
            _react2.default.createElement(
              'span',
              { style: { float: 'right', marginRight: '2px' } },
              sortIcons
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { position: 'absolute', right: 0, top: 0 } },
            _react2.default.createElement(
              'span',
              { style: { fontSize: '17px', marginTop: '3px', color: this.props.currentSearch ? 'red' : 'black' } },
              searchIcon
            )
          )
        )
      );
    }
  }]);

  return Header;
})(_react2.default.Component);

exports.default = Header;