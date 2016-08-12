/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
/// <reference path="../products/product_modal.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import {ProdModal } from '../products/product_modal';


export class HomePage extends jx.Views.HomePage {

    featured: any[]

    constructor(props?: any) {
        super(props);
        this.featured = [];
    }

    render() {

        return <div id="home-page" className="hidden"></div>
        
    }


    componentDidMount() {

        this.root.load('/html/home.html', () => {

            this.activate_user();

            ReactDOM.render(<FeaturedProductItemList owner={this} />, $('.featured-products')[0]);
            

            $("body").off("click", '.btn-quickview');

            $("body").on("click", '.btn-quickview', (e) => {

                var prodid = $(e.currentTarget).closest('.featured-prod-item').attr('data-prodid')

                var product = _.find(this['products'], p => {
                    return p['id'] === prodid;
                });

                ReactDOM.unmountComponentAtNode($('.modal-placeholder')[0]);

                ReactDOM.render(<ProdModal owner= {this} bsSize= 'lg' classlist= 'quick-view' hide_footer= {true} />, $('.modal-placeholder')[0]);

                this['modal']['showModal'](product);

            });
            
            this.root.removeClass('hidden');
            
        });
    }


    activate_user() {

        carts.display_cart();

        if (this.app.get_account()) {
            $('.my-account').removeClass('hidden');
            $('.my-account').removeClass('hidden');
        }
    }
    
}


class FeaturedProductItemList extends jx.Views.ReactView {

    items: any[];

    constructor(props?: any) {
        super(props);
        this.state.loading = true;
    }


    render() {

        var html =
                    <div>
                        <div className="owl-carousel-placeholder">
                        </div>
                        <ProdModal owner= {this} bsSize= 'lg' classlist= 'quick-view' hide_footer= {true} />
                    </div>

        return html;
        
    }


    load_view(root: JQuery, count: number, loop: boolean): Q.Promise<Boolean> {

        var d = Q.defer<Boolean>();

        this.recursive_load_view(d, root, count, loop);

        return d.promise;
    }


    recursive_load_view(d: Q.Deferred<Boolean>, root: JQuery, count: number, loop: boolean) {

        if (!loop) {
            d.resolve(false);
        }

        var view = $('<div class="prod-item"></div>').appendTo(root);

        var that = this;

        $(view).load('/html/featured_proditem.html', () => {

            var _count = count + 1;

            var _loop = _count < that.items.length;

            this.recursive_load_view(d, root, _count, _loop);
        });

    }


    mount_proditem_list() {

        var owl = $('<div className="owl-carousel featuredProductsSlider"></div>').appendTo(this.root);

        _.each(this.items, itm => {

            var img_url = '/img/home/featured-product/product-01.jpg';

            if (itm.images && itm.images.length > 0) {
                img_url = itm.images[0].file.url;
            }


            var html = `<div class="slide" data-prodid="{0}">
    <div class="productImage clearfix">
        <img src="{1}" alt="featured-product-img">
        <div class="productMasking">
            <ul class="list-inline btn-group" role="group">
                <li><a href="javascript:void(0)" class="btn btn-default"><i class="fa fa-search"></i></a></li>
                <li><a href="javascript:void(0)" class="btn btn-default"><i class="fa fa-shopping-cart"></i></a></li>
                <li><a href="javascript:void(0)" class="btn btn-default btn-qview"><i class="fa fa-eye"></i></a></li>
            </ul>
        </div>
    </div>
    <div class="productCaption clearfix">
        <a href="single-product.html">
            <h5>Mauris efficitur</h5>
        </a>
        <h3>$199</h3>
    </div>
</div>`.format(itm['id'], img_url);

            var $view = $(html);

            $view.appendTo(owl);

            $view.find('img').css({
                'max-height': '285px',
                'max-width': '264px',
                'width': 'auto',
                'height': 'auto'
            });


            $view.find(".rippler")['rippler']({
                effectClass: 'rippler-effect'
                , effectSize: 0      // Default size (width & height)
                , addElement: 'div'   // e.g. 'svg'(feature)
                , duration: 400
            });
            
        });
        
        owl['owlCarousel']({
            loop: true,
            margin: 28,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            nav: true,
            moveSlides: 4,
            dots: false,
            responsive: {
                320: {
                    items: 1
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });

        $('.owl-carousel').on('click', '.btn-qview', (e) => {

            var prodid = $(e.currentTarget).closest('[data-prodid]').attr('data-prodid')

            var product = _.find(this['items'], p => {
                return p['id'] === prodid;
            });

            this['modal']['showModal'](product);
        });
    }


    fill_with_products() {

        var count = 0;

        var views = _.map(this.items, prod => {
            
            return <FeaturedProductItem owner={this} product={prod} ref={"product-no-{0}".format(++count) } />
        });

        return views
    }


    componentDidMount() {
        
        this.load_featured_items().then(() => {
            
            this.setState(_.extend(this.state, {
                loading: false
            }));
        });
    }
    

    componentDidUpdate() {

        this.mount_proditem_list();
    }


    load_featured_items() {

        var d = Q.defer();

        schema.call({
            fn: 'get',
            params: ['/products', {
                where: { active: true },                
                limit: 8
            }]
        }).then(res => {

            this.items = res.response.results;

            this.props.owner['products'] = this.items;

            d.resolve(true);

        }).finally(() => {
            utils.unspin(this.root);
        });

        return d.promise;
    }

}


interface FeaturedProductItemProps extends jx.Views.ReactProps {
    product: any
}
class FeaturedProductItem extends jx.Views.ReactView {

    props: FeaturedProductItemProps;

    constructor(props: FeaturedProductItemProps) {
        super(props)
    }

    render() {
                
        var that = this;
        
        var html =
            <div className="slide featured-prod-item" data-prodid={this.props.product['id']} >
                <div className="productImage clearfix">
                    {this.fill_in_images()}
                    <div className="productMasking">
                        <ul className="list-inline btn-group" role="group">
                            <li>
                                <a data-toggle="modal" href="javascript:void(0)"
                                    onClick={(e) => { that.zoom_proditem(e) } }
                                    className="btn btn-default rippler rippler-inverse">
                                    <i className="fa fa-heart"></i>
                                </a>
                            </li>
                            <li><a href="javascript:void(0)" onClick={(e) => { that.add_to_cart(e) } }
                                    className="btn btn-default rippler rippler-inverse">
                                        <i className="fa fa-shopping-cart"></i>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" className="btn btn-default btn-quickview rippler rippler-inverse">
                                    <i className="fa fa-eye"></i>
                                </a>
                            </li>
                        </ul>
                    </div>                    
                </div>
                <div className="productCaption clearfix">
                    <a href="/">
                        <h5>{this.props.product['name']}</h5>
                    </a>
                    <h3 data-decimal={this.props.product['price']}>{"€{0}".format(this.props.product['price'])}</h3>
                </div>
            </div>
        

        return html;

    }



    componentDidMount() {

        this.root.find('img').css({
            'max-height': '285px',
            'max-width': '264px',
            'width': 'auto',
            'height':'auto'
        });

        this.root.find(".rippler")['rippler']({
            effectClass: 'rippler-effect'
            , effectSize: 0      // Default size (width & height)
            , addElement: 'div'   // e.g. 'svg'(feature)
            , duration: 400
        });

        this.root.data('proditem', this.props.product);
    }
    

    add_to_cart(ev: React.MouseEvent) {

        carts.flyToElement($(ev.currentTarget), $('.products-cart'), () => {
            this.insert_new_cart();
        });        
    }


    zoom_proditem(e: React.MouseEvent) {

        var id = $(e.currentTarget).closest('[data-prodid]').attr('data-prodid');

        this.app.router.navigate('/productitem/{0}'.format(id));
    }


    fill_in_images() {

        if (!this.props.product.images || this.props.product.images.length === 0) {
            return <img src="/img/home/featured-product/product-13.jpg" alt="featured-product-img"/>
        }
        
        var url = this.props.product.images[0].file.url;

        return <img src={url} alt="featured-product-img"/>
        
    }


    insert_new_cart() {

        if (!this.app.get_user()) {
            return;
        }

        var _email = this.app.get_user()['email'];

        if (!_email) {
            toastr.error('no email');
        }

        this.fetch_account().then(acc => {

            this.fetch_cart(acc).then(cart => {

                if (!cart) {

                    this.create_cart();

                } else {

                    this.add_product_to_cart(cart['id']);
                }

            });

        });
    }


    add_product_to_cart(cart_id: any) {

        var d = Q.defer();

        schema.call({
            fn: 'post',
            params: ['/carts/{0}/items'.format(cart_id), {
                product_id: this.props.product['id']
            }]
        }).then(prod => {

            carts.update_cart(this.app.get_user()['email']);

            d.resolve(prod);

        }).fail(err => {

            d.reject(err);
        });

        return d.promise;

    }


    create_cart() {

        var d = Q.defer();

        schema.call({
            fn: 'post',
            params: ['/carts', {
                
                account: {
                    email: this.app.get_user()['email']
                },

                items: [
                    { product_id: this.props.product['id'] }
                ]
            }]
        }).then(cart => {

            carts.update_cart(this.app.get_user()['email']);

            d.resolve(cart);

        }).fail(err => {

            d.reject(err);
        });

        return d.promise;
    }


    fetch_account(): Q.Promise<any> {
        return Q.resolve(this.app.get_account());
    }


    fetch_cart(account: any): Q.Promise<any> {

        var d = Q.defer();

        schema.call({
            fn: 'get',
            params: ['/carts', {
                where: {
                    account_id: account['id'],
                    status: 'active'
                }
            }]
        }).then(res => {

            if (res.response.results.length > 0) {
                d.resolve(res.response.results[0]);
            } else {
                d.resolve(null);
            }
        });

        return d.promise;

    }

}
