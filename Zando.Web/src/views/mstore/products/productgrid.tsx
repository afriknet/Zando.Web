/// <reference path="productgrid_listview.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import list = require('./productgrid_listview');




export class ProductGridPage extends base.BasePage {

    get_pagecontent() {
        var html =
            <div className="row">

                <GridFilters />

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

            jx.carts.display_cart();

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



class GridFilters extends jx.Views.ReactView{
    render() {

        var pl20 = { paddingLeft: 20};

        var html =

        <div className="col-sm-3">
          <div className="filter-sidebar">
            <div className="title"><span>Enabled Filters</span></div>
            <ul>
              <li>Categories: T-Shirts <a href="#" className="remove-filter"><i className="fa fa-remove" /></a></li>
              <li>Availability: In Stock <a href="#" className="remove-filter"><i className="fa fa-remove" /></a></li>
              <li>Brand: Brand Name 1 <a href="#" className="remove-filter"><i className="fa fa-remove" /></a></li>
            </ul>
          </div>
          <div className="filter-sidebar">
            <div className="title"><span>Categories</span></div>
            <ul>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="DressCheckbox" defaultValue="checked" /><label htmlFor="DressCheckbox">T-Shirts (10) </label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="SweaterCheckbox" /><label htmlFor="SweaterCheckbox">Polo T-Shirts (11)</label></div>
              </li>
            </ul>
          </div>
          <div className="filter-sidebar">
            <div className="title"><span>Availability</span></div>
            <ul>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="InStockCheckbox" defaultValue="checked" /><label htmlFor="InStockCheckbox">In Stock (20)</label></div>
              </li>
            </ul>
          </div>
          <div className="filter-sidebar">
            <div className="title"><span>Brand</span></div>
            <ul>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="BrandName1Checkbox" defaultValue="checked" /><label htmlFor="BrandName1Checkbox">Brand Name 1 (11)</label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="BrandName2Checkbox" /><label htmlFor="BrandName2Checkbox">Brand Name 2 (12)</label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="BrandName3Checkbox" /><label htmlFor="BrandName3Checkbox">Brand Name 3 (13)</label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="BrandName4Checkbox" /><label htmlFor="BrandName4Checkbox">Brand Name 4 (14)</label></div>
              </li>
            </ul>
          </div>
          <div className="filter-sidebar">
            <div className="title"><span>Price Range</span></div>
            <div id="range-value">Range: <span id="min-price" /> - <span id="max-price" /></div>
            <input type="hidden" name="min-price" defaultValue="" />
            <input type="hidden" name="max-price" defaultValue="" />
            <div className="price-range">
              <div id="price" />
            </div>
          </div>
          <div className="filter-sidebar">
            <div className="title"><span>Size</span></div>
            <ul>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="SCheckbox" /><label htmlFor="SCheckbox">S (11)</label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="MCheckbox" /><label htmlFor="MCheckbox">M (12)</label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="LCheckbox" /><label htmlFor="LCheckbox">L (13)</label></div>
              </li>
              <li>
                <div className="checkbox" style={pl20}><input type="checkbox" id="XLCheckbox" /><label htmlFor="XLCheckbox">XL (14)</label></div>
              </li>
            </ul>
          </div>
        </div>

        return html;

    }
}

