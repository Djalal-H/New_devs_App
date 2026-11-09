"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withDragAndDrop;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes2 = require("../../utils/propTypes");
var _EventWrapper = _interopRequireDefault(require("./EventWrapper"));
var _EventContainerWrapper = _interopRequireDefault(require("./EventContainerWrapper"));
var _WeekWrapper = _interopRequireDefault(require("./WeekWrapper"));
var _common = require("./common");
var _DnDContext = require("./DnDContext");
var _excluded = ["selectable", "elementProps", "components"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function withDragAndDrop(Calendar) {
  var DragAndDropCalendar = /*#__PURE__*/function (_React$Component) {
    function DragAndDropCalendar() {
      var _this;
      (0, _classCallCheck2.default)(this, DragAndDropCalendar);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, DragAndDropCalendar, [].concat(args));
      _this.defaultOnDragOver = function (event) {
        event.preventDefault();
      };
      _this.handleBeginAction = function (event, action, direction) {
        _this.setState({
          event: event,
          action: action,
          direction: direction
        });
        var onDragStart = _this.props.onDragStart;
        if (onDragStart) onDragStart({
          event: event,
          action: action,
          direction: direction
        });
      };
      _this.handleInteractionStart = function () {
        if (_this.state.interacting === false) _this.setState({
          interacting: true
        });
      };
      _this.handleInteractionEnd = function (interactionInfo) {
        var _this$state = _this.state,
          action = _this$state.action,
          event = _this$state.event;
        if (!action) return;
        _this.setState({
          action: null,
          event: null,
          interacting: false,
          direction: null
        });
        if (interactionInfo == null) return;
        interactionInfo.event = event;
        var _this$props = _this.props,
          onEventDrop = _this$props.onEventDrop,
          onEventResize = _this$props.onEventResize;
        if (action === 'move' && onEventDrop) onEventDrop(interactionInfo);
        if (action === 'resize' && onEventResize) onEventResize(interactionInfo);
      };
      _this.state = {
        interacting: false
      };
      return _this;
    }
    (0, _inherits2.default)(DragAndDropCalendar, _React$Component);
    return (0, _createClass2.default)(DragAndDropCalendar, [{
      key: "getDnDContextValue",
      value: function getDnDContextValue() {
        return {
          draggable: {
            onStart: this.handleInteractionStart,
            onEnd: this.handleInteractionEnd,
            onBeginAction: this.handleBeginAction,
            onDropFromOutside: this.props.onDropFromOutside,
            dragFromOutsideItem: this.props.dragFromOutsideItem,
            draggableAccessor: this.props.draggableAccessor,
            resizableAccessor: this.props.resizableAccessor,
            dragAndDropAction: this.state
          }
        };
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
          selectable = _this$props2.selectable,
          elementProps = _this$props2.elementProps,
          components = _this$props2.components,
          props = (0, _objectWithoutProperties2.default)(_this$props2, _excluded);
        var interacting = this.state.interacting;
        delete props.onEventDrop;
        delete props.onEventResize;
        props.selectable = selectable ? 'ignoreEvents' : false;
        this.components = (0, _common.mergeComponents)(components, {
          eventWrapper: _EventWrapper.default,
          eventContainerWrapper: _EventContainerWrapper.default,
          weekWrapper: _WeekWrapper.default
        });
        var elementPropsWithDropFromOutside = this.props.onDropFromOutside ? _objectSpread(_objectSpread({}, elementProps), {}, {
          onDragOver: this.props.onDragOver || this.defaultOnDragOver
        }) : elementProps;
        props.className = (0, _clsx.default)(props.className, 'rbc-addons-dnd', !!interacting && 'rbc-addons-dnd-is-dragging');
        var context = this.getDnDContextValue();
        return /*#__PURE__*/_react.default.createElement(_DnDContext.DnDContext.Provider, {
          value: context
        }, /*#__PURE__*/_react.default.createElement(Calendar, (0, _extends2.default)({}, props, {
          elementProps: elementPropsWithDropFromOutside,
          components: this.components
        })));
      }
    }]);
  }(_react.default.Component);
  DragAndDropCalendar.defaultProps = _objectSpread(_objectSpread({}, Calendar.defaultProps), {}, {
    draggableAccessor: null,
    resizableAccessor: null,
    resizable: true
  });
  DragAndDropCalendar.propTypes = process.env.NODE_ENV !== "production" ? _objectSpread(_objectSpread({}, Calendar.propTypes), {}, {
    onEventDrop: _propTypes.default.func,
    onEventResize: _propTypes.default.func,
    onDragStart: _propTypes.default.func,
    onDragOver: _propTypes.default.func,
    onDropFromOutside: _propTypes.default.func,
    dragFromOutsideItem: _propTypes.default.func,
    draggableAccessor: _propTypes2.accessor,
    resizableAccessor: _propTypes2.accessor,
    selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
    resizable: _propTypes.default.bool
  }) : {};
  return DragAndDropCalendar;
}