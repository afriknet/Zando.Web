// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX





import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import fl = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';



export class ProductItemZoom extends jx.Views.ReactView {

    render() {
        var html = 
            <div>
                <LightSection />
                <ProductItem />
            </div>
                
        return html;
    }
}



class LightSection extends jx.Views.ReactView {

    render() {

        var html =
            <section className="lightSection clearfix pageHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="page-title">
                                <h2>Single product</h2>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <ol className="breadcrumb pull-right">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li className="active">
                                    Single product
                                </li>                                
                            </ol>
                        </div>
                    </div>
                </div>
            </section>;

        return html;
    }
}



class ProductItem extends jx.Views.ReactView {

    render() {

        var html =

            <section className="mainContent clearfix animated fadeInUp">
                <div className="container">
                    <div className="row singleProduct">
                        <div className="col-xs-12">
                            <div className="media">
                                <div className="media-left productSlider">
                                    <div id="carousel" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="item active" data-thumb={0}>
                                                <img src="/img/products/signle-product/product-slide-big-01.jpg" />
                                            </div>
                                            <div className="item" data-thumb={1}>
                                                <img src="/img/products/signle-product/product-slide-big-02.jpg" />
                                            </div>
                                            <div className="item" data-thumb={2}>
                                                <img src="/img/products/signle-product/product-slide-big-03.jpg" />
                                            </div>
                                            <div className="item" data-thumb={3}>
                                                <img src="/img/products/signle-product/product-slide-big-04.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <div id="thumbcarousel" className="carousel slide" data-interval="false">
                                            <div className="carousel-inner">
                                                <div data-target="#carousel" data-slide-to={0} className="thumb"><img src="/img/products/signle-product/product-slide-small-01.jpg" /></div>
                                                <div data-target="#carousel" data-slide-to={1} className="thumb"><img src="/img/products/signle-product/product-slide-small-02.jpg" /></div>
                                                <div data-target="#carousel" data-slide-to={2} className="thumb"><img src="/img/products/signle-product/product-slide-small-03.jpg" /></div>
                                                <div data-target="#carousel" data-slide-to={3} className="thumb"><img src="/img/products/signle-product/product-slide-small-04.jpg" /></div>
                                            </div>
                                            <a className="left carousel-control" href="#thumbcarousel" role="button" data-slide="prev">
                                                <span className="glyphicon glyphicon-chevron-left" />
                                            </a>
                                            <a className="right carousel-control" href="#thumbcarousel" role="button" data-slide="next">
                                                <span className="glyphicon glyphicon-chevron-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="media-body">
                                    <ul className="list-inline">
                                        <li><a href="index.html"><i className="fa fa-reply" aria-hidden="true" />Continue Shopping</a></li>
                                        <li><a href="#"><i className="fa fa-plus" aria-hidden="true" />Share This</a></li>
                                    </ul>
                                    <h2>Pellentesque non risus quis tellus</h2>
                                    <h3>$149</h3>
                                    <p>Mauris lobortis augue ex, ut faucibus nisi mollis ac.Sed volutpat scelerisque ex ut ullamcorper.Cras at velit quis sapien dapibus laoreet a id odio.Sed sit amet accumsan ante, eu congue metus.Aenean eros tortor, cursus quis feugiat sed, vestibulum vel purus.Etiam aliquam turpis quis blandit finibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec porttitor placerat lectus, facilisis ornare leo tincidunt vel.Duis rutrum felis felis, eget malesuada massa tincidunt a.</p>
                                    <span className="quick-drop">
                                        <select name="guiest_id3" id="guiest_id3" className="select-drop">
                                            <option value="0">Size</option>
                                            <option value="1">Small</option>
                                            <option value="2">Medium</option>
                                            <option value="3">Big</option>
                                        </select>
                                    </span>
                                    <span className="quick-drop resizeWidth">
                                        <select name="guiest_id4" id="guiest_id4" className="select-drop">
                                            <option value="0">Qty</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </span>
                                    <div className="btn-area">
                                        <a href="cart-page.html" className="btn btn-primary btn-block">Add to cart <i className="fa fa-angle-right" aria-hidden="true" /></a>
                                    </div>
                                    <div className="tabArea">
                                        <ul className="nav nav-tabs">
                                            <li className="active"><a data-toggle="tab" href="#details">details</a></li>
                                            <li><a data-toggle="tab" href="#about-art">about art</a></li>
                                            <li><a data-toggle="tab" href="#sizing">sizing</a></li>
                                            <li><a data-toggle="tab" href="#shipping">shipping</a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <div id="details" className="tab-pane fade in active">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <ul className="list-unstyled">
                                                    <li>Black, Crew Neck</li>
                                                    <li>75% Cotton, 25% Rayon</li>
                                                    <li>Waterbased Ink</li>
                                                    <li>Wash Cold, dry low</li>
                                                </ul>
                                            </div>
                                            <div id="about-art" className="tab-pane fade">
                                                <p>Nulla facilisi.Mauris efficitur, massa et iaculis accumsan, mauris velit ultrices purus, quis condimentum nibh dolor ut tortor.Donec egestas tortor quis mattis gravida.Ut efficitur elit vitae dignissim volutpat.</p>
                                            </div>
                                            <div id="sizing" className="tab-pane fade">
                                                <p>Praesent dui felis, gravida a auctor at, facilisis commodo ipsum.Cras eu faucibus justo.Nullam varius cursus nisi, sed elementum sem sagittis at.Nulla tellus massa, vestibulum a commodo facilisis, pulvinar convallis nunc.</p>
                                            </div>
                                            <div id="shipping" className="tab-pane fade">
                                                <p>Mauris lobortis augue ex, ut faucibus nisi mollis ac.Sed volutpat scelerisque ex ut ullamcorper.Cras at velit quis sapien dapibus laoreet a id odio.Sed sit amet accumsan ante, eu congue metus.Aenean eros tortor, cursus quis feugiat sed, vestibulum vel purus.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row productsContent">
                        <div className="col-xs-12">
                            <div className="page-header">
                                <h4>Related Products</h4>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="productBox">
                                <div className="productImage clearfix">
                                    <img src="/img/products/products-01.jpg" alt="products-img" />
                                    <div className="productMasking">
                                        <ul className="list-inline btn-group" role="group">
                                            <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart" /></a></li>
                                            <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart" /></a></li>
                                            <li><a className="btn btn-default" data-toggle="modal" href=".quick-view"><i className="fa fa-eye" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="productCaption clearfix">
                                    <h5>Nike Sportswear</h5>
                                    <h3>$199</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="productBox">
                                <div className="productImage clearfix">
                                    <img src="/img/products/products-02.jpg" alt="products-img" />
                                    <div className="productMasking">
                                        <ul className="list-inline btn-group" role="group">
                                            <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart" /></a></li>
                                            <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart" /></a></li>
                                            <li><a className="btn btn-default" data-toggle="modal" href=".quick-view"><i className="fa fa-eye" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="productCaption clearfix">
                                    <h5>Dip Dyed Sweater</h5>
                                    <h3>$249</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="productBox">
                                <div className="productImage clearfix">
                                    <img src="/img/products/products-03.jpg" alt="products-img" />
                                    <div className="productMasking">
                                        <ul className="list-inline btn-group" role="group">
                                            <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart" /></a></li>
                                            <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart" /></a></li>
                                            <li><a className="btn btn-default" data-toggle="modal" href=".quick-view"><i className="fa fa-eye" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="productCaption clearfix">
                                    <h5>Scarf Ring Corner</h5>
                                    <h3>$179</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="productBox">
                                <div className="productImage clearfix">
                                    <img src="/img/products/products-04.jpg" alt="products-img" />
                                    <div className="productMasking">
                                        <ul className="list-inline btn-group" role="group">
                                            <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart" /></a></li>
                                            <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart" /></a></li>
                                            <li><a className="btn btn-default" data-toggle="modal" href=".quick-view"><i className="fa fa-eye" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="productCaption clearfix">
                                    <h5>Sun Buddies</h5>
                                    <h3>$149</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        return html;
    }


    componentDidMount() {

        this.jget('.quick-drop select')['selectbox']();

    }
}


