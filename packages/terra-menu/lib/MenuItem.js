'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _terraPopupPresenter = require('terra-popup-presenter');

var _terraPopupPresenter2 = _interopRequireDefault(_terraPopupPresenter);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _terraList = require('terra-list');

var _terraList2 = _interopRequireDefault(_terraList);

require('terra-base/lib/baseStyles');

require('./MenuItem.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  display: _propTypes2.default.element,
  isSelected: _propTypes2.default.bool,
  children: _propTypes2.default.element,
  isListStyle: _propTypes2.default.bool
};

var defaultProps = {
  isSelected: false,
  isListStyle: false
};

var MenuItem = function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    var _this = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

    _this.handleRequestClose = _this.handleRequestClose.bind(_this);
    _this.handleOnClick = _this.handleOnClick.bind(_this);
    _this.wrapOnClick = _this.wrapOnClick.bind(_this);
    _this.state = { isSelected: false };
    return _this;
  }

  _createClass(MenuItem, [{
    key: 'handleRequestClose',
    value: function handleRequestClose() {
      this.setState({ isSelected: false });
    }
  }, {
    key: 'handleOnClick',
    value: function handleOnClick() {
      if (this.props.children) {
        this.setState({ isSelected: true });
      }
    }
  }, {
    key: 'wrapOnClick',
    value: function wrapOnClick() {
      var _this2 = this;

      var onClick = this.props.display.props.onClick;
      return function (event) {
        _this2.handleOnClick(event);

        if (onClick) {
          onClick(event);
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          display = _props.display,
          isSelected = _props.isSelected,
          children = _props.children,
          isListStyle = _props.isListStyle,
          customProps = _objectWithoutProperties(_props, ['display', 'isSelected', 'children', 'isListStyle']);

      var menuItemClassName = (0, _classnames2.default)(['terra-MenuItem', customProps.className]);

      var target = _react2.default.cloneElement(display, { onClick: this.wrapOnClick() });
      if (isListStyle) {
        target = _react2.default.createElement(_terraList2.default.Item, { content: _react2.default.createElement(
            'div',
            null,
            display.props.text
          ), onClick: this.wrapOnClick() });
      }

      var toggle = _react2.default.createElement(_terraPopupPresenter2.default, {
        content: children,
        contentAttachment: 'bottom center',
        isOpen: this.state.isSelected,
        target: target,
        onRequestClose: this.handleRequestClose,
        showArrow: true
      });

      return _react2.default.createElement(
        'div',
        _extends({}, customProps, { className: menuItemClassName }),
        toggle
      );
    }
  }]);

  return MenuItem;
}(_react2.default.Component);

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

exports.default = MenuItem;