"use client";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let _tiptap_extension_bubble_menu = require("@tiptap/extension-bubble-menu");
let _tiptap_react = require("@tiptap/react");
let react = require("react");
react = __toESM(react, 1);
let react_dom = require("react-dom");
let _tiptap_pm_state = require("@tiptap/pm/state");
let _tiptap_extension_floating_menu = require("@tiptap/extension-floating-menu");
//#region src/menus/getAutoPluginKey.ts
function getAutoPluginKey(pluginKey, defaultName) {
	return pluginKey !== null && pluginKey !== void 0 ? pluginKey : new _tiptap_pm_state.PluginKey(defaultName);
}
//#endregion
//#region src/menus/useMenuElementProps.ts
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;
const PLUGIN_MANAGED_STYLE_PROPERTIES = /* @__PURE__ */ new Set([
	"left",
	"opacity",
	"position",
	"top",
	"visibility",
	"width"
]);
const UNITLESS_STYLE_PROPERTIES = /* @__PURE__ */ new Set([
	"animationIterationCount",
	"aspectRatio",
	"borderImageOutset",
	"borderImageSlice",
	"borderImageWidth",
	"columnCount",
	"columns",
	"fillOpacity",
	"flex",
	"flexGrow",
	"flexShrink",
	"fontWeight",
	"gridArea",
	"gridColumn",
	"gridColumnEnd",
	"gridColumnStart",
	"gridRow",
	"gridRowEnd",
	"gridRowStart",
	"lineClamp",
	"lineHeight",
	"opacity",
	"order",
	"orphans",
	"scale",
	"stopOpacity",
	"strokeDasharray",
	"strokeDashoffset",
	"strokeMiterlimit",
	"strokeOpacity",
	"strokeWidth",
	"tabSize",
	"widows",
	"zIndex",
	"zoom"
]);
const ATTRIBUTE_EXCLUSIONS = /* @__PURE__ */ new Set([
	"children",
	"className",
	"style"
]);
const DIRECT_PROPERTY_KEYS = /* @__PURE__ */ new Set(["tabIndex"]);
const FORWARDED_ATTRIBUTE_KEYS = /* @__PURE__ */ new Set([
	"accessKey",
	"autoCapitalize",
	"contentEditable",
	"contextMenu",
	"dir",
	"draggable",
	"enterKeyHint",
	"hidden",
	"id",
	"lang",
	"nonce",
	"role",
	"slot",
	"spellCheck",
	"tabIndex",
	"title",
	"translate"
]);
const SPECIAL_EVENT_NAMES = {
	Blur: "focusout",
	DoubleClick: "dblclick",
	Focus: "focusin",
	MouseEnter: "mouseenter",
	MouseLeave: "mouseleave"
};
function isEventProp(key, value) {
	return /^on[A-Z]/.test(key) && typeof value === "function";
}
function toAttributeName(key) {
	if (key.startsWith("aria-") || key.startsWith("data-")) return key;
	return key;
}
function isForwardedAttributeKey(key) {
	return key.startsWith("aria-") || key.startsWith("data-") || FORWARDED_ATTRIBUTE_KEYS.has(key);
}
function toStylePropertyName(key) {
	if (key.startsWith("--")) return key;
	return key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
function toEventConfig(key) {
	var _SPECIAL_EVENT_NAMES$;
	const useCapture = key.endsWith("Capture");
	const reactEventName = (useCapture ? key.slice(0, -7) : key).slice(2);
	return {
		eventName: (_SPECIAL_EVENT_NAMES$ = SPECIAL_EVENT_NAMES[reactEventName]) !== null && _SPECIAL_EVENT_NAMES$ !== void 0 ? _SPECIAL_EVENT_NAMES$ : reactEventName.toLowerCase(),
		options: useCapture ? { capture: true } : void 0
	};
}
function createSyntheticEvent(element, nativeEvent) {
	let defaultPrevented = nativeEvent.defaultPrevented;
	let propagationStopped = false;
	const syntheticEvent = Object.create(nativeEvent);
	Object.defineProperties(syntheticEvent, {
		nativeEvent: { value: nativeEvent },
		currentTarget: { value: element },
		target: { value: nativeEvent.target },
		persist: { value: () => void 0 },
		isDefaultPrevented: { value: () => defaultPrevented },
		isPropagationStopped: { value: () => propagationStopped },
		preventDefault: { value: () => {
			defaultPrevented = true;
			nativeEvent.preventDefault();
		} },
		stopPropagation: { value: () => {
			propagationStopped = true;
			nativeEvent.stopPropagation();
		} }
	});
	return syntheticEvent;
}
function isDirectPropertyKey(key) {
	return DIRECT_PROPERTY_KEYS.has(key);
}
function setDirectProperty(element, key, value) {
	if (key === "tabIndex") {
		element.tabIndex = Number(value);
		return;
	}
	element[key] = value;
}
function clearDirectProperty(element, key) {
	if (key === "tabIndex") {
		element.removeAttribute("tabindex");
		return;
	}
	const propertyValue = element[key];
	if (typeof propertyValue === "boolean") {
		element[key] = false;
		return;
	}
	if (typeof propertyValue === "number") {
		element[key] = 0;
		return;
	}
	element[key] = "";
}
function toStyleValue(styleName, value) {
	if (typeof value !== "number" || value === 0 || styleName.startsWith("--") || UNITLESS_STYLE_PROPERTIES.has(styleName)) return String(value);
	return `${value}px`;
}
function removeStyleProperty(element, styleName) {
	if (PLUGIN_MANAGED_STYLE_PROPERTIES.has(styleName)) return;
	element.style.removeProperty(toStylePropertyName(styleName));
}
function applyStyleProperty(element, styleName, value) {
	if (PLUGIN_MANAGED_STYLE_PROPERTIES.has(styleName)) return;
	element.style.setProperty(toStylePropertyName(styleName), toStyleValue(styleName, value));
}
function syncAttributes(element, prevProps, nextProps) {
	(/* @__PURE__ */ new Set([...Object.keys(prevProps), ...Object.keys(nextProps)])).forEach((key) => {
		if (ATTRIBUTE_EXCLUSIONS.has(key) || !isForwardedAttributeKey(key) || isEventProp(key, prevProps[key]) || isEventProp(key, nextProps[key])) return;
		const prevValue = prevProps[key];
		const nextValue = nextProps[key];
		if (prevValue === nextValue) return;
		const attributeName = toAttributeName(key);
		if (nextValue == null || nextValue === false) {
			if (isDirectPropertyKey(key)) clearDirectProperty(element, key);
			element.removeAttribute(attributeName);
			return;
		}
		if (nextValue === true) {
			if (isDirectPropertyKey(key)) setDirectProperty(element, key, true);
			element.setAttribute(attributeName, "");
			return;
		}
		if (isDirectPropertyKey(key)) {
			setDirectProperty(element, key, nextValue);
			return;
		}
		element.setAttribute(attributeName, String(nextValue));
	});
}
function syncClassName(element, prevClassName, nextClassName) {
	if (prevClassName === nextClassName) return;
	if (nextClassName) {
		element.className = nextClassName;
		return;
	}
	element.removeAttribute("class");
}
function syncStyles(element, prevStyle, nextStyle) {
	const previousStyle = prevStyle !== null && prevStyle !== void 0 ? prevStyle : {};
	const currentStyle = nextStyle !== null && nextStyle !== void 0 ? nextStyle : {};
	(/* @__PURE__ */ new Set([...Object.keys(previousStyle), ...Object.keys(currentStyle)])).forEach((styleName) => {
		const prevValue = previousStyle[styleName];
		const nextValue = currentStyle[styleName];
		if (prevValue === nextValue) return;
		if (nextValue == null) {
			removeStyleProperty(element, styleName);
			return;
		}
		applyStyleProperty(element, styleName, nextValue);
	});
}
function syncEventListeners(element, prevListeners, nextProps) {
	prevListeners.forEach(({ eventName, listener, options }) => {
		element.removeEventListener(eventName, listener, options);
	});
	const nextListeners = [];
	Object.entries(nextProps).forEach(([key, value]) => {
		if (!isEventProp(key, value)) return;
		const { eventName, options } = toEventConfig(key);
		const listener = (event) => {
			value(createSyntheticEvent(element, event));
		};
		element.addEventListener(eventName, listener, options);
		nextListeners.push({
			eventName,
			listener,
			options
		});
	});
	return nextListeners;
}
function useMenuElementProps(element, props) {
	const previousPropsRef = (0, react.useRef)({});
	const listenersRef = (0, react.useRef)([]);
	useIsomorphicLayoutEffect(() => {
		const previousProps = previousPropsRef.current;
		syncClassName(element, previousProps.className, props.className);
		syncStyles(element, previousProps.style, props.style);
		syncAttributes(element, previousProps, props);
		listenersRef.current = syncEventListeners(element, listenersRef.current, props);
		previousPropsRef.current = props;
		return () => {
			listenersRef.current.forEach(({ eventName, listener, options }) => {
				element.removeEventListener(eventName, listener, options);
			});
			listenersRef.current = [];
		};
	}, [element, props]);
}
//#endregion
//#region src/menus/BubbleMenu.tsx
const BubbleMenu = react.default.forwardRef(({ pluginKey, editor, updateDelay, resizeDelay, appendTo, shouldShow = null, getReferencedVirtualElement, options, children, ...restProps }, ref) => {
	const menuEl = (0, react.useRef)(document.createElement("div"));
	const resolvedPluginKey = (0, react.useRef)(getAutoPluginKey(pluginKey, "bubbleMenu")).current;
	useMenuElementProps(menuEl.current, restProps);
	if (typeof ref === "function") ref(menuEl.current);
	else if (ref) ref.current = menuEl.current;
	const { editor: currentEditor } = (0, _tiptap_react.useCurrentEditor)();
	/**
	* The editor instance where the bubble menu plugin will be registered.
	*/
	const pluginEditor = editor || currentEditor;
	const bubbleMenuPluginProps = {
		updateDelay,
		resizeDelay,
		appendTo,
		pluginKey: resolvedPluginKey,
		shouldShow,
		getReferencedVirtualElement,
		options
	};
	/**
	* The props for the bubble menu plugin. They are accessed inside a ref to
	* avoid running the useEffect hook and re-registering the plugin when the
	* props change.
	*/
	const bubbleMenuPluginPropsRef = (0, react.useRef)(bubbleMenuPluginProps);
	bubbleMenuPluginPropsRef.current = bubbleMenuPluginProps;
	/**
	* Track whether the plugin has been initialized, so we only send updates
	* after the initial registration.
	*/
	const [pluginInitialized, setPluginInitialized] = (0, react.useState)(false);
	/**
	* Track whether we need to skip the first options update dispatch.
	* This prevents unnecessary updates right after plugin initialization.
	*/
	const skipFirstUpdateRef = (0, react.useRef)(true);
	(0, react.useEffect)(() => {
		if (pluginEditor === null || pluginEditor === void 0 ? void 0 : pluginEditor.isDestroyed) return;
		if (!pluginEditor) {
			console.warn("BubbleMenu component is not rendered inside of an editor component or does not have editor prop.");
			return;
		}
		const bubbleMenuElement = menuEl.current;
		bubbleMenuElement.style.visibility = "hidden";
		bubbleMenuElement.style.position = "absolute";
		const plugin = (0, _tiptap_extension_bubble_menu.BubbleMenuPlugin)({
			...bubbleMenuPluginPropsRef.current,
			editor: pluginEditor,
			element: bubbleMenuElement
		});
		pluginEditor.registerPlugin(plugin);
		const createdPluginKey = bubbleMenuPluginPropsRef.current.pluginKey;
		skipFirstUpdateRef.current = true;
		setPluginInitialized(true);
		return () => {
			setPluginInitialized(false);
			pluginEditor.unregisterPlugin(createdPluginKey);
			window.requestAnimationFrame(() => {
				if (bubbleMenuElement.parentNode) bubbleMenuElement.parentNode.removeChild(bubbleMenuElement);
			});
		};
	}, [pluginEditor]);
	/**
	* Update the plugin options when props change after the plugin has been initialized.
	* This allows dynamic updates to options like scrollTarget without re-registering the entire plugin.
	*/
	(0, react.useEffect)(() => {
		if (!pluginInitialized || !pluginEditor || pluginEditor.isDestroyed) return;
		if (skipFirstUpdateRef.current) {
			skipFirstUpdateRef.current = false;
			return;
		}
		pluginEditor.view.dispatch(pluginEditor.state.tr.setMeta(resolvedPluginKey, {
			type: "updateOptions",
			options: bubbleMenuPluginPropsRef.current
		}));
	}, [
		pluginInitialized,
		pluginEditor,
		updateDelay,
		resizeDelay,
		shouldShow,
		options,
		appendTo,
		getReferencedVirtualElement,
		resolvedPluginKey
	]);
	return (0, react_dom.createPortal)(children, menuEl.current);
});
//#endregion
//#region src/menus/FloatingMenu.tsx
const FloatingMenu = react.default.forwardRef(({ pluginKey, editor, updateDelay, resizeDelay, appendTo, shouldShow = null, options, children, ...restProps }, ref) => {
	const menuEl = (0, react.useRef)(document.createElement("div"));
	const resolvedPluginKey = (0, react.useRef)(getAutoPluginKey(pluginKey, "floatingMenu")).current;
	useMenuElementProps(menuEl.current, restProps);
	if (typeof ref === "function") ref(menuEl.current);
	else if (ref) ref.current = menuEl.current;
	const { editor: currentEditor } = (0, _tiptap_react.useCurrentEditor)();
	/**
	* The editor instance where the floating menu plugin will be registered.
	*/
	const pluginEditor = editor || currentEditor;
	const floatingMenuPluginProps = {
		updateDelay,
		resizeDelay,
		appendTo,
		pluginKey: resolvedPluginKey,
		shouldShow,
		options
	};
	/**
	* The props for the floating menu plugin. They are accessed inside a ref to
	* avoid running the useEffect hook and re-registering the plugin when the
	* props change.
	*/
	const floatingMenuPluginPropsRef = (0, react.useRef)(floatingMenuPluginProps);
	floatingMenuPluginPropsRef.current = floatingMenuPluginProps;
	/**
	* Track whether the plugin has been initialized, so we only send updates
	* after the initial registration.
	*/
	const [pluginInitialized, setPluginInitialized] = (0, react.useState)(false);
	/**
	* Track whether we need to skip the first options update dispatch.
	* This prevents unnecessary updates right after plugin initialization.
	*/
	const skipFirstUpdateRef = (0, react.useRef)(true);
	(0, react.useEffect)(() => {
		if (pluginEditor === null || pluginEditor === void 0 ? void 0 : pluginEditor.isDestroyed) return;
		if (!pluginEditor) {
			console.warn("FloatingMenu component is not rendered inside of an editor component or does not have editor prop.");
			return;
		}
		const floatingMenuElement = menuEl.current;
		floatingMenuElement.style.visibility = "hidden";
		floatingMenuElement.style.position = "absolute";
		const plugin = (0, _tiptap_extension_floating_menu.FloatingMenuPlugin)({
			...floatingMenuPluginPropsRef.current,
			editor: pluginEditor,
			element: floatingMenuElement
		});
		pluginEditor.registerPlugin(plugin);
		const createdPluginKey = floatingMenuPluginPropsRef.current.pluginKey;
		skipFirstUpdateRef.current = true;
		setPluginInitialized(true);
		return () => {
			setPluginInitialized(false);
			pluginEditor.unregisterPlugin(createdPluginKey);
			window.requestAnimationFrame(() => {
				if (floatingMenuElement.parentNode) floatingMenuElement.parentNode.removeChild(floatingMenuElement);
			});
		};
	}, [pluginEditor]);
	/**
	* Update the plugin options when props change after the plugin has been initialized.
	* This allows dynamic updates to options like scrollTarget without re-registering the entire plugin.
	*/
	(0, react.useEffect)(() => {
		if (!pluginInitialized || !pluginEditor || pluginEditor.isDestroyed) return;
		if (skipFirstUpdateRef.current) {
			skipFirstUpdateRef.current = false;
			return;
		}
		pluginEditor.view.dispatch(pluginEditor.state.tr.setMeta(resolvedPluginKey, {
			type: "updateOptions",
			options: floatingMenuPluginPropsRef.current
		}));
	}, [
		pluginInitialized,
		pluginEditor,
		updateDelay,
		resizeDelay,
		shouldShow,
		options,
		appendTo,
		resolvedPluginKey
	]);
	return (0, react_dom.createPortal)(children, menuEl.current);
});
//#endregion
exports.BubbleMenu = BubbleMenu;
exports.FloatingMenu = FloatingMenu;

//# sourceMappingURL=index.cjs.map