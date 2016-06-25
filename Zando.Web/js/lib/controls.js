/// <reference path="jx.tsx" />
/// <reference path="../../typings/react/react-bootstrap.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', './jx', 'react-bootstrap'], function (require, exports, React, jx, rb) {
    "use strict";
    var b = rb;
    var Ficon = (function (_super) {
        __extends(Ficon, _super);
        function Ficon(props) {
            _super.call(this, props);
        }
        Ficon.prototype.render = function () {
            return React.createElement("i", {className: "fa fa-{0}".format(this.props.icon)});
        };
        return Ficon;
    }(jx.Views.ReactView));
    exports.Ficon = Ficon;
    var BigLabel = (function (_super) {
        __extends(BigLabel, _super);
        function BigLabel(props) {
            _super.call(this, props);
        }
        BigLabel.prototype.render = function () {
            var __style = {
                background: 'transparent'
            };
            var __p_style = {
                fontSize: 32,
                fontWeight: 100
            };
            if (this.props.inline) {
                __style.display = 'inline-block';
                __p_style.display = 'inline-block';
            }
            var html = React.createElement("div", {className: "breadcrumb-wrapper", style: __style}, React.createElement("p", {className: "label-value", style: __p_style}, this.format_label(), this.is_required()));
            return html;
        };
        BigLabel.prototype.format_label = function () {
            if (this.props.lang) {
                return React.createElement("span", {"data-localize": this.props.lang}, "this.props.label");
            }
            else {
                return this.props.label;
            }
        };
        BigLabel.prototype.is_required = function () {
            if (this.props.require) {
                return React.createElement("span", {className: "required"}, "*");
            }
        };
        BigLabel.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            if (this.props.require) {
                this.root.addClass('require');
            }
        };
        return BigLabel;
    }(jx.Views.ReactView));
    exports.BigLabel = BigLabel;
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(props) {
            _super.call(this, props);
        }
        Form.prototype.render = function () {
            return React.createElement("form", null, this.props.children);
        };
        return Form;
    }(jx.Views.ReactView));
    exports.Form = Form;
    var FormGroup = (function (_super) {
        __extends(FormGroup, _super);
        function FormGroup(props) {
            _super.call(this, props);
        }
        FormGroup.prototype.render = function () {
            var default_props = {
                className: 'form-group'
            };
            var props = _.extend(default_props, this.props);
            return React.createElement("div", React.__spread({}, props), this.props.children);
        };
        return FormGroup;
    }(jx.Views.ReactView));
    exports.FormGroup = FormGroup;
    var EditText = (function (_super) {
        __extends(EditText, _super);
        function EditText(props) {
            _super.call(this, props);
        }
        EditText.prototype.render = function () {
            var default_props = {
                className: 'form-control'
            };
            var props = _.extend(default_props, this.props);
            var html = React.createElement("div", React.__spread({}, props), this.props.children);
            return html;
        };
        return EditText;
    }(jx.Views.ReactView));
    exports.EditText = EditText;
    var TableLayout = (function (_super) {
        __extends(TableLayout, _super);
        function TableLayout(props) {
            _super.call(this, props);
        }
        TableLayout.prototype.render = function () {
            var props = _.extend({
                style: { display: 'table' }
            }, this.props);
            var html = React.createElement("div", React.__spread({}, props), React.createElement("div", {style: { display: 'table-row' }}, React.Children.map(this.props.children, function (child) {
                return React.createElement("div", {style: { display: 'table-cell' }}, child);
            })));
            return html;
        };
        return TableLayout;
    }(React.Component));
    exports.TableLayout = TableLayout;
    var TreeView = (function (_super) {
        __extends(TreeView, _super);
        function TreeView(props) {
            _super.call(this, props);
        }
        TreeView.prototype.render = function () {
            var html = React.createElement("div", {id: "nestable2", className: "treeview-root"}, React.createElement("div", {className: "dd root"}, React.createElement("ol", {className: "dd-list"}, this.build_treeview())));
            return html;
        };
        TreeView.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            this.root.find('.root').nestable();
        };
        TreeView.prototype.build_treeview = function () {
            var _this = this;
            return _.map(this.props.data, function (d) {
                return _this.build_treenode(d);
            });
        };
        TreeView.prototype.build_treenode = function (node) {
            var li = React.createElement("li", {className: "dd-item", "data-id": _.result(node, this.props.key_field)}, React.createElement("div", {className: "dd-handle"}, _.result(node, this.props.display_field)), this.build_children_nodes(node));
            return li;
        };
        TreeView.prototype.build_children_nodes = function (parent_node) {
            var _this = this;
            var parent_id = _.result(parent_node, this.props.key_field);
            var children = _.filter(this.props.data, function (d) {
                return _.result(d, _this.props.parent_field) === parent_id;
            });
            if (children.length === 0) {
                return null;
            }
            var ol = React.createElement("ol", {className: "dd-list"}, _.map(children, function (child) {
                return _this.build_treenode(child);
            }));
            return ol;
        };
        return TreeView;
    }(jx.Views.ReactView));
    exports.TreeView = TreeView;
    var TextNumeric = (function (_super) {
        __extends(TextNumeric, _super);
        function TextNumeric(props) {
            _super.call(this, props);
            if (this.props.ctx && this.props.property) {
                this.state.value = _.result(this.props.ctx, this.props.property);
            }
        }
        TextNumeric.prototype.render = function () {
            return React.createElement(b.FormControl, React.__spread({}, this.props, {value: this.state.value}));
        };
        TextNumeric.prototype.componentDidMount = function () {
            var _this = this;
            _super.prototype.componentDidMount.call(this);
            this.root.autoNumeric('init', this.props);
            this.root.on('change', function (e) {
                var __value = $(e.currentTarget).autoNumeric('get');
                if (_this.props.ctx && _this.props.property) {
                    _this.props.ctx[_this.props.property](__value);
                }
                //this.setState(_.extend(this.state, {
                //    value: __value
                //}));
            });
        };
        return TextNumeric;
    }(jx.Views.ReactView));
    exports.TextNumeric = TextNumeric;
    var CheckBox = (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox(props) {
            _super.call(this, props);
        }
        CheckBox.prototype.render = function () {
            var html = React.createElement("div", {className: "checkbox-x custom"}, React.createElement("label", null, React.createElement("input", {type: "checkbox"}), React.createElement("span", {className: "chk-caption"})));
            return html;
        };
        CheckBox.prototype.componentDidMount = function () {
            var _this = this;
            _super.prototype.componentDidMount.call(this);
            this.root.find('input').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio'
            });
            if (this.props.is_checked) {
                this.root.find('input').iCheck('check');
            }
            this.root.find('input').on('ifChecked', function (e) {
                if (_this.props.onchecked) {
                    var img_id = $(e.currentTarget).closest('[data-img-id]').attr('data-img-id');
                    _this.props.onchecked(img_id);
                }
            });
            this.root.find('input').on('ifUnchecked', function (e) {
                if (_this.props.onunchecked) {
                    var img_id = $(e.currentTarget).closest('[data-img-id]').attr('data-img-id');
                    _this.props.onunchecked(img_id);
                }
            });
        };
        return CheckBox;
    }(jx.Views.ReactView));
    exports.CheckBox = CheckBox;
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/lib/controls.js.map