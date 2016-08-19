/// <reference path="../lib/app_page.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');



export class HomePage extends base.BasePage {
    
    get_pagecontent() {
        return [<HomeMainContentSlider />, <HomeMainContentFeatures />]
    }

    componentDidMount() {

        super.componentDidMount();


        $.getScript('/mstore/js/owl.carousel.min.js', () => {

            $.getScript('/mstore/js/mimity.js', () => {

                jx.carts.display_cart();
            });

        });

    }
}

class HomeMainContentSlider extends jx.Views.ReactView {


    render() {

        var html =

            <div className="row">

                {/* Slider */}
                <div className="col-lg-9">
                    <div className="slider home-slider">
                        <div className="item">
                            <a href="products.html"><img src="/mstore/images/demo/slide-1.jpg" alt="Slider" /></a>
                        </div>
                        <div className="item">
                            <a href="products.html"><img src="/mstore/images/demo/slide-2.jpg" alt="Slider" /></a>
                        </div>
                        <div className="item">
                            <a href="products.html"><img src="/mstore/images/demo/slide-3.jpg" alt="Slider" /></a>
                        </div>
                    </div>
                </div>
                {/* End Slider */}


                {/* Product Selection, visible only on large desktop */}
                <div className="col-lg-3 visible-lg">
                    <div className="slider widget-slider">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/vneck3.jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-danger">Hot Item</span></span>
                                    <span className="label-tags"><a href="#"><span className="label label-success">Link Tag</span></a></span>
                                    <span className="label-tags"><span className="label label-warning">Tags</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">WranglerBlack V Neck T Shirt</a></h6>
                            <div className="price">
                                <div>$12.00</div>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(20 reviews) </a>
                            </div>
                        </div>
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/vneck1.jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-danger">Hot Item</span></span>
                                    <span className="label-tags"><a href="#"><span className="label label-success">Link Tag</span></a></span>
                                    <span className="label-tags"><span className="label label-warning">Tags</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">PhosphorusGrey Melange Printed V Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$5.25</div>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <i className="ace-icon fa fa-star-o" />
                                <a href="#">(10 reviews) </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Product Selection */}
            </div>


        return html;

    }
}

class HomeMainContentFeatures extends jx.Views.ReactView {


    render() {

        var html =
            <div className="row">
                {/* New Arrivals & Best Selling */}
                <div className="col-md-3">
                    <div className="title">
                        <a href="products.html"><span>New Arrivals</span> <i className="fa fa-chevron-circle-right" style={{ marginLeft:5 }} /></a>
                    </div>
                    <div className="slider widget-slider">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/p1 (1).jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-success">New</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
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
                                    <img alt="Product" src="/mstore/images/demo/p2 (1).jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-success">New</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
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
                                    <img alt="Product" src="/mstore/images/demo/p3 (1).jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-success">New</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">CelioOff White Printed Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$13.57</div>
                            </div>
                        </div>
                    </div>
                    <div className="title">
                        <a href="products.html"><span>Best Selling</span> <i className="fa fa-chevron-circle-right" style={{ marginLeft:5 }} /></a>
                    </div>
                    <div className="slider widget-slider">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/p1 (1).jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-primary">Popular</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">WranglerGrey Printed Slim Fit Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$15</div>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(30 reviews) </a>
                            </div>
                        </div>
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/p2 (1).jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-primary">Popular</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">CelioKhaki Printed Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$19.61</div>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(40 reviews) </a>
                            </div>
                        </div>
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/p3 (1).jpg" />
                                </a>
                                <div className="tags tags-left">
                                    <span className="label-tags"><span className="label label-primary">Popular</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">CelioOff White Printed Round Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$13.57</div>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(50 reviews) </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End New Arrivals & Best Selling */}
                <div className="clearfix visible-sm" />
                {/* Featured */}
                <div className="col-md-9">
                    <div className="title"><span>Featured Products</span></div>
                    <div className="col-sm-4 col-md-3 box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/polo1.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-info">Featured</span></span>
                                    <span className="label-tags"><span className="label label-warning">Polo</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">IncultGeo Print Polo T-Shirt</a></h6>
                            <div className="price">
                                <div>$16.59<span className="price-down">-10%</span></div>
                                <span className="price-old">$15.00</span>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(2 reviews) </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3 hidden-xs box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/polo2.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-info">Featured</span></span>
                                    <span className="label-tags"><span className="label label-warning">Polo</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">Tommy HilfigerNavy Blue Printed Polo T-Shirt</a></h6>
                            <div className="price">
                                <div>$45.27<span className="price-down">-10%</span></div>
                                <span className="price-old">$15.00</span>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(3 reviews) </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3 hidden-xs box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/polo3.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-info">Featured</span></span>
                                    <span className="label-tags"><span className="label label-warning">Polo</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">WranglerNavy Blue Solid Polo T-Shirt</a></h6>
                            <div className="price">
                                <div>$25.59<span className="price-down">-10%</span></div>
                                <span className="price-old">$15.00</span>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(4 reviews) </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3 hidden-sm hidden-xs box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/polo4.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-info">Featured</span></span>
                                    <span className="label-tags"><span className="label label-warning">Polo</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">NikeAs Matchup -Pq Grey Polo T-Shirt</a></h6>
                            <div className="price">
                                <div>$15.79<span className="price-down">-10%</span></div>
                                <span className="price-old">$15.00</span>
                            </div>
                            <div className="rating">
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star" />
                                <i className="ace-icon fa fa-star-half-o" />
                                <a href="#">(5 reviews) </a>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix" />
                    <div className="title"><span>V-Neck Collection</span></div>
                    <div className="col-sm-4 col-md-3 box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/vneck1.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-success">Collection</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">PhosphorusGrey Melange Printed V Neck T-Shirt</a></h6>
                            <div className="price">
                                <div>$5.25<span className="price-down">-10%</span></div>
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
                    <div className="col-sm-4 col-md-3 hidden-xs box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/vneck2.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-success">Collection</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">United Colors of BenettonNavy Blue Solid V Neck T Shirt</a></h6>
                            <div className="price">
                                <div>$13.57<span className="price-down">-10%</span></div>
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
                    <div className="col-sm-4 col-md-3 hidden-xs box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/vneck3.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-success">Collection</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">WranglerBlack V Neck T Shirt</a></h6>
                            <div className="price">
                                <div>$12.00<span className="price-down">-10%</span></div>
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
                    <div className="col-sm-4 col-md-3 hidden-sm hidden-xs box-product-outer">
                        <div className="box-product">
                            <div className="img-wrapper">
                                <a href="detail.html">
                                    <img alt="Product" src="/mstore/images/demo/vneck4.jpg" />
                                </a>
                                <div className="tags">
                                    <span className="label-tags"><span className="label label-danger">Sale</span></span>
                                    <span className="label-tags"><span className="label label-success">Collection</span></span>
                                </div>
                                <div className="option">
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Add to Cart"><i className="ace-icon fa fa-shopping-cart" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Compare"><i className="ace-icon fa fa-align-left" /></a>
                                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Wishlist"><i className="ace-icon fa fa-heart" /></a>
                                </div>
                            </div>
                            <h6><a href="detail.html">Tagd New YorkGrey Printed V Neck T-Shirts</a></h6>
                            <div className="price">
                                <div>$8.09<span className="price-down">-10%</span></div>
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
                </div>
                {/* End Featured */}
            </div>


        return html;


    }
}




