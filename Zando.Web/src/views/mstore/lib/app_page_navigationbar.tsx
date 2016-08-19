// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');


export class PageNavigationBar extends jx.Views.ReactView {


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