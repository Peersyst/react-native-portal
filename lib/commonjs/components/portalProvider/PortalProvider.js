"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _PortalHost = require("../portalHost/PortalHost");
var _portal = require("../../contexts/portal");
var _constants = require("../../state/constants");
var _reducer = require("../../state/reducer");
var _itsFine = require("its-fine");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const PortalProviderComponent = ({
  rootHostName = 'root',
  shouldAddRootHost = true,
  children
}) => {
  const [state, dispatch] = (0, _react.useReducer)(_reducer.reducer, _constants.INITIAL_STATE);
  return /*#__PURE__*/_react.default.createElement(_itsFine.FiberProvider, null, /*#__PURE__*/_react.default.createElement(_portal.PortalDispatchContext.Provider, {
    value: dispatch
  }, /*#__PURE__*/_react.default.createElement(_portal.PortalStateContext.Provider, {
    value: state
  }, children, shouldAddRootHost && /*#__PURE__*/_react.default.createElement(_PortalHost.PortalHost, {
    name: rootHostName
  }))));
};
const PortalProvider = exports.PortalProvider = /*#__PURE__*/(0, _react.memo)(PortalProviderComponent);
PortalProvider.displayName = 'PortalProvider';
//# sourceMappingURL=PortalProvider.js.map