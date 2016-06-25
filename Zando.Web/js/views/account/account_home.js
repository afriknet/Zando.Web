var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../lib/jx'], function (require, exports, jx) {
    "use strict";
    var AccountHomePage = (function (_super) {
        __extends(AccountHomePage, _super);
        function AccountHomePage() {
            _super.apply(this, arguments);
        }
        AccountHomePage.prototype.render = function () {
            return null;
        };
        AccountHomePage.prototype.componentDidMount = function () {
            carts.display_cart();
            $('.innerWrapper').load('/html/account_home.html', function () {
            });
        };
        return AccountHomePage;
    }(jx.Views.ReactView));
    exports.AccountHomePage = AccountHomePage;
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/views/account/account_home.js.map