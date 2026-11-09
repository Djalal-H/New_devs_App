"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactOverlays = require("react-overlays");
var _Popup = _interopRequireDefault(require("./Popup"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function CalOverlay(_ref) {
  var containerRef = _ref.containerRef,
    _ref$popupOffset = _ref.popupOffset,
    popupOffset = _ref$popupOffset === void 0 ? 5 : _ref$popupOffset,
    overlay = _ref.overlay,
    accessors = _ref.accessors,
    localizer = _ref.localizer,
    components = _ref.components,
    getters = _ref.getters,
    selected = _ref.selected,
    handleSelectEvent = _ref.handleSelectEvent,
    handleDoubleClickEvent = _ref.handleDoubleClickEvent,
    handleKeyPressEvent = _ref.handleKeyPressEvent,
    handleDragStart = _ref.handleDragStart,
    onHide = _ref.onHide,
    overlayDisplay = _ref.overlayDisplay;
  var popperRef = (0, _react.useRef)(null);
  if (!overlay.position) return null;
  var offset = popupOffset;
  if (!isNaN(popupOffset)) {
    offset = {
      x: popupOffset,
      y: popupOffset
    };
  }
  var position = overlay.position,
    events = overlay.events,
    date = overlay.date,
    end = overlay.end;
  return /*#__PURE__*/_react.default.createElement(_reactOverlays.Overlay, {
    rootClose: true,
    flip: true,
    show: true,
    placement: "bottom",
    onHide: onHide,
    target: overlay.target
  }, function (_ref2) {
    var props = _ref2.props;
    return /*#__PURE__*/_react.default.createElement(_Popup.default, (0, _extends2.default)({}, props, {
      containerRef: containerRef,
      ref: popperRef,
      target: overlay.target,
      offset: offset,
      accessors: accessors,
      getters: getters,
      selected: selected,
      components: components,
      localizer: localizer,
      position: position,
      show: overlayDisplay,
      events: events,
      slotStart: date,
      slotEnd: end,
      onSelect: handleSelectEvent,
      onDoubleClick: handleDoubleClickEvent,
      onKeyPress: handleKeyPressEvent,
      handleDragStart: handleDragStart
    }));
  });
}
var PopOverlay = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(CalOverlay, (0, _extends2.default)({}, props, {
    containerRef: ref
  }));
});
PopOverlay.propTypes = {
  popupOffset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  })]),
  overlay: _propTypes.default.shape({
    position: _propTypes.default.object,
    events: _propTypes.default.array,
    date: _propTypes.default.instanceOf(Date),
    end: _propTypes.default.instanceOf(Date)
  }),
  accessors: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  selected: _propTypes.default.object,
  handleSelectEvent: _propTypes.default.func,
  handleDoubleClickEvent: _propTypes.default.func,
  handleKeyPressEvent: _propTypes.default.func,
  handleDragStart: _propTypes.default.func,
  onHide: _propTypes.default.func,
  overlayDisplay: _propTypes.default.func
};
var _default = exports.default = PopOverlay;