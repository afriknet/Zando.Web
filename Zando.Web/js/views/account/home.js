/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../lib/jx'], function (require, exports, jx) {
    var DashboardPage = (function (_super) {
        __extends(DashboardPage, _super);
        function DashboardPage() {
            _super.apply(this, arguments);
        }
        DashboardPage.prototype.render = function () {
            return null;
        };
        DashboardPage.prototype.componentDidMount = function () {
            $('#page-content').load('/html/dashboard.html', function () {
            });
        };
        return DashboardPage;
    })(jx.Views.HomePage);
    exports.DashboardPage = DashboardPage;
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/views/account/home.js.map