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
define(["require", "exports", 'react', 'react-dom', '../../lib/jx', '../../lib/controls'], function (require, exports, React, ReactDOM, jx, controls_1) {
    "use strict";
    var AccountCart = (function (_super) {
        __extends(AccountCart, _super);
        function AccountCart(props) {
            _super.call(this, props);
            this.state.loading = true;
        }
        AccountCart.prototype.render = function () {
            var html = React.createElement("div", null, React.createElement(controls_1.BigLabel, {label: "Cart items"}), React.createElement("hr", null), React.createElement("div", {className: "row"}, React.createElement("div", {className: "col-xs-12"}, React.createElement("div", {className: "cartListInner"}, React.createElement("form", {action: "#"}, React.createElement("div", {className: "table-responsive"}, React.createElement("table", {className: "table"})))))));
            return html;
        };
        AccountCart.prototype.componentDidMount = function () {
            var _this = this;
            _super.prototype.componentDidMount.call(this);
            if (this.state.loading) {
                this.load_items().then(function () {
                    _this.state.loading = false;
                    _this.init_datatable();
                });
            }
            //lang.localize();
        };
        AccountCart.prototype.componentDidUpdate = function () {
            var _this = this;
            if (this.state.loading) {
                this.load_items().then(function () {
                    _this.state.loading = false;
                    _this.init_datatable();
                });
            }
            else {
                this.state.loading = false;
                this.init_datatable();
            }
        };
        AccountCart.prototype.load_items = function () {
            var _this = this;
            var d = Q.defer();
            utils.spin(this.root);
            this.fetch_carts().finally(function () {
                utils.unspin(_this.root);
                d.resolve(true);
            });
            return d.promise;
        };
        AccountCart.prototype.fetch_items_of_carts = function () {
            var _this = this;
            var d = Q.defer();
            var item_ids = [];
            _.each(this.cart['items'], function (item) {
                item_ids.push(item.product_id);
            });
            schema.call({
                fn: 'get',
                params: ['/products', { 'id': { $in: item_ids } }]
            }).then(function (res) {
                _this.products = [];
                if (res.response && res.response.results) {
                    _this.products = res.response.results;
                }
                d.resolve(true);
            }).fail(function (err) {
                d.reject(false);
            });
            return d.promise;
        };
        AccountCart.prototype.fetch_carts = function () {
            var _this = this;
            var d = Q.defer();
            var id = this.app.get_account()['id'];
            schema.call({
                fn: 'get',
                params: ['/carts', {
                        where: {
                            account_id: id,
                            status: 'active'
                        }
                    }]
            }).then(function (res) {
                if (res.response && res.response.results) {
                    _this.cart = res.response.results[0];
                }
                _this.fetch_items_of_carts().finally(function () {
                    d.resolve(true);
                });
            });
            return d.promise;
        };
        AccountCart.prototype.init_datatable = function () {
            var _this = this;
            var that = this;
            if (this['table']) {
                this['table'].destroy();
            }
            this['table'] = this.root.find('table').DataTable({
                data: this.cart['items'],
                lengthChange: false,
                searching: false,
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('data-rowid', data['id']);
                },
                initComplete: function () {
                    _this.root.find('table').find('th').css('height', '40px');
                    _this.root.find('table tbody').find('tr').css('height', '55px');
                },
                columns: this.init_columns()
            });
        };
        AccountCart.prototype.init_columns = function () {
            var _this = this;
            var cols = [
                {
                    title: '', data: null, createdCell: function (cell, data) {
                        $(cell).empty();
                        //$(cell).addClass('col-xs-2');
                        var prod = _.find(_this.products, function (p) {
                            return p['id'] === data['product_id'];
                        });
                        var img = null;
                        if (prod.images && prod.images.length > 0) {
                            var url = prod.images[0].file.url;
                            img = React.createElement("span", {className: "cartImage"}, React.createElement("img", {src: url, alt: "image"}));
                        }
                        else {
                            // add empty image
                            img = React.createElement("span", {className: "cartImage"});
                        }
                        ReactDOM.render(img, $(cell)[0]);
                    }
                },
                {
                    title: 'Product', data: null, createdCell: function (cell, data) {
                        $(cell).empty();
                        var prod = _.find(_this.products, function (p) {
                            return p['id'] === data['product_id'];
                        });
                        $(cell).html(prod.name);
                    }
                }
            ];
            /*
    
            // 1. add image column if exists
            if (prod.images && prod.images.length > 0) {
                var url = prod.images[0].file.url;
                tds.push(<td className="col-xs-1"><img src={url} alt="" className="img-response" ></img></td>);
            } else {
                // add empty image
                tds.push(<td className="col-xs-1"></td>);
            }
    
            */
            //if (this.props.select) {
            //    var that = this;
            //    cols.unshift({
            //        title: 'Select', data: null, createdCell: (cell: Node, cellData: any) => {
            //            $(cell).empty();
            //            var label = $('<label></label>').appendTo($(cell));
            //            var input = $('<input type="checkbox" />').appendTo(label);
            //            iCheck.icheck({
            //                $el: input,
            //                onChecked: (e) => {
            //                    var $el = $(e.currentTarget);
            //                    that.root.find('table [type="checkbox"]').removeClass('selected');
            //                    $el.addClass('selected')
            //                    that.root.find('table [type="checkbox"]').not('.selected')['iCheck']('Uncheck');
            //                    //$el['iCheck']('Check');
            //                }
            //            })
            //        }
            //    });
            //} else {
            //    cols.push({
            //        title: '', width: '15%', data: null, createdCell: (cell: Node, cellData: any) => {
            //            $(cell).empty();
            //            var btn_edit = $('<button type="button" class="btn btn-default"><i class="fa fa-pencil" ></i></button>').appendTo($(cell));
            //            var btn_delete = $('<button type="button" class="btn btn-default"><i class="fa fa-times" ></i></button>').appendTo($(cell));
            //            $(btn_edit).click(() => {
            //                this.edit_address($(btn_edit).closest('tr').attr('data-rowid'));
            //            });
            //            $(btn_delete).click(() => {
            //                utils.can_delete().then(() => {
            //                    this.delete_address($(btn_edit).closest('tr').attr('data-rowid')).then(() => {
            //                        this.notify('update-list');
            //                    });
            //                });
            //            });
            //        }
            //    });
            //}
            return cols;
        };
        return AccountCart;
    }(jx.Views.ReactView));
    exports.AccountCart = AccountCart;
});
/*
<thead>
    <tr>
        <th></th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Sub Total</th>
    </tr>
</thead>
<tbody>

    <tr>
        <td className="col-xs-2">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times; </span>
            </button>
            <span className="cartImage"><img src="/img/products/cart-image.jpg" alt="image"/></span>
        </td>
        <td className="col-xs-4">Italian Winter Hat</td>
        <td className="col-xs-2">$ 99.00</td>
        <td className="col-xs-2"><input type="text" placeholder="1"/></td>
        <td className="col-xs-2">$ 99.00</td>
    </tr>
    <tr>
        <td className="col-xs-2">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times; </span>
            </button>
            <span className="cartImage"><img src="/img/products/cart-image.jpg" alt="image"/></span>
        </td>
        <td className="col-xs-4">Italian Winter Hat</td>
        <td className="col-xs-2">$ 99.00</td>
        <td className="col-xs-2"><input type="text" placeholder="1"/></td>
        <td className="col-xs-2">$ 99.00</td>
    </tr>

</tbody>
*/ 
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/views/account/account_cart.js.map