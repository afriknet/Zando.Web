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
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                            <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                        </div>
                    </div>
                    <h5><a href="detail.html">IncultGeo Print Polo T-Shirt</a></h5>
                    <div className="price">
                        <div>$16.59<span className="price-down">-10%</span></div>
                        <span className="price-old">$15.00</span>
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


    resolve_image() {

        var img = null, prod = this.props.product;


        if (prod['amazon'] && parseInt(prod['amazon']) === 1) {

            var img_url = img = aws.retrieve_pict(prod);
            
            //img =
            //    <div className="">
            //        <div className="product-imitation" style={{ height: '260' }}>
            //            <img alt="products-img" className="scale img-responsive" data-scale="best-fill" data-align="center" src={img_url} />
            //        </div>
            //    </div>

        } else {

            if (prod.images && prod.images.length > 0) {

                var url = img = prod.images[0].file.url;

                //img = <img style={{ width: '100%', height: '100%' }} src={url} alt="products-img"/>
                //return url;
            }

        }


        return img;
    }

}