// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', '../jx', '../jx'], function (require, exports, React, jx, jx_1) {
    "use strict";
    var Panel = (function (_super) {
        __extends(Panel, _super);
        function Panel(props) {
            _super.call(this, props);
            this.state.style = props.style;
            if (!this.state.style) {
                this.state.style = jx.Types.Bootstrap.Style.default;
            }
        }
        Panel.prototype.resolve_style = function () {
            switch (this.state.style) {
                case jx_1.Types.Bootstrap.Style.primary:
                    return 'panel-primary';
                case jx_1.Types.Bootstrap.Style.success:
                    return 'panel-success';
                case jx_1.Types.Bootstrap.Style.info:
                    return 'panel-info';
                case jx_1.Types.Bootstrap.Style.warning:
                    return 'panel-warning';
                case jx_1.Types.Bootstrap.Style.danger:
                    return 'panel-danger';
                default:
                    return 'panel-default';
            }
        };
        Panel.prototype.render = function () {
            var html = React.createElement("div", {className: 'panel {0}'.format(jx_1.Types.Bootstrap.toString(this.props.style))}, React.createElement("div", {className: "panel-heading"}, this.props.title), React.createElement("div", {className: "panel-body"}, this.props.children));
            return html;
        };
        return Panel;
    }(jx.Views.ReactView));
    exports.Panel = Panel;
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/lib/controls/panel.js.map