/// <reference path="productgrid_listview.tsx" />
/// <reference path="productgrid_filters.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import list = require('./productgrid_listview');
import flt = require('./productgrid_filters');



export class ProductGridPage extends base.BasePage {

    get_pagecontent() {

        var html =
            <div className="row">

                <flt.ProductGridFilters owner={this}/>

                <list.ProductGridListView owner={this} ref='gridlist' />

            </div>

        return html;
    }

    get gridlist(): list.ProductGridListView {
        return (this.refs['gridlist'] as list.ProductGridListView);
    }


    componentDidMount() {

        super.componentDidMount();

        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart(false);

            this.resolve_routing();
        });
    }
    

    componentDidUpdate() {

        super.componentDidUpdate();

        this.resolve_routing();
    }


    resolve_routing() {

        var page = 1;

        if (this.app.router.params && this.app.router.params.page) {
            var page = parseInt(this.app.router.params.page);            
        }
        
        this.gridlist.load_page(page);
    }

}



