/// <reference path="../jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jx'], function (require, exports, jx) {
    "use strict";
    var SubPage = (function (_super) {
        __extends(SubPage, _super);
        function SubPage(props) {
            _super.call(this, props);
        }
        SubPage.prototype.componentDidMount = function () {
        };
        return SubPage;
    }(jx.Views.ReactView));
    exports.SubPage = SubPage;
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/lib/pages/subpage.js.map