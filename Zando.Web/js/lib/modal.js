/// <reference path="jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-bootstrap', './jx'], function (require, exports, React, reactboot, jx_1) {
    var b = reactboot;
    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(props) {
            _super.call(this, props);
            this.state.show = false;
            if (this.props.showModal != undefined) {
                this.state.show = this.props.showModal;
            }
        }
        Object.defineProperty(Modal.prototype, "asDialog", {
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        Modal.prototype.show = function (content) {
            this.setState({ show: true, content: content });
        };
        Modal.prototype.close = function () {
            this.setState({ show: false });
        };
        Modal.prototype.render = function () {
            var that = this;
            var props = {
                show: this.state.show,
                onHide: function () {
                    that.close();
                }
            };
            if (this.props.bsSize) {
                props.bsSize = this.props.bsSize;
            }
            var action = this.props.action ? this.props.action : 'Save changes';
            var html = React.createElement(b.Modal, React.__spread({}, props), React.createElement(b.Modal.Header, {"closeButton": true}, React.createElement(b.Modal.Title, null)), React.createElement(b.Modal.Body, null, this.state.content), React.createElement(b.Modal.Footer, null, React.createElement(b.Button, {"onClick": function () { that.save(); }, "className": 'btn-save', "bsStyle": "primary"}, action)));
            return html;
        };
        Modal.prototype.save = function () {
            var _this = this;
            if (this.asDialog.onSave) {
                this.asDialog.onSave().then(function (ok) {
                    _this.close();
                });
            }
        };
        return Modal;
    })(jx_1.Views.ReactView);
    exports.Modal = Modal;
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/lib/modal.js.map