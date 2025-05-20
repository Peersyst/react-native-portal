"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Portal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _nonSecure = require("nanoid/non-secure");
var _usePortal = require("../../hooks/usePortal");
var _itsFine = require("its-fine");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const IGNORED_CONTEXTS_DISPLAY_NAMES = ['TextAncestorContext', 'RootTagContext', 'ScrollViewContext', 'VirtualizedListContext'];
const PortalComponent = ({
  name: _providedName,
  hostName,
  handleOnMount: _providedHandleOnMount,
  handleOnUnmount: _providedHandleOnUnmount,
  handleOnUpdate: _providedHandleOnUpdate,
  children
}) => {
  //#region hooks
  const {
    addPortal: addUpdatePortal,
    removePortal
  } = (0, _usePortal.usePortal)(hostName);
  //#endregion

  //#region variables
  const name = (0, _react.useMemo)(() => _providedName || (0, _nonSecure.nanoid)(), [_providedName]);
  // Get context bridge to forward contexts to the portal
  const ContextBridge = (0, _itsFine.useContextBridge)(IGNORED_CONTEXTS_DISPLAY_NAMES);
  const childrenWithContextBridge = (0, _react.useMemo)(() => {
    return /*#__PURE__*/_react.default.createElement(ContextBridge, {
      key: name
    }, children);
  }, [name, children]);
  //#endregion

  //#region refs
  const handleOnMountRef = (0, _react.useRef)();
  const handleOnUnmountRef = (0, _react.useRef)();
  const handleOnUpdateRef = (0, _react.useRef)();
  //#endregion

  //#region callbacks
  const handleOnMount = (0, _react.useCallback)(() => {
    if (_providedHandleOnMount) {
      _providedHandleOnMount(() => addUpdatePortal(name, childrenWithContextBridge));
    } else {
      addUpdatePortal(name, childrenWithContextBridge);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_providedHandleOnMount, addUpdatePortal]);
  handleOnMountRef.current = handleOnMount;
  const handleOnUnmount = (0, _react.useCallback)(() => {
    if (_providedHandleOnUnmount) {
      _providedHandleOnUnmount(() => removePortal(name));
    } else {
      removePortal(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_providedHandleOnUnmount, removePortal]);
  handleOnUnmountRef.current = handleOnUnmount;
  const handleOnUpdate = (0, _react.useCallback)(() => {
    if (_providedHandleOnUpdate) {
      _providedHandleOnUpdate(() => addUpdatePortal(name, childrenWithContextBridge));
    } else {
      addUpdatePortal(name, childrenWithContextBridge);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_providedHandleOnUpdate, addUpdatePortal, childrenWithContextBridge]);
  handleOnUpdateRef.current = handleOnUpdate;
  //#endregion

  //#region effects
  (0, _react.useEffect)(() => {
    var _handleOnMountRef$cur;
    (_handleOnMountRef$cur = handleOnMountRef.current) === null || _handleOnMountRef$cur === void 0 || _handleOnMountRef$cur.call(handleOnMountRef);
    return () => {
      var _handleOnUnmountRef$c;
      (_handleOnUnmountRef$c = handleOnUnmountRef.current) === null || _handleOnUnmountRef$c === void 0 || _handleOnUnmountRef$c.call(handleOnUnmountRef);

      // remove callbacks refs
      handleOnMountRef.current = undefined;
      handleOnUnmountRef.current = undefined;
      handleOnUpdateRef.current = undefined;
    };
  }, []);
  (0, _react.useEffect)(() => {
    var _handleOnUpdateRef$cu;
    (_handleOnUpdateRef$cu = handleOnUpdateRef.current) === null || _handleOnUpdateRef$cu === void 0 || _handleOnUpdateRef$cu.call(handleOnUpdateRef);
  }, [childrenWithContextBridge]);
  //#endregion

  return null;
};
const Portal = exports.Portal = /*#__PURE__*/(0, _react.memo)(PortalComponent);
Portal.displayName = 'Portal';
//# sourceMappingURL=Portal.js.map