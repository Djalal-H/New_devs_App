"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _constants = require("./utils/constants");
var _propTypes2 = require("./utils/propTypes");
var _TimeGrid = _interopRequireDefault(require("./TimeGrid"));
var _excluded = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Week = /*#__PURE__*/function (_React$Component) {
  function Week() {
    (0, _classCallCheck2.default)(this, Week);
    return _callSuper(this, Week, arguments);
  }
  (0, _inherits2.default)(Week, _React$Component);
  return (0, _createClass2.default)(Week, [{
    key: "render",
    value: function render() {
      /**
       * This allows us to default min, max, and scrollToTime
       * using our localizer. This is necessary until such time
       * as TimeGrid is converted to a functional component.
       */
      var _this$props = this.props,
        date = _this$props.date,
        localizer = _this$props.localizer,
        _this$props$min = _this$props.min,
        min = _this$props$min === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$min,
        _this$props$max = _this$props.max,
        max = _this$props$max === void 0 ? localizer.endOf(new Date(), 'day') : _this$props$max,
        _this$props$scrollToT = _this$props.scrollToTime,
        scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$scrollToT,
        _this$props$enableAut = _this$props.enableAutoScroll,
        enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut,
        props = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var range = Week.range(date, this.props);
      return /*#__PURE__*/_react.default.createElement(_TimeGrid.default, (0, _extends2.default)({}, props, {
        range: range,
        eventOffset: 15,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
        enableAutoScroll: enableAutoScroll
      }));
    }
  }]);
}(_react.default.Component);
Week.propTypes = process.env.NODE_ENV !== "production" ? {
  date: _propTypes.default.instanceOf(Date).isRequired,
  events: _propTypes.default.array.isRequired,
  backgroundEvents: _propTypes.default.array.isRequired,
  resources: _propTypes.default.array,
  step: _propTypes.default.number,
  timeslots: _propTypes.default.number,
  range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  getNow: _propTypes.default.func.isRequired,
  scrollToTime: _propTypes.default.instanceOf(Date),
  enableAutoScroll: _propTypes.default.bool,
  showMultiDayTimes: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  resizable: _propTypes.default.bool,
  width: _propTypes.default.number,
  accessors: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired,
  allDayMaxRows: _propTypes.default.number,
  selected: _propTypes.default.object,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes.default.number,
  onNavigate: _propTypes.default.func,
  onSelectSlot: _propTypes.default.func,
  onSelectEnd: _propTypes.default.func,
  onSelectStart: _propTypes.default.func,
  onSelectEvent: _propTypes.default.func,
  onDoubleClickEvent: _propTypes.default.func,
  onKeyPressEvent: _propTypes.default.func,
  onShowMore: _propTypes.default.func,
  onDrillDown: _propTypes.default.func,
  getDrilldownView: _propTypes.default.func.isRequired,
  dayLayoutAlgorithm: _propTypes2.DayLayoutAlgorithmPropType,
  showAllEvents: _propTypes.default.bool,
  doShowMoreDrillDown: _propTypes.default.bool,
  popup: _propTypes.default.bool,
  handleDragStart: _propTypes.default.func,
  popupOffset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    x: _propTypes.default.number,
    y: _propTypes.default.number
  })])
} : {};
Week.defaultProps = _TimeGrid.default.defaultProps;
Week.navigate = function (date, action, _ref) {
  var localizer = _ref.localizer;
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'week');
    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'week');
    default:
      return date;
  }
};
Week.range = function (date, _ref2) {
  var localizer = _ref2.localizer;
  var firstOfWeek = localizer.startOfWeek();
  var start = localizer.startOf(date, 'week', firstOfWeek);
  var end = localizer.endOf(date, 'week', firstOfWeek);
  return localizer.range(start, end);
};
Week.title = function (date, _ref3) {
  var localizer = _ref3.localizer;
  var _Week$range = Week.range(date, {
      localizer: localizer
    }),
    _Week$range2 = (0, _toArray2.default)(_Week$range),
    start = _Week$range2[0],
    rest = _arrayLikeToArray(_Week$range2).slice(1);
  return localizer.format({
    start: start,
    end: rest.pop()
  }, 'dayRangeHeaderFormat');
};
var _default = exports.default = Week;