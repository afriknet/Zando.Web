// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');


export class CartItemListPage extends base.BasePage {
    
    get_pagecontent() {

        var html = <CartItemsDatalist is_embedded={false} />
        
        return html;
    }
    
}



export interface CartItemsDatalistProps extends jx.Views.ReactProps{
    is_embedded: boolean
}
export class CartItemsDatalist extends jx.Views.ReactView {

    props:CartItemsDatalistProps;
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


    render() {

        var col = 'col-md-10';
        var st_col = {};

        if(this.props.is_embedded){
            col = 'col-md-12';
            st_col = { paddingLeft: 0, paddingRight: 0 };
        }

        var hide_checkout = this.props.is_embedded ? 'hidden' : null;
        var hide_confirm_order = this.props.is_embedded ? '' : 'hidden';


        var html =
            <div className="root-view">
                
                <div className={col} style={st_col}>
                    <div className="title"><span>My Shopping Cart</span></div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-cart">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
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
                
                    <button className={"btn btn-sm pull-right {0}".format(hide_checkout)} type="button">Proceed to Checkout <i className="fa fa-arrow-circle-right" /></button>

                    <button className={"btn btn-sm pull-right {0}".format(hide_confirm_order) }
                        onClick={this.pay_cart.bind(this)}
                        type="button">Pay now <i className="fa fa-arrow-circle-right" /></button>
    
                </div>
                
                {this.add_new_arrivals()}
                
            </div>


        return html;
    }


    pay_cart() {

        this.props.owner['pay_cart']()
    }


    add_new_arrivals(){

        if(this.props.is_embedded){
            return null;
        }

        return <NewArrivals />;
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


                <td className="input-qty text-center">
                    <span>{count}</span>
                    {/*<input type="text" className="input-qty form-control text-center" defaultValue={'{0}'.format(count) } name='' />*/}
                </td>
                <td className="unit"><span data-field="price"></span></td>
                <td className="sub"><span data-field="price_total"></span></td>
                <td className="action text-center">
                    <button className="btn btn-default remove_cart" onClick={this.delete_cart_item.bind(this)} style={{ opacity: 0.6 }}><i className="fa fa-times" /></button> 
                </td>
            </tr>

        return view;
    }


    componentDidMount() {

        super.componentDidMount();

        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart(false);
            
            this.forceUpdate();

        });
    }


    componentDidUpdate() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState(_.extend(this.state, {
                    loading: false
                }), () => {

                    this.root.find('.table-cart tbody > tr > td').css('vertical-align', 'middle');

                    this.currencyfy();

                    // Touchspin
                    //if ($('.input-qty')['exist']()) {
                    //    $('.input-qty input')['TouchSpin']();
                    //}
                });

            });

        }
    }


    delete_cart_item(e: Event) {

        var prodid = $(e.currentTarget).closest('tr').attr('data-prodid');

        utils.can_delete({
            title: 'Voulez-vous reellement retirer cet article?',
            text: ''
        }).then(ok => {

            var items:any = _.filter(this.cart['items'], item => {
                return item['product_id'] === prodid
            });


            var loop = items.length > 0;
            var index = 0;
            var d = Q.defer();

            utils.spin($('.page-container'));

            this.do_delete_cart_item(d, items[0]['id'], items, 0).then(() => {

                this.setState(_.extend(this.state, {
                    loading: true
                }), () => {

                    jx.carts.update_cart_ui(this.app.get_account()['email'], true)

                });

            }).finally(() => {

                utils.unspin($('.page-container'));

            })
            
        });
    }
    

    do_delete_cart_item(d: Q.Deferred<any>, itemid: string, items: any[], index: number) {
        
        schema.call({
            fn: 'delete',
            params: ['/carts/{0}/items/{1}'.format(this.cart['id'], itemid)]
        }).then((res) => {
            
            if (index < items.length - 1) {

                var i = index + 1;

                var itemid = items[i]['id'];

                return this.do_delete_cart_item(d, itemid, items, i)

            } else {

                return d.resolve(true);
            }

        }).fail(err => {

            return d.reject(false);
        
        });

        return d.promise;
    }
    

    load_data() {

        var d = Q.defer();

        utils.spin(this.root.find('.root-view'));

        this.fetch_carts().finally(() => {

            utils.unspin(this.root.find('.root-view'));

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

        var acc = this.app.get_account();

        if (!acc) {

            return Q.reject(false);

        }

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


export class NewArrivals extends jx.Views.ReactView {
    
    render() {

        var html =
            <div className="col-md-2 hidden-sm hidden-xs">
                <div className="title">
                    <a href="/"><span style={{ marginRight:10 }}>New Arrivals</span> <i className="fa fa-chevron-circle-right" /></a>
                </div>
                <div className="slider widget-slider">
                    <div className="box-product">
                        <div className="img-wrapper">
                            <a href="/">
                                <img src="/mstore/images/demo/p1 (1).jpg" alt="Product" />
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
                        <h6><a href="/">WranglerGrey Printed Slim Fit Round Neck T-Shirt</a></h6>
                        <div className="price">
                            <div>$15</div>
                        </div>
                    </div>
                    <div className="box-product">
                        <div className="img-wrapper">
                            <a href="/">
                                <img src="/mstore/images/demo/p2 (1).jpg" alt="Product" />
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
                            <a href="/">
                                <img src="/mstore/images/demo/p3 (1).jpg" alt="Product" />
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
                        <h6><a href="/">CelioOff White Printed Round Neck T-Shirt</a></h6>
                        <div className="price">
                            <div>$13.57</div>
                        </div>
                    </div>
                </div>
            </div>

        return html;

    }

}