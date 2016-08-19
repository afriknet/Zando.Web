// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');


export class PageFooter extends jx.Views.ReactView {

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
                        <div className="chooser-toggle hidden"><button className="btn btn-warning"><i className="fa fa-paint-brush bigger-130" /></button></div>
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

            </div>


        return html;
    }
}