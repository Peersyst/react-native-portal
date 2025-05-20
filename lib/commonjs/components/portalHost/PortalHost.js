"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalHost = void 0;
var _react = _interopRequireWildcard(require("react"));
var _usePortalState = require("../../hooks/usePortalState");
var _usePortal = require("../../hooks/usePortal");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PortalHostComponent = ({
  name
}) => {
  //#region hooks
  const state = (0, _usePortalState.usePortalState)(name);
  const {
    registerHost,
    deregisterHost
  } = (0, _usePortal.usePortal)(name);
  //#endregion

  //#region effects
  (0, _react.useEffect)(() => {
    registerHost();
    return () => {
      deregisterHost();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region render
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, state.map(item => item.node));
  //#endregion
};
const PortalHost = exports.PortalHost = /*#__PURE__*/(0, _react.memo)(PortalHostComponent);
PortalHost.displayName = 'PortalHost';
//# sourceMappingURL=PortalHost.js.map