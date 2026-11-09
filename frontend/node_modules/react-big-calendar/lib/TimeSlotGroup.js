"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _BackgroundWrapper = _interopRequireDefault(require("./BackgroundWrapper"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var TimeSlotGroup = exports.default = /*#__PURE__*/function (_Component) {
  function TimeSlotGroup() {
    (0, _classCallCheck2.default)(this, TimeSlotGroup);
    return _callSuper(this, TimeSlotGroup, arguments);
  }
  (0, _inherits2.default)(TimeSlotGroup, _Component);
  return (0, _createClass2.default)(TimeSlotGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        renderSlot = _this$props.renderSlot,
        resource = _this$props.resource,
        group = _this$props.group,
        getters = _this$props.getters,
        _this$props$component = _this$props.components,
        _this$props$component2 = _this$props$component === void 0 ? {} : _this$props$component,
        _this$props$component3 = _this$props$component2.timeSlotWrapper,
        Wrapper = _this$props$component3 === void 0 ? _BackgroundWrapper.default : _this$props$component3;
      var groupProps = getters ? getters.slotGroupProp(group) : {};
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        className: "rbc-timeslot-group"
      }, groupProps), group.map(function (value, idx) {
        var slotProps = getters ? getters.slotProp(value, resource) : {};
        return /*#__PURE__*/_react.default.createElement(Wrapper, {
          key: idx,
          value: value,
          resource: resource
        }, /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, slotProps, {
          className: (0, _clsx.default)('rbc-time-slot', slotProps.className)
        }), renderSlot && renderSlot(value, idx)));
      }));
    }
  }]);
}(_react.Component);
TimeSlotGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  renderSlot: _propTypes.default.func,
  group: _propTypes.default.array.isRequired,
  resource: _propTypes.default.any,
  components: _propTypes.default.object,
  getters: _propTypes.default.object
} : {};