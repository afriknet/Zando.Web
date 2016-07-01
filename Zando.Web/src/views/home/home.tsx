/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');


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

            ReactDOM.render(<FeaturedProductItemList />, $('.featured-products')[0]);

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
            <div className="owl-carousel featuredProductsSlider">
                {this.fill_with_products()}
            </div>;

        return html;
    }


    fill_with_products() {

        var count = 0;

        var views = _.map(this.items, prod => {

            return <FeaturedProductItem product={prod} ref={"product-no-{0}".format(++count)} />
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

        var owl = $('.owl-carousel.featuredProductsSlider');

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
            <div className="slide">
                <div className="productImage clearfix">
                    {this.fill_in_images()}
                    <div className="productMasking">
                        <ul className="list-inline btn-group" role="group">
                            <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
                            <li><a href="javascript:void(0)" onClick={(e) => { that.add_to_cart(e) } }
                                className="btn btn-default rippler rippler-inverse"><i className="fa fa-shopping-cart"></i></a></li>
                            <li><a data-toggle="modal" href=".quick-view" className="btn btn-default"><i className="fa fa-eye"></i></a></li>
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
    }


    add_to_cart(ev: React.MouseEvent) {

        carts.flyToElement($(ev.currentTarget), $('.products-cart'), () => {

            this.insert_new_cart();

        });

        
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
