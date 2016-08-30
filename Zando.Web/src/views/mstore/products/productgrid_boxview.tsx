// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');




export interface ProductGridBoxViewProps extends jx.Views.ReactProps {
    product:any
}
export class ProductGridBoxView extends jx.Views.ReactView {

    props: ProductGridBoxViewProps;

    render() {

        var html =
            <div className="col-sm-4 col-md-3 box-product-outer" style={{ maxHeight: 355, marginBottom: 20 }}>
                <div className="box-product">
                    <div className="img-wrapper" style={{ height:237 }}>
                        <a href="/products">
                            <img alt="Product" src={this.resolve_image()} />
                        </a>
                        <div className="tags">
                            <span className="label-tags hidden"><span className="label label-danger">Hot Item</span></span>
                        </div>
                        <div className="option">
                            <a href="javascript:void(0)" className="btn-cart" onClick={this.add_to_cart.bind(this) } data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                        </div>
                    </div>
                    <h5><a href="#" className="product-title" style={{ textTransform: 'lowercase' }}>{this.props.product['name']}</a></h5>
                    <div className="price">
                        <div data-price={this.props.product['price']}></div>{/*<span className="price-down">-10%</span>*/}
                        <span className="price-old hidden">$15.00</span>
                    </div>
                    <div className="rating">
                        <i className="ace-icon fa fa-star" />
                        <i className="ace-icon fa fa-star" />
                        <i className="ace-icon fa fa-star" />
                        <i className="ace-icon fa fa-star-half-o" />
                        <i className="ace-icon fa fa-star-o" />
                        <a href="#">(5 reviews) </a>
                    </div>
                </div>
            </div>


        return html;

    } 


    add_to_cart() {

        jx.carts.flyToElement(this.jget('[alt="Product"]'), $('.middle-header .cart-btn'), () => {

            jx.carts.add_product_into_cart(this.props.product);

        });

    }


    resolve_image() {

        var img = null, prod = this.props.product;


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

        this.forceUpdate();
    }


    componentDidUpdate() {

        super.componentDidUpdate();

        this.root.find('.product-title')['ellipsis']({
            lines: 2,
            responsive: true
        });


        _.each(this.jget('[data-price]'), el => {
            $(el)['autoNumeric']('init', { 'aSign': '€' });
            $(el)['autoNumeric']('set', $(el).attr('data-price'));
        });
    }
}
