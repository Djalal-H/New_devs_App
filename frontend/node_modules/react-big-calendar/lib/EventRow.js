"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _EventRowMixin = _interopRequireDefault(require("./EventRowMixin"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var EventRow = /*#__PURE__*/function (_React$Component) {
  function EventRow() {
    (0, _classCallCheck2.default)(this, EventRow);
    return _callSuper(this, EventRow, arguments);
  }
  (0, _inherits2.default)(EventRow, _React$Component);
  return (0, _createClass2.default)(EventRow, [{
    key: "render",
    value: function render() {
      var _this = this;
      var _this$props = this.props,
        segments = _this$props.segments,
        slots = _this$props.slotMetrics.slots,
        className = _this$props.className;
      var lastEnd = 1;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx.default)(className, 'rbc-row')
      }, segments.reduce(function (row, _ref, li) {
        var event = _ref.event,
          left = _ref.left,
          right = _ref.right,
          span = _ref.span;
        var key = '_lvl_' + li;
        var gap = left - lastEnd;
        var content = _EventRowMixin.default.renderEvent(_this.props, event);
        if (gap) row.push(_EventRowMixin.default.renderSpan(slots, gap, "".concat(key, "_gap")));
        row.push(_EventRowMixin.default.renderSpan(slots, span, key, content));
        lastEnd = right + 1;
        return row;
      }, []));
    }
  }]);
}(_react.default.Component);
EventRow.propTypes = process.env.NODE_ENV !== "production" ? _objectSpread({
  segments: _propTypes.default.array
}, _EventRowMixin.default.propTypes) : {};
EventRow.defaultProps = _objectSpread({}, _EventRowMixin.default.defaultProps);
var _default = exports.default = EventRow;