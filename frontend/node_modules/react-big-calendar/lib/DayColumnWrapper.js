"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var DayColumnWrapper = function DayColumnWrapper(_ref) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    innerRef = _ref.innerRef;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    style: style,
    ref: innerRef
  }, children);
};
var _default = exports.default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(DayColumnWrapper, (0, _extends2.default)({}, props, {
    innerRef: ref
  }));
});