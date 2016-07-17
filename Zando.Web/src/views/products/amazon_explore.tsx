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



export class AmazonExplore extends jx.Views.ReactView {

    render() {
        var html =
            <div>
                <LightSection />

                <section className="mainContent clearfix animated fadeInUp">

                    <div className="container">

                        <div className="row">

                            <AmazonSideBar />

                            <div className="col-md-9 col-sm-8 col-xs-12">

                                <AmazonSearchBox />

                            </div>

                        </div>

                    </div>

                </section>

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
                                <h2 style={{ textTransform:'none' }}>Explore amazon products</h2>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <ol className="breadcrumb pull-right">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li className="active">
                                    Amazon
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>;

        return html;
    }
}




class AmazonSideBar extends jx.Views.ReactView {

    render() {

        var html = 
            <div className="col-md-3 col-sm-4 col-xs-12 sideBar">
                <div className="panel panel-default">
                    <div className="panel-heading">Product categories</div>
                    <div className="panel-body">
                        <div className="collapse navbar-collapse navbar-ex1-collapse navbar-side-collapse">
                            <ul className="nav navbar-nav side-nav">
                                <li>
                                    <a data-target="#women" data-toggle="collapse" href="javascript:;">Women <i className="fa fa-plus" /></a>
                                    <ul className="collapse collapseItem" id="women">
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Accessories <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bag <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Cloths <span>(25) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bed &amp; Bath <span>(2) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Swimming costume <span>(5) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Sport Tops &amp; Shoes <span>(3) </span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a data-target="#men" data-toggle="collapse" href="javascript:;">Men <i className="fa fa-plus" /></a>
                                    <ul className="collapse collapseItem" id="men">
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Accessories <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bag <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Cloths <span>(25) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bed &amp; Bath <span>(2) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Swimming costume <span>(5) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Sport Tops &amp; Shoes <span>(3) </span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a data-target="#kids" data-toggle="collapse" href="javascript:;">Kids <i className="fa fa-plus" /></a>
                                    <ul className="collapse collapseItem" id="kids">
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Accessories <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bag <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Cloths <span>(25) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bed &amp; Bath <span>(2) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Swimming costume <span>(5) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Sport Tops &amp; Shoes <span>(3) </span></a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a data-target="#accessories" data-toggle="collapse" href="javascript:;">Accessories <i className="fa fa-plus" /></a>
                                    <ul className="collapse collapseItem" id="accessories">
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Accessories <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bag <span>(6) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Cloths <span>(25) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bed &amp; Bath <span>(2) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Swimming costume <span>(5) </span></a></li>
                                        <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Sport Tops &amp; Shoes <span>(3) </span></a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default priceRange">
                    <div className="panel-heading">Filter by Price</div>
                    <div className="panel-body clearfix">
                        <div className="price-slider-inner">
                            <span className="amount-wrapper">
                                Price:
                                <input type="text" readOnly id="price-amount-1" />
                                <strong>-</strong>
                                <input type="text" readOnly id="price-amount-2" />
                            </span>
                            <div id="price-range" />
                        </div>
                        <input type="submit" defaultValue="Filter" className="btn btn-default" />
                        {/* <span class="priceLabel">Price: <strong>$12 - $30</strong></span> */}
                    </div>
                </div>
                <div className="panel panel-default filterNormal">
                    <div className="panel-heading">filter by Color</div>
                    <div className="panel-body">
                        <ul className="list-unstyled">
                            <li><a href="#">Black<span>(15) </span></a></li>
                            <li><a href="#">White<span>(10) </span></a></li>
                            <li><a href="#">Red<span>(7) </span></a></li>
                            <li><a href="#">Blue<span>(12) </span></a></li>
                            <li><a href="#">Orange<span>(12) </span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="panel panel-default filterNormal">
                    <div className="panel-heading">filter by Size</div>
                    <div className="panel-body">
                        <ul className="list-unstyled clearfix">
                            <li><a href="#">Small<span>(15) </span></a></li>
                            <li><a href="#">Medium<span>(10) </span></a></li>
                            <li><a href="#">Large<span>(7) </span></a></li>
                            <li><a href="#">Extra Large<span>(12) </span></a></li>
                        </ul>
                    </div>
                </div>
            </div>



        return html;


    }
}



class AmazonSearchBox extends jx.Views.ReactView {

    render() {

        var html =
            <div className="col-lg-12" style={{ color: '#eaeaea', background: '#2c3e50' }}>

                <div className="sb-search" id="sb-search" >
                    <form>
                        <input type="text" id="search" name="search" defaultValue="" placeholder="Enter your search term..." className="sb-search-input" />
                        <input type="submit" defaultValue="" className="sb-search-submit" />
                        <span className="sb-icon-search" />
                    </form>
                </div>

            </div>
            
        
        return html;
    }


    componentDidMount() {

        new window['UISearch'](document.getElementById('sb-search'));
    }
}