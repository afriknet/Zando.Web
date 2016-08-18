// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');

export class BasePage extends jx.Views.ReactView {

    render() {

        var html =

            <div>

                <PageHeader />

                <PageSubHeader />

                <PageNavigationBar />

                <div className="container">

                    {this.get_pagecontent()}
                    
                </div>

                <PageFooter />

            </div>

        return html;

    }


    get_pagecontent() {
        return null;
    }

}


class PageHeader extends jx.Views.ReactView {

    render() {

        var html =

            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="pull-left header-language">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" id="dropdownLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img alt="English" src="/mstore/images/en.jpg" />English <i className="fa fa-caret-down" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownLanguage">
                                        <li><a href="#"><img alt="English" src="/mstore/images/en.jpg" />English</a></li>
                                        <li><a href="#"><img alt="French" src="/mstore/images/fr.jpg" />French</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pull-left">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" id="dropdownCurrency" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        USD <i className="fa fa-caret-down" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownCurrency">
                                        <li><a href="#">$ Dollar</a></li>
                                        <li><a href="#">£ Pound</a></li>
                                        <li><a href="#">€ Euro</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pull-left hidden-xs"><a href="#"><i className="fa fa-phone" /> +123-456-789</a></div>
                            <div className="pull-left hidden-xs"><a href="mailto:cs@domain.tld"><i className="fa fa-envelope" /> cs @domain.tld</a></div>
                            <div className="pull-right header-account">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" id="dropdownAccount" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span><i className="fa fa-user" /> My Account <i className="fa fa-caret-down" /></span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownAccount">
                                        <li><a href="#">Orders</a></li>
                                        <li><a href="#">Vouchers</a></li>
                                        <li><a href="#">Points</a></li>
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pull-right hidden-xs"><a href="compare.html"><i className="fa fa-align-left" /> Compare (4) </a></div>
                            <div className="pull-right hidden-xs"><a href="wishlist.html"><i className="fa fa-heart" /> Wishlist (3) </a></div>
                        </div>
                    </div>
                </div>
            </div>


        return html;

    }
}


class PageSubHeader extends jx.Views.ReactView {

    render() {

        var html =

            <div className="middle-header">
                <div className="container">
                    <div className="main-header">
                        <div className="row">
                            <div className="col-md-3 logo">
                                <a href="/">
                                    {/*<img alt="Logo" src="/mstore/images/logo-blue.png" />*/}
                                    <table cellSpacing={2}>
                                        <tbody><tr>
                                            <td>
                                                <i className="fa fa-shopping-bag fa-2x" style={{ color: '#47bac1', marginRight: 5, marginTop: 3 }} />
                                            </td>
                                            <td style={{ paddingTop: 10 }}>
                                                <span style={{ fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif', fontSize: 30, fontWeight: 300 }}>
                                                    <span style={{ color: 'gray' }}>Afriknet</span><span style={{ color: '#47bac1' }}>Market</span>
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
                                    </div>{/*
                            */}<div className="form-group search-category hidden-xs">
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
                                <button type="button" className="btn btn-default dropdown-toggle" id="dropdown-cart" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    <i className="fa fa-shopping-cart" /> Shopping Cart: 3 items <i className="fa fa-caret-down" />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-cart">
                                    <div className="media">
                                        <div className="media-left">
                                            <a href="detail.html"><img className="media-object" src="/mstore/images/demo/p1-small (1).jpg" width={50} alt="product" /></a>
                                        </div>
                                        <div className="media-body">
                                            <a href="detail.html" className="media-heading">WranglerGrey Printed Slim Fit Round Neck T-Shirt</a>
                                            <div>x 1 $15.99</div>
                                        </div>
                                        <div className="media-right"><a href="#"><i className="fa fa-remove" /></a></div>
                                    </div>
                                    <div className="media">
                                        <div className="media-left">
                                            <a href="detail.html"><img className="media-object" src="/mstore/images/demo/p2-small (1).jpg" width={50} alt="product" /></a>
                                        </div>
                                        <div className="media-body">
                                            <a href="detail.html" className="media-heading">CelioKhaki Printed Round Neck T-Shirt</a>
                                            <div>x 1 $19.61</div>
                                        </div>
                                        <div className="media-right"><a href="#"><i className="fa fa-remove" /></a></div>
                                    </div>
                                    <div className="media">
                                        <div className="media-left">
                                            <a href="detail.html"><img className="media-object" src="/mstore/images/demo/p3-small (1).jpg" width={50} alt="product" /></a>
                                        </div>
                                        <div className="media-body">
                                            <a href="detail.html" className="media-heading">CelioOff White Printed Round Neck T-Shirt</a>
                                            <div>x 1 $13.57</div>
                                        </div>
                                        <div className="media-right"><a href="#"><i className="fa fa-remove" /></a></div>
                                    </div>
                                    <div className="subtotal-cart">Subtotal: <span>$49.17</span></div>
                                    <div className="text-center chart-checkout-btn">
                                        <div className="btn-group" role="group" aria-label="View Cart and Checkout Button">
                                            <button className="btn btn-default btn-sm" type="button"><i className="fa fa-shopping-cart" /> View Cart</button>
                                            <button className="btn btn-default btn-sm" type="button"><i className="fa fa-check" /> Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        return html;
    }
}


class PageNavigationBar extends jx.Views.ReactView {


    render() {

        var html =
            <nav className="navbar navbar-default" role="navigation">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-ex1-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a href="cart.html" className="visible-xs btn-cart-xs pull-right">
                                <button type="button" className="btn btn-default"><i className="fa fa-shopping-cart" /> Cart: 3 items</button>
                            </a>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-ex1-collapse">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="/">Home</a></li>
                                <li><a href="/products">Products</a></li>
                                <li><a href="/">Shopping Cart</a></li>
                                <li><a href="/">Checkout</a></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        Pages <span className="caret" />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a href="about.html">About Us</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="blog-detail.html">Blog Detail</a></li>
                                        <li><a href="compare.html">Compare</a></li>
                                        <li><a href="contact.html">Contact Us</a></li>
                                        <li><a href="index-2.html">Home v2</a></li>
                                        <li><a href="login.html">Login</a></li>
                                        <li><a href="detail.html">Product Detail</a></li>
                                        <li><a href="register.html">Register</a></li>
                                        <li><a href="typography.html">Typography</a></li>
                                        <li><a href="wishlist.html">Wishlist</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>


        return html;
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
                        <a href="products.html"><span>New Arrivals</span> <i className="fa fa-chevron-circle-right" style={{ marginLeft: 5 }} /></a>
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
                        <a href="products.html"><span>Best Selling</span> <i className="fa fa-chevron-circle-right" style={{ marginLeft: 5 }} /></a>
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



class PageFooter extends jx.Views.ReactView {

    render() {

        var html =

            <div className="footer">

                <div className="container">

                    <div className="row">

                        <div className="col-md-3 col-sm-6">
                            <h4>About Us</h4>
                            <ul>
                                <li>
                                    Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et doloremmagna aliqua.Ut enim ad minim... <a href="#">Read More</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <h4>Information</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> FAQ</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Policy Privacy</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Terms and Conditions</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Shipping Methods</a></li>
                            </ul>
                        </div>
                        <div className="clearfix visible-sm-block" />

                        <div className="col-md-3 col-sm-6">
                            <h4>Categories</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Cras justo odio</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Dapibus ac facilisis in</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Morbi leo risus</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Porta ac consectetur ac</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>Newsletter</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum, soluta, tempora, ipsa voluptatibus porro vel laboriosam</p>
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Email Address" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default subscribe-button" type="button">Subscribe</button>
                                </span>
                            </div>
                        </div>

                    </div>


                    <div className="row">

                        <div className="col-md-3 col-sm-6">
                            <h4>Our Store</h4>
                            <ul className="footer-icon">
                                <li><span><i className="fa fa-map-marker" /></span> 212 Lorem Ipsum.Dolor Sit, Amet</li>
                                <li><span><i className="fa fa-phone" /></span> +123-456-789</li>
                                <li><span><i className="fa fa-envelope" /></span> <a href="mailto:cs@domain.tld">cs @domain.tld</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>Follow Us</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum</p>
                            <ul className="follow-us">
                                <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                <li><a href="#"><i className="fa fa-instagram" /></a></li>
                                <li><a href="#"><i className="fa fa-rss" /></a></li>
                            </ul>
                        </div>
                        <div className="clearfix visible-sm-block" />
                        <div className="col-md-3 col-sm-6">
                            <h4>Payment Method</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum, soluta, tempora, ipsa voluptatibus porro vel laboriosam</p>
                            <img src="/mstore/images/payment-1.png" alt="Payment-1" />
                            <img src="/mstore/images/payment-2.png" alt="Payment-2" />
                            <img src="/mstore/images/payment-3.png" alt="Payment-3" />
                            <img src="/mstore/images/payment-4.png" alt="Payment-4" />
                            <img src="/mstore/images/payment-5.png" alt="Payment-5" />
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>My Account</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Orders</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Vouchers</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Points</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Logout</a></li>
                            </ul>
                        </div>

                    </div>


                    <div className="text-center copyright">
                        Copyright © 2016 Mimity All right reserved
                    </div>

                    <a href="#top" className="back-top text-center" onClick={() => { $('body,html').animate({ scrollTop: 0 }, 500); return false } }>
                        <i className="fa fa-angle-double-up" />
                    </a>

                    <div className="chooser chooser-hide">
                        <div className="chooser-toggle"><button className="btn btn-warning"><i className="fa fa-paint-brush bigger-130" /></button></div>
                        <div className="chooser-content">
                            <label>Color</label>
                            <select name="color-chooser" id="color-chooser" className="form-control">
                                <option value="blue">Blue</option>
                                <option value="red">Red</option>
                                <option value="teal">Teal</option>
                                <option value="brown">Brown</option>
                            </select>
                        </div>
                    </div>

                </div>

                {/*
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <h4>About Us</h4>
                            <ul>
                                <li>
                                    Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et doloremmagna aliqua.Ut enim ad minim... <a href="#">Read More</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>Information</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> FAQ</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Policy Privacy</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Terms and Conditions</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Shipping Methods</a></li>
                            </ul>
                        </div>
                        <div className="clearfix visible-sm-block" />
                        <div className="col-md-3 col-sm-6">
                            <h4>Categories</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Cras justo odio</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Dapibus ac facilisis in</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Morbi leo risus</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Porta ac consectetur ac</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>Newsletter</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum, soluta, tempora, ipsa voluptatibus porro vel laboriosam</p>
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Email Address" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default subscribe-button" type="button">Subscribe</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row" 1 >
                        <div className="col-md-3 col-sm-6">
                            <h4>Our Store</h4>
                            <ul className="footer-icon">
                                <li><span><i className="fa fa-map-marker" /></span> 212 Lorem Ipsum.Dolor Sit, Amet</li>
                                <li><span><i className="fa fa-phone" /></span> +123-456-789</li>
                                <li><span><i className="fa fa-envelope" /></span> <a href="mailto:cs@domain.tld">cs @domain.tld</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>Follow Us</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum</p>
                            <ul className="follow-us">
                                <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                <li><a href="#"><i className="fa fa-instagram" /></a></li>
                                <li><a href="#"><i className="fa fa-rss" /></a></li>
                            </ul>
                        </div>
                        <div className="clearfix visible-sm-block" />
                        <div className="col-md-3 col-sm-6">
                            <h4>Payment Method</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Voluptatum, soluta, tempora, ipsa voluptatibus porro vel laboriosam</p>
                            <img src="/mstore/images/payment-1.png" alt="Payment-1" />
                            <img src="/mstore/images/payment-2.png" alt="Payment-2" />
                            <img src="/mstore/images/payment-3.png" alt="Payment-3" />
                            <img src="/mstore/images/payment-4.png" alt="Payment-4" />
                            <img src="/mstore/images/payment-5.png" alt="Payment-5" />
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <h4>My Account</h4>
                            <ul>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Orders</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Vouchers</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Points</a></li>
                                <li><a href="#"><i className="fa fa-angle-double-right" /> Logout</a></li>
                            </ul>
                        </div>
                    </div 2>
                </div>
                <div className="text-center copyright">
                    Copyright © 2016 Mimity All right reserved
                </div>
            </div>
            <a href="#top" className="back-top text-center" onClick={() => { $('body,html').animate({ scrollTop: 0 }, 500); return false } }>
                <i className="fa fa-angle-double-up" />
            </a>
            <div className="chooser chooser-hide">
                <div className="chooser-toggle"><button className="btn btn-warning"><i className="fa fa-paint-brush bigger-130" /></button></div>
                <div className="chooser-content">
                    <label>Color</label>
                    <select name="color-chooser" id="color-chooser" className="form-control">
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="teal">Teal</option>
                        <option value="brown">Brown</option>
                    </select>
                */}

            </div>


        return html;
    }
}