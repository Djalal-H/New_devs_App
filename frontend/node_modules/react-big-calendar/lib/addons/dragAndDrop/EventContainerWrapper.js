"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
var _domHelpers = require("dom-helpers");
var _querySelectorAll = _interopRequireDefault(require("dom-helpers/querySelectorAll"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _DnDContext = require("./DnDContext");
var _Selection = _interopRequireWildcard(require("../../Selection"));
var _TimeGridEvent = _interopRequireDefault(require("../../TimeGridEvent"));
var _common = require("./common");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var EventContainerWrapper = /*#__PURE__*/function (_React$Component) {
  function EventContainerWrapper() {
    var _this;
    (0, _classCallCheck2.default)(this, EventContainerWrapper);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, EventContainerWrapper, [].concat(args));
    _this.handleMove = function (point, bounds) {
      if (!(0, _common.pointInColumn)(bounds, point)) return _this.reset();
      var event = _this.context.draggable.dragAndDropAction.event;
      var _this$props = _this.props,
        accessors = _this$props.accessors,
        slotMetrics = _this$props.slotMetrics;
      var newSlot = slotMetrics.closestSlotFromPoint({
        y: point.y - _this.eventOffsetTop,
        x: point.x
      }, bounds);
      var _eventTimes = (0, _common.eventTimes)(event, accessors, _this.props.localizer),
        duration = _eventTimes.duration;
      var newEnd = _this.props.localizer.add(newSlot, duration, 'milliseconds');
      _this.update(event, slotMetrics.getRange(newSlot, newEnd, false, true));
    };
    _this.handleDropFromOutside = function (point, boundaryBox) {
      var _this$props2 = _this.props,
        slotMetrics = _this$props2.slotMetrics,
        resource = _this$props2.resource;
      var start = slotMetrics.closestSlotFromPoint({
        y: point.y,
        x: point.x
      }, boundaryBox);
      var end = _this._calculateDnDEnd(start);
      _this.context.draggable.onDropFromOutside({
        start: start,
        end: end,
        allDay: false,
        resource: resource
      });

      // Cleanup after dropping from outside
      _this.reset();
    };
    _this.handleDragOverFromOutside = function (point, bounds) {
      var slotMetrics = _this.props.slotMetrics;
      var start = slotMetrics.closestSlotFromPoint({
        y: point.y,
        x: point.x
      }, bounds);
      var end = _this._calculateDnDEnd(start);
      var event = _this.context.draggable.dragFromOutsideItem();
      _this.update(event, slotMetrics.getRange(start, end, false, true));
    };
    _this._calculateDnDEnd = function (start) {
      var _this$props3 = _this.props,
        accessors = _this$props3.accessors,
        slotMetrics = _this$props3.slotMetrics,
        localizer = _this$props3.localizer;
      var event = _this.context.draggable.dragFromOutsideItem();
      var _eventTimes2 = (0, _common.eventTimes)(event, accessors, localizer),
        eventDuration = _eventTimes2.duration;
      var end = slotMetrics.nextSlot(start);
      var eventHasDuration = !isNaN(eventDuration);
      if (eventHasDuration) {
        var eventEndSlot = localizer.add(start, eventDuration, 'milliseconds');
        end = new Date(Math.max(eventEndSlot, end));
      }
      return end;
    };
    _this.updateParentScroll = function (parent, node) {
      setTimeout(function () {
        var draggedEl = (0, _querySelectorAll.default)(node, '.rbc-addons-dnd-drag-preview')[0];
        if (draggedEl) {
          if (draggedEl.offsetTop < parent.scrollTop) {
            (0, _domHelpers.scrollTop)(parent, Math.max(draggedEl.offsetTop, 0));
          } else if (draggedEl.offsetTop + draggedEl.offsetHeight > parent.scrollTop + parent.clientHeight) {
            (0, _domHelpers.scrollTop)(parent, Math.min(draggedEl.offsetTop - parent.offsetHeight + draggedEl.offsetHeight, parent.scrollHeight));
          }
        }
      });
    };
    _this._selectable = function () {
      var wrapper = _this.ref.current;
      var node = wrapper.children[0];
      var isBeingDragged = false;
      var selector = _this._selector = new _Selection.default(function () {
        return wrapper.closest('.rbc-time-view');
      });
      var parent = (0, _domHelpers.scrollParent)(wrapper);
      selector.on('beforeSelect', function (point) {
        var dragAndDropAction = _this.context.draggable.dragAndDropAction;
        if (!dragAndDropAction.action) return false;
        if (dragAndDropAction.action === 'resize') {
          return (0, _common.pointInColumn)((0, _Selection.getBoundsForNode)(node), point);
        }
        var eventNode = (0, _Selection.getEventNodeFromPoint)(node, point);
        if (!eventNode) return false;

        // eventOffsetTop is distance from the top of the event to the initial
        // mouseDown position. We need this later to compute the new top of the
        // event during move operations, since the final location is really a
        // delta from this point. note: if we want to DRY this with WeekWrapper,
        // probably better just to capture the mouseDown point here and do the
        // placement computation in handleMove()...
        _this.eventOffsetTop = point.y - (0, _Selection.getBoundsForNode)(eventNode).top;
      });
      selector.on('selecting', function (box) {
        var bounds = (0, _Selection.getBoundsForNode)(node);
        var dragAndDropAction = _this.context.draggable.dragAndDropAction;
        if (dragAndDropAction.action === 'move') {
          _this.updateParentScroll(parent, node);
          _this.handleMove(box, bounds);
        }
        if (dragAndDropAction.action === 'resize') {
          _this.updateParentScroll(parent, node);
          _this.handleResize(box, bounds);
        }
      });
      selector.on('dropFromOutside', function (point) {
        if (!_this.context.draggable.onDropFromOutside) return;
        var bounds = (0, _Selection.getBoundsForNode)(node);
        if (!(0, _common.pointInColumn)(bounds, point)) return;
        _this.handleDropFromOutside(point, bounds);
      });
      selector.on('dragOverFromOutside', function (point) {
        var item = _this.context.draggable.dragFromOutsideItem ? _this.context.draggable.dragFromOutsideItem() : null;
        if (!item) return;
        var bounds = (0, _Selection.getBoundsForNode)(node);
        if (!(0, _common.pointInColumn)(bounds, point)) return _this.reset();
        _this.handleDragOverFromOutside(point, bounds);
      });
      selector.on('selectStart', function () {
        isBeingDragged = true;
        _this.context.draggable.onStart();
      });
      selector.on('select', function (point) {
        var bounds = (0, _Selection.getBoundsForNode)(node);
        isBeingDragged = false;
        var dragAndDropAction = _this.context.draggable.dragAndDropAction;
        if (dragAndDropAction.action === 'resize') {
          _this.handleInteractionEnd();
        } else if (!_this.state.event || !(0, _common.pointInColumn)(bounds, point)) {
          return;
        } else {
          _this.handleInteractionEnd();
        }
      });
      selector.on('click', function () {
        if (isBeingDragged) _this.reset();
        _this.context.draggable.onEnd(null);
      });
      selector.on('reset', function () {
        _this.reset();
        _this.context.draggable.onEnd(null);
      });
    };
    _this.handleInteractionEnd = function () {
      var resource = _this.props.resource;
      var event = _this.state.event;
      _this.reset();
      _this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId: resource
      });
    };
    _this._teardownSelectable = function () {
      if (!_this._selector) return;
      _this._selector.teardown();
      _this._selector = null;
    };
    _this.state = {};
    _this.ref = /*#__PURE__*/_react.default.createRef();
    return _this;
  }
  (0, _inherits2.default)(EventContainerWrapper, _React$Component);
  return (0, _createClass2.default)(EventContainerWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._selectable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.state.event) this.setState({
        event: null,
        top: null,
        height: null
      });
    }
  }, {
    key: "update",
    value: function update(event, _ref) {
      var startDate = _ref.startDate,
        endDate = _ref.endDate,
        top = _ref.top,
        height = _ref.height;
      var lastEvent = this.state.event;
      if (lastEvent && startDate === lastEvent.start && endDate === lastEvent.end) {
        return;
      }
      this.setState({
        top: top,
        height: height,
        event: _objectSpread(_objectSpread({}, event), {}, {
          start: startDate,
          end: endDate
        })
      });
    }
  }, {
    key: "handleResize",
    value: function handleResize(point, bounds) {
      var _this$props4 = this.props,
        accessors = _this$props4.accessors,
        slotMetrics = _this$props4.slotMetrics,
        localizer = _this$props4.localizer;
      var _this$context$draggab = this.context.draggable.dragAndDropAction,
        event = _this$context$draggab.event,
        direction = _this$context$draggab.direction;
      var newTime = slotMetrics.closestSlotFromPoint(point, bounds);
      var _eventTimes3 = (0, _common.eventTimes)(event, accessors, localizer),
        start = _eventTimes3.start,
        end = _eventTimes3.end;
      var newRange;
      if (direction === 'UP') {
        var newStart = localizer.min(newTime, slotMetrics.closestSlotFromDate(end, -1));
        // Get the new range based on the new start
        // but don't overwrite the end date as it could be outside this day boundary.
        newRange = slotMetrics.getRange(newStart, end);
        newRange = _objectSpread(_objectSpread({}, newRange), {}, {
          endDate: end
        });
      } else if (direction === 'DOWN') {
        // Get the new range based on the new end
        // but don't overwrite the start date as it could be outside this day boundary.
        var newEnd = localizer.max(newTime, slotMetrics.closestSlotFromDate(start));
        newRange = slotMetrics.getRange(start, newEnd);
        newRange = _objectSpread(_objectSpread({}, newRange), {}, {
          startDate: start
        });
      }
      this.update(event, newRange);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this$props5 = this.props,
        children = _this$props5.children,
        accessors = _this$props5.accessors,
        components = _this$props5.components,
        getters = _this$props5.getters,
        slotMetrics = _this$props5.slotMetrics,
        localizer = _this$props5.localizer;
      var _this$state = this.state,
        event = _this$state.event,
        top = _this$state.top,
        height = _this$state.height;
      if (!event) return children;
      var events = children.props.children;
      var start = event.start,
        end = event.end;
      var label;
      var format = 'eventTimeRangeFormat';
      var startsBeforeDay = slotMetrics.startsBeforeDay(start);
      var startsAfterDay = slotMetrics.startsAfterDay(end);
      if (startsBeforeDay) format = 'eventTimeRangeEndFormat';else if (startsAfterDay) format = 'eventTimeRangeStartFormat';
      if (startsBeforeDay && startsAfterDay) label = localizer.messages.allDay;else label = localizer.format({
        start: start,
        end: end
      }, format);
      return /*#__PURE__*/_react.default.cloneElement(children, {
        children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, events, event && /*#__PURE__*/_react.default.createElement(_TimeGridEvent.default, {
          event: event,
          label: label,
          className: "rbc-addons-dnd-drag-preview",
          style: {
            top: top,
            height: height,
            width: 100
          },
          getters: getters,
          components: components,
          accessors: _objectSpread(_objectSpread({}, accessors), _common.dragAccessors),
          continuesPrior: startsBeforeDay,
          continuesAfter: startsAfterDay
        }))
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.ref
      }, this.renderContent());
    }
  }]);
}(_react.default.Component);
EventContainerWrapper.contextType = _DnDContext.DnDContext;
EventContainerWrapper.propTypes = process.env.NODE_ENV !== "production" ? {
  accessors: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired,
  slotMetrics: _propTypes.default.object.isRequired,
  resource: _propTypes.default.any
} : {};
var _default = exports.default = EventContainerWrapper;