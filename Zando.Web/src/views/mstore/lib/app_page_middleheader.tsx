// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');



interface PageMiddelHeaderState extends jx.Views.ReactState {
    data: { prods: any[], items: any[] },
    spin: boolean
}
export class PageMiddleHeader extends jx.Views.ReactView {

    state: PageMiddelHeaderState;
    cart: any;

    constructor(props?: any) {
        super(props);        
    }
    
    render() {

        var teal = '#009688';

        var __count = 'Shopping cart';

        if (this.state.data && this.state.data && this.state.data.prods.length > 0) {
            __count = this.state.data.items.length ? 'Shopping cart: {0}'.format(this.state.data.items.length) : '';
        }
                
        var html =

            <div className="middle-header">
                <div className="container">
                    <div className="main-header">
                        <div className="row">
                            <div className="col-md-3 logo">
                                <a href="/">
                                    {/*<img alt="Logo" src="/mstore/images/logo-blue.png" /> color: '#47bac1', { color: '#47bac1' }*/}
                                    <table cellSpacing={2}>
                                        <tbody><tr>
                                            <td>
                                                <i className="fa fa-shopping-bag fa-2x" style={{ color: teal,  marginRight: 5, marginTop: 10 }} />
                                            </td>
                                            <td style={{ paddingTop: 10 }}>
                                                <span style={{ fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif', fontSize: 30, fontWeight: 300 }}>
                                                    <span style={{ color: 'gray' }}>Afriknet</span><span className="" style={{ color: teal }}>Market</span>
                                                </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </a>
                            </div>
                            <div className="col-sm-8 col-md-6 search-box">
                                <form className="form-inline">
                                    <div className="form-group search-input">
                                        <input type="text" className="form-control" placeholder="Search here..." />
                                    </div>
                                    <div className="form-group search-category hidden-xs">
                                        <select name="category" className="select2">
                                            <option value={'0'}>All Categories</option>
                                            <option value={'1'}>Dresses</option>
                                            <option value={'2'}>Tops</option>
                                            <option value={'3'}>Bottoms</option>
                                            <option value={'4'}>Jumpsuits / Playsuits</option>
                                            <option value={'5'}>Jackets / Coats</option>
                                            <option value={'6'}>Sweaters</option>
                                            <option value={'7'}>Gym Wear</option>
                                            <option value={'8'}>Others</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="search-btn" />
                                </form>
                            </div>
                            <div className="col-sm-4 col-md-3 cart-btn hidden-xs">

                                <button className={"btn btn-default dropdown-toggle {0}".format(this.state.spin ? '' : 'hidden') }>
                                    <i className="fa fa-spin fa-spinner" style={{ marginRight:5 }} /> <span>Shopping cart</span>
                                </button>


                                <button type="button" className={"btn btn-default dropdown-toggle {0}".format(this.state.spin ? 'hidden' : '')}
                                    id="dropdown-cart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <i className="fa fa-shopping-cart" /> {'{0}'.format(__count)} <i className="fa fa-caret-down" />
                                </button>

                                <div className="dropdown-menu dropdown-menu-right cart-items" style={{ maxWidth: '300px!important' }} aria-labelledby="dropdown-cart">
                                    {this.fill_with_items()}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        return html;
    }


    componentDidMount() {

        super.componentDidMount();

        this.app.register_view(jx.constants.middleheader, this);
    }


    componentDidUpdate() {

        super.componentDidUpdate();

        if (this.state.loading) {
            return;
        }

        this.root.find('.product-title')['ellipsis']({
            lines: 2,        
        });
        
        this.root.find('.ellip').css('max-width', '200px');
        
        _.each(this.jget('[data-price]'), el => {
            $(el)['autoNumeric']('init', { 'aSign': '€' });
            $(el)['autoNumeric']('set', $(el).attr('data-price'));
        });


        this.currencyfy();
    }



    componentWillUnmount() {

        this.app.remove_view(jx.constants.middleheader);
    }


    fill_with_items() {

        if (!this.state.data) {
            return null;
        }


        var views =  _.map(this.state.data.prods, prod => {

            var cart_item = _.find(this.state.data.items, itm => {
                return itm.product_id === prod.id;
            });

            var count = _.filter(this.state.data.items, itm => {
                return itm.product_id === prod.id;
            }).length;


            var url_img = null;
            
            if (prod['amazon'] && parseInt(prod['amazon']) === 1) {

                url_img = aws.retrieve_pict(prod);

            } else {

                if (prod.images && prod.images.length > 0) {
                    url_img = prod.images[0].file.url;
                }
            }


            var price = cart_item.price; // numeral(cart_item.price).format('€0,0.00');        
            var qty = cart_item.quantity;

            var width = '20%';

            if (prod['amazon'] && parseInt(prod['amazon']) === 1) {
                width = '5%';
            }


            var _view = 
                <div className="media">
                    <div className="media-left">
                        <a href="#"><img className="media-object" src={url_img} width={50} alt="product" /></a>
                    </div>
                    <div className="media-body" style={{ height:5 }}>
                        <a href="#" className="media-heading" style={{ textTransform: 'lower' }}>
                            <span className="product-title">{prod.name}</span>
                        </a>
                        <div>{'x {0} '.format(count) }<span data-price={prod['price']}></span></div>
                    </div>
                    <div className="media-right"><a href="#"><i className="fa fa-remove" /></a></div>
                </div>

            return _view;
        });


        var sub_total = <div className="subtotal-cart"><span style={{ color:'gray' }}>Subtotal: </span> <span data-curr="sub_total"></span></div>

        views.push(sub_total);


        var _cart_actions = 
            <div className="text-center chart-checkout-btn">
                <div className="btn-group" role="group" aria-label="View Cart and Checkout Button">
                    <button className="btn btn-default btn-sm" type="button" onClick={this.display_cart.bind(this)}><i className="fa fa-shopping-cart"></i> View Cart</button>
                    <button className="btn btn-default btn-sm" type="button" onClick={this.checkout_cart.bind(this) }><i className="fa fa-check"></i> Checkout</button>
                </div>
            </div>

        views.push(_cart_actions);

        return views;
    }


    display_cart() {

        jx.local.set('active-nav-menu', '/cart');

        this.app.router.navigate('/cart');
    }
    

    checkout_cart() {

        jx.local.set('active-nav-menu', '/checkout');

        this.app.router.navigate('/checkout');
    }


    currencyfy() {

        if (this.cart) {

            this.jget('[data-curr]').each((i, el) => {

                $(el)['autoNumeric']('init', { 'aSign': '€' });

                var field = $(el).attr('data-curr');

                $(el)['autoNumeric']('set', this.cart[field]);

            });

        }
        
    }


    begin_updating_cart_ui() {

        this.setState(_.extend(this.state, {
            spin: true
        }))
    }


    end_updating_cart_ui(data:any) {

        this.cart = data['cart'];

        this.setState({
            data: data,
            spin: false
        })

    }


    //update_cart_ui(callback: () => Q.Promise<any>) {

    //    this.setState(_.extend(this.state, {
    //        spin: true
    //    }), () => {

    //        callback().then(data => {

    //            this.cart = data['cart'];

    //            this.setState({
    //                data: data,
    //                spin: false
    //            })

    //        });
            
    //    })

    //}



    fetch_data_for_account(email: string) {

        var d = Q.defer();

        this.fetch_account(email, true).then(acc => {

            this.fetch_items(acc).then(data => {

                d.resolve(data);
                
            });
        });

        return d.promise;
    }


    private fetch_items(acc: any) {

        var d = Q.defer();

        schema.call({
            fn: 'get',
            params: ['/carts', {
                where: {
                    account_id: acc['id'],
                    status: 'active'
                }
            }]
        }).then(res => {

            var cart_id = utils.guid();

            this.cart = res.response.results[0];

            if (res.response.results.length > 0) {
                cart_id = res.response.results[0]['id'];
            }

            this.fetch_items_of_carts(res.response.results).then((data: { prods: any[], items: any[] }) => {

                d.resolve(data);

            })

        })

        return d.promise;
    }


    private fetch_account(__email: string, store_acc?: boolean) {

        var acc = this.app.get_account();

        if (acc) {
            return Q.resolve(acc);
        }

        return schema.call({
            fn: 'get',
            params: ['/accounts', { email: __email }]
        }).then(res => {

            if (store_acc) {

                this.app.internal_store_account(res.response.results[0]);
            }

            return res.response.results[0];
        });
    }


    private fetch_items_of_carts(__carts: any[]) {

        var d = Q.defer();

        var item_ids = [];
        var items: any[] = [];

        _.each(__carts, cart => {

            _.each(cart.items, (item: any) => {

                items.push(item);

                item_ids.push(item.product_id);
            });
        });

        if (item_ids.length === 0) {
            item_ids.push(utils.guid());
        }


        schema.call({
            fn: 'get',
            params: ['/products', { 'id': { $in: item_ids } }]
        }).then(res => {

            var products = [];

            if (res.response && res.response.results) {
                products = res.response.results;
            }

            d.resolve({
                prods: products,
                items: items
            });

        }).fail(err => {

            d.reject(false);
        });

        return d.promise;
    }
}