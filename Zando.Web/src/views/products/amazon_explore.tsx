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
                                <li className="active"><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Vetements et accessoires<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" data-nodeid="1571265031" href="javascript:void(0)">Auto et Moto<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Beaute et parfums<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Bijoux<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Chaussures et Sacs<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Hightech<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Informatique<i className="fa fa-plus" /></a></li>
                                <li><a data-target="#target-submenu" data-toggle="collapse" href="javascript:void(0)">Montres<i className="fa fa-plus" /></a></li>                                
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


    componentDidMount() {

    }
}



class AmazonSearchBox extends jx.Views.ReactView {

    render() {

        var html =
            <div className="row">
                <h3 style={{ textTransform:'none' }}>Amazon products search</h3>
                <div id="custom-search-input">
                    <div className="input-group col-md-12">
                        <input type="text" className="  search-query form-control" placeholder="Search" style={{ padding:10 }} />
                        <span className="input-group-btn">
                            <button className="btn btn-danger btn-search" type="button">
                                <span className=" glyphicon glyphicon-search" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            
        
        return html;
    }


    componentDidMount() {

        this.jget('input').css('padding', '10px!important');

        this.jget('.btn-search').click(() => {

            this.search_items();
        });
        
    }


    search_items() {
        //
        aws.call({
            fn: 'itemSearch',
            params: [{
                SearchIndex: 'Apparel',  //Keywords     
                Keywords: 'chemise',         
                responseGroup: 'ItemAttributes',
                sort:'SalesRank',
                domain: 'webservices.amazon.fr',
            }]
        }).then(res => {


        }).fail(err => {


        });

        /*
        $params = array(
    "Service" => "AWSECommerceService",
    "Operation" => "ItemSearch",
    "AWSAccessKeyId" => "AKIAJ56TP7JGYQHLA5IA",
    "AssociateTag" => "afrikne-21",
    "SearchIndex" => "Music",
    "ResponseGroup" => "BrowseNodes",
    "BrowseNode" => "1571265031"
);
        */

    }
}