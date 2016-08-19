// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');




export class CartItemListPage extends base.BasePage {

    cart: any;
    products: any;


    constructor(props: any) {
        super(props);
        this.state.loading = true;

        this.cart = {
            items: []
        };

        this.products = [];
    }


    get_pagecontent() {

        var html =
            <div>

                {/* Shopping Cart List */}

                <div className="col-md-10">
                    <div className="title"><span>My Shopping Cart</span></div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-cart">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Unit price</th>
                                    <th>SubTotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.map(this.products, prod => {
                                    return this.render_tr(prod);
                                }) }
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-sm pull-left" type="button"><i className="fa fa-arrow-circle-left" /> Continue Shopping</button>
                    <button className="btn btn-sm pull-right" type="button">Proceed to Checkout <i className="fa fa-arrow-circle-right" /></button>
                </div>

                {/* End Shopping Cart List */}
                {/* New Arrivals */}

                <div className="col-md-2 hidden-sm hidden-xs">
                    <div className="title"><span><a href="products.html">New Arrivals <i className="fa fa-chevron-circle-right" /></a></span></div>
                    <div className="slider widget-slider">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img src="images/demo/p1 (1).jpg" alt="Product" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-success">New</span></span>
                                </div>
                                <div className="option">
                                    <a title="Add to Cart" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a title="Compare" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-align-left" /></a>
                                    <a title="Wishlist" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">WranglerGrey Printed Slim Fit Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$15</div>
                            </div>
                        </div>
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img src="images/demo/p2 (1).jpg" alt="Product" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-success">New</span></span>
                                </div>
                                <div className="option">
                                    <a title="Add to Cart" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a title="Compare" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-align-left" /></a>
                                    <a title="Wishlist" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">CelioKhaki Printed Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$19.61</div>
                            </div>
                        </div>
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img src="images/demo/p3 (1).jpg" alt="Product" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-success">New</span></span>
                                </div>
                                <div className="option">
                                    <a title="Add to Cart" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a title="Compare" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-align-left" /></a>
                                    <a title="Wishlist" data-placement="bottom" data-toggle="tooltip" href="#"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">CelioOff White Printed Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$13.57</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End New Arrivals */}
            </div>


        return html;
    }


    render_tr(prod: any) {

        var items = _.filter(this.cart['items'], item => {

            return item['product_id'] === prod['id']
        });

        var count = items.length;
        
        var url_img = this.resolve_image(prod);


        var view =
            <tr data-prodid={'{0}'.format(prod['id']) }>

                <td className="img-cart">
                    <a href="#">
                        <img className="img-thumbnail" src={url_img} alt="Product" />
                    </a>
                </td>

                <td>
                    <p><a href="#" style={{ textTransform: 'lowercase' }}>{prod['name']}</a></p>
                    <small>Size: M</small>
                </td>

                {/* defaultValue={1} name */}
                <td className="input-qty"><input type="text" className="input-qty form-control text-center" defaultValue={'{0}'.format(count)} name='' /></td>
                <td className="unit"><span data-field="price"></span></td>
                <td className="sub"><span data-field="price_total"></span></td>
                <td className="action">
                    <a data-original-title="Update" data-toggle="tooltip" data-placement="top" rel="2" className="remove_cart" href="#"><i className="fa fa-refresh" /></a>&nbsp;
                    <a data-original-title="Remove" data-toggle="tooltip" data-placement="top" rel="2" className="remove_cart" href="#"><i className="fa fa-trash-o" /></a>
                </td>
            </tr>

        return view;
    }


    componentDidMount() {

        super.componentDidMount();

        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart();

            this.forceUpdate();

        });
    }


    componentDidUpdate() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState(_.extend(this.state, {
                    loading: false
                }), () => {

                    this.currencyfy();

                });

            });
            
        }

    }


    load_data() {

        var d = Q.defer();

        utils.spin(this.root);

        this.fetch_carts().finally(() => {

            utils.unspin(this.root);

            d.resolve(true);
        });

        return d.promise;
    }


    fetch_products_of_carts() {

        var d = Q.defer();

        var item_ids = [];

        _.each(this.cart['items'], (item: any) => {
            item_ids.push(item.product_id);
        });


        schema.call({
            fn: 'get',
            params: ['/products', { 'id': { $in: item_ids } }]
        }).then(res => {

            this.products = [];

            if (res.response && res.response.results) {
                this.products = res.response.results;
            }

            d.resolve(true);

        }).fail(err => {

            d.reject(false);
        });

        return d.promise;
    }


    fetch_carts() {

        var d = Q.defer();

        var id = this.app.get_account()['id'];

        schema.call({
            fn: 'get',
            params: ['/carts', {
                where: {
                    account_id: id,
                    status: 'active'
                    //processed: false
                }
            }]
        }).then(res => {

            if (res.response && res.response.results) {
                this.cart = res.response.results[0];
            }

            this.fetch_products_of_carts().finally(() => {

                d.resolve(true);
            });

        });

        return d.promise;
    }


    currencyfy() {

        var that = this;

        this.jget('.table-cart tbody > tr').each((i, el) => {

            var prodid = $(el).attr('data-prodid');

            var item = _.find(that.cart['items'], item => item['product_id'] === prodid);

            $(el).find('[data-field="price"]')['autoNumeric']('init', { 'aSign': '€' });
            $(el).find('[data-field="price"]')['autoNumeric']('set', item['price']);

            $(el).find('[data-field="price_total"]')['autoNumeric']('init', { 'aSign': '€' });
            $(el).find('[data-field="price_total"]')['autoNumeric']('set', item['price_total']);

        });
        
    }


    resolve_image(product: any) {

        var img = null, prod = product;


        if (prod['amazon'] && parseInt(prod['amazon']) === 1) {

            var img_url = img = aws.retrieve_pict(prod);

        } else {

            if (prod.images && prod.images.length > 0) {

                var url = img = prod.images[0].file.url;
            }
        }
        
        return img;
    }
}


interface TableRowsCartItemListProps extends jx.Views.ReactProps {
}
interface TableRowsCartItemListState extends jx.Views.ReactState {
}
export class TableRowsCartItemList extends jx.Views.ReactView {


    state: TableRowsCartItemListState;
    props: TableRowsCartItemListProps;
    cart: any;
    products: any;


    constructor(props: TableRowsCartItemListProps) {
        super(props);
        this.state.loading = true;
    }


    render() {

        if (this.state.loading) {
            return <div></div>
        }


        var html: any =
            <tbody>
                {_.map(this.cart['items'], item => {
                    return this.render_tr(item);
                }) }
            </tbody>
        
        return html;
            
    }


    render_tr(item: any) {

        var prod = _.find(this.products, p => {
            return p['id'] === item['product_id']
        });


        var url_img = this.resolve_image(prod);


        var view =
            <tr>
                <td className="img-cart">
                    <a href="#">
                        <img className="img-thumbnail" src={url_img} alt="Product" />
                    </a>
                </td>
                <td>
                    <p><a href="#" style={{ textTransform: 'lowercase' }}>{prod['name']}</a></p>
                    <small>Size: M</small>
                </td>
                {/* defaultValue={1} name */}
                <td className="input-qty"><input type="text" className="input-qty form-control text-center" defaultValue="1" name='' /></td>
                <td className="unit">$15.99</td>
                <td className="sub">$15.99</td>
                <td className="action">
                    <a data-original-title="Update" data-toggle="tooltip" data-placement="top" rel="2" className="remove_cart" href="#"><i className="fa fa-refresh" /></a>&nbsp;
                    <a data-original-title="Remove" data-toggle="tooltip" data-placement="top" rel="2" className="remove_cart" href="#"><i className="fa fa-trash-o" /></a>
                </td>
            </tr>

        return view;
    }


    resolve_image(product:any) {

        var img = null, prod = product;


        if (prod['amazon'] && parseInt(prod['amazon']) === 1) {

            var img_url = img = aws.retrieve_pict(prod);

        } else {

            if (prod.images && prod.images.length > 0) {

                var url = img = prod.images[0].file.url;
            }

        }


        return img;
    }


    componentDidMount() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState(_.extend(this.state, {
                    loading: false
                }), () => {

                    this.currencyfy();

                });

            });
        }

    }


    componentDidUpdate() {

        if (this.state.loading) {

            this.setState(_.extend(this.state, {
                loading: false
            }), () => {

                this.currencyfy();

            });
        }

    }


    load_data() {

        var d = Q.defer();

        utils.spin(this.root);

        this.fetch_carts().finally(()=>{

            utils.unspin(this.root);

            d.resolve(true);
        });

        return d.promise;
    }


    fetch_products_of_carts() {

        var d = Q.defer();

        var item_ids = [];

        _.each(this.cart['items'], (item: any) => {
            item_ids.push(item.product_id);
        });


        schema.call({
            fn: 'get',
            params: ['/products', { 'id': { $in: item_ids } }]
        }).then(res => {

            this.products = [];

            if (res.response && res.response.results) {
                this.products = res.response.results;
            }

            d.resolve(true);

        }).fail(err => {

            d.reject(false);
        });

        return d.promise;
    }


    fetch_carts() {

        var d = Q.defer();

        var id = this.app.get_account()['id'];

        schema.call({
            fn: 'get',
            params: ['/carts', {
                where: {
                    account_id: id,
                    status: 'active'
                    //processed: false
                }
            }]
        }).then(res => {

            if (res.response && res.response.results) {
                this.cart = res.response.results[0];
            }

            this.fetch_products_of_carts().finally(() => {

                d.resolve(true);
            });

        });

        return d.promise;
    }


    currencyfy() {

        var that = this;

        this.jget('[data-curr]').each((i, el) => {

            $(el)['autoNumeric']('init', { 'aSign': '€' });

            var field = $(el).attr('data-curr');

            $(el)['autoNumeric']('set', that.cart[field]);

        });
    }

}