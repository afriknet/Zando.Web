/// <reference path="../lib/jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.routes = {
        '/': {
            url: 'home/home',
            descr: 'home'
        },
        '/login': {
            url: 'home/login'
        },
        '/dashboard': {
            url: 'account/account_dashboard'
        },
        '/dashboard/:sub': {
            url: 'account/account_dashboard'
        },
        '/account': {
            url: 'account/account_dashboard'
        },
        '/account/:sub': {
            url: 'account/account_dashboard'
        },
        '/explore': {
            url: 'products/products_browser'
        },
    };
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/config/routes.js.map