/// <reference path="account_home.tsx" />
/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
/// <reference path="account_addresses.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', '../../lib/jx', './account_home', './account_addresses', './account_cart'], function (require, exports, React, ReactDOM, jx, account_home_1, account_addresses_1, account_cart_1) {
    "use strict";
    var AccountDashboard = (function (_super) {
        __extends(AccountDashboard, _super);
        function AccountDashboard(props) {
            _super.call(this, props);
        }
        Object.defineProperty(AccountDashboard.prototype, "content", {
            get: function () {
                return $('#page-content').find('.innerWrapper'); //
            },
            enumerable: true,
            configurable: true
        });
        AccountDashboard.prototype.render = function () {
            return null;
        };
        AccountDashboard.prototype.componentDidMount = function () {
            var _this = this;
            $('#page-content').load('/html/account_dashboard.html', function () {
                _this.resolve_route();
            });
        };
        AccountDashboard.prototype.resolve_route = function () {
            var subview = this.get_subview();
            switch (subview) {
                case 'addresses':
                case 'address':
                    {
                        ReactDOM.render(React.createElement(account_addresses_1.AccountAddressesPage, null), this.content[0]);
                    }
                    break;
                case 'cart':
                    {
                        this.root.find('.tabs').addClass('hidden');
                        $('.page-title h2').html('Cart');
                        $('.page-path').html('Cart');
                        ReactDOM.render(React.createElement(account_cart_1.AccountCart, null), this.content[0]);
                    }
                    break;
                default:
                    {
                        ReactDOM.render(React.createElement(account_home_1.AccountHomePage, null), this.content[0]);
                    }
                    break;
            }
            this.highlight_active_page();
        };
        AccountDashboard.prototype.highlight_active_page = function (__subview) {
            var subview = this.get_subview();
            if (!subview) {
                subview = 'dashboard';
            }
            $('[data-menu]').removeClass('active');
            $('[data-menu="{0}"]'.format(subview)).addClass('active');
            var title = $('[data-menu="{0}"]'.format(subview)).attr('data-title');
            if (!title) {
                title = $('[data-menu="{0}"]'.format(subview)).attr('data-menu');
            }
            $('.page-title h2').html(title);
            $('.page-path').html(title);
        };
        return AccountDashboard;
    }(jx.Views.HomePage));
    exports.AccountDashboard = AccountDashboard;
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/views/account/account_dashboard.js.map