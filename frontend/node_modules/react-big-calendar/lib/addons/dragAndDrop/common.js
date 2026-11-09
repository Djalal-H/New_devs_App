"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragAccessors = void 0;
exports.eventTimes = eventTimes;
exports.mergeComponents = mergeComponents;
exports.pointInColumn = pointInColumn;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _accessors = require("../../utils/accessors");
var _react = require("react");
var _excluded = ["children"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var dragAccessors = exports.dragAccessors = {
  start: (0, _accessors.wrapAccessor)(function (e) {
    return e.start;
  }),
  end: (0, _accessors.wrapAccessor)(function (e) {
    return e.end;
  })
};
function nest() {
  for (var _len = arguments.length, Components = new Array(_len), _key = 0; _key < _len; _key++) {
    Components[_key] = arguments[_key];
  }
  var Nest = function Nest(_ref) {
    var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return Components.filter(Boolean).reduceRight(function (child, Component) {
      return /*#__PURE__*/(0, _react.createElement)(Component, props, child);
    }, children);
  };
  return Nest;
}
function mergeComponents() {
  var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var addons = arguments.length > 1 ? arguments[1] : undefined;
  var keys = Object.keys(addons);
  var result = _objectSpread({}, components);
  keys.forEach(function (key) {
    result[key] = components[key] ? nest(components[key], addons[key]) : addons[key];
  });
  return result;
}
function pointInColumn(bounds, point) {
  var left = bounds.left,
    right = bounds.right,
    top = bounds.top;
  var x = point.x,
    y = point.y;
  return x < right + 10 && x > left && y > top;
}
function eventTimes(event, accessors, localizer) {
  var start = accessors.start(event);
  var end = accessors.end(event);
  var isZeroDuration = localizer.eq(start, end, 'minutes') && localizer.diff(start, end, 'minutes') === 0;
  // make zero duration midnight events at least one day long
  if (isZeroDuration) end = localizer.add(end, 1, 'day');
  var duration = localizer.diff(start, end, 'milliseconds');
  return {
    start: start,
    end: end,
    duration: duration
  };
}