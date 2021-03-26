"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var SubRoute = function (_a) {
    var userAuthRoles = _a.userAuthRoles, loginRedirectPath = _a.loginRedirectPath, isUserAuthenticated = _a.isUserAuthenticated, route = __rest(_a, ["userAuthRoles", "loginRedirectPath", "isUserAuthenticated"]);
    // checks if user is permitted from permission arr to usersRole arr
    var isPermitted = function (permissions) {
        return permissions.some(function (permission) { return userAuthRoles.indexOf(permission) !== -1; });
    };
    return (react_1.default.createElement(react_1.Suspense, { fallback: route.fallback },
        react_1.default.createElement(react_router_dom_1.Route, { path: route.path, render: function (props) {
                // check if redirect first
                if (route.redirect) {
                    // loop through redirectes to check the permittability
                    for (var _i = 0, _a = route.redirect; _i < _a.length; _i++) {
                        var redirect = _a[_i];
                        // check if redirect is for protected
                        if (redirect.protected) {
                            // if user authenticated
                            if (isUserAuthenticated) {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect.page });
                            } // if user not auth then redirect to specified fallback redirect
                            else if (redirect.fallbackRedirect) {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect.fallbackRedirect });
                            } // else redirect to login redirect
                            else {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect.page });
                            }
                        }
                        // check if redirect with permissions
                        if (redirect.permissions) {
                            // check if user is permitted
                            if (isPermitted(redirect.permissions)) {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect.page });
                            } // if user not permitted then redirect to specified fallback redirect
                            else if (redirect.fallbackRedirect) {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect.fallbackRedirect });
                            } // else redirect to login redirect
                            else {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: loginRedirectPath });
                            }
                        }
                        // neter protected nor permitted then just redirect
                        else {
                            if (redirect.page) {
                                return react_1.default.createElement(react_router_dom_1.Redirect, { to: redirect.page });
                            }
                        }
                    }
                }
                if (route.protected) {
                    if (isUserAuthenticated) {
                        if (route.component) {
                            return react_1.default.createElement(route.component, __assign({}, props, { routes: route.routes }));
                        }
                    }
                    else if (route.fallbackRouter) {
                        return react_1.default.createElement(react_router_dom_1.Redirect, { to: route.fallbackRouter });
                    }
                    else {
                        return react_1.default.createElement(react_router_dom_1.Redirect, { to: loginRedirectPath });
                    }
                }
                if (route.permissions) {
                    if (isPermitted(route.permissions)) {
                        if (route.component) {
                            return react_1.default.createElement(route.component, __assign({}, props, { routes: route.routes }));
                        }
                    }
                    else if (route.fallbackRouter) {
                        return react_1.default.createElement(react_router_dom_1.Redirect, { to: route.fallbackRouter });
                    }
                    else {
                        return react_1.default.createElement(react_router_dom_1.Redirect, { to: loginRedirectPath });
                    }
                }
                else {
                    if (route.component) {
                        return react_1.default.createElement(route.component, __assign({}, props, { routes: route.routes }));
                    }
                }
            } })));
};
exports.default = SubRoute;
//# sourceMappingURL=SubRoute.js.map