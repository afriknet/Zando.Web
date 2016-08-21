/// <reference path="cart_itemlist.tsx" />
/// <reference path="../account/account_profile.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import prof = require('../account/account_profile');
import cart = require('./cart_itemlist');


export class CartCheckoutPage extends base.BasePage {

    get_pagecontent() {

        return <InternalView />
    }


    componentDidMount() {

        super.componentDidMount();

        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart(false);
            
        });
    }

}




class InternalView extends jx.Views.ReactView {


    render() {

        var html =

        <div className="row" style={{marginBottom:20}}>
            
            <div className="col-md-9">
              
              <div className="title">
                <span>Checkout</span>
              </div>

              <prof.AccountProfile is_embedded={true} />

              <br />
               
              <CreditCardView />

              <br />

              <cart.CartItemsDatalist is_embedded={true} />

            </div>

            <cart.NewArrivals />

          </div>

        
        return html
    }
}



class CreditCardView extends jx.Views.ReactView{


    render(){

        var html =
        <form role="form" className="form-horizontal">
            <fieldset>
              <legend>Payment</legend>
              <div className="form-group">
                <label htmlFor="card-holder-name" className="col-sm-3 control-label">Name on Card</label>
                <div className="col-sm-9">
                  <input type="text" placeholder="Card Holder's Name" id="card-holder-name" name="card-holder-name" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="card-number" className="col-sm-3 control-label">Card Number</label>
                <div className="col-sm-9">
                  <input type="text" placeholder="Debit/Credit Card Number" id="card-number" name="card-number" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="expiry-month" className="col-sm-3 control-label">Expiration Date</label>
                <div className="col-sm-9">
                  <div className="row">
                    <div className="col-xs-3">
                      <select id="expiry-month" name="expiry-month" className="form-control col-sm-2">
                        <option>Month</option>
                        <option value={'01'}>Jan (01)</option>
                        <option value={'02'}>Feb (02)</option>
                        <option value={'03'}>Mar (03)</option>
                        <option value={'04'}>Apr (04)</option>
                        <option value={'05'}>May (05)</option>
                        <option value={'06'}>June (06)</option>
                        <option value={'07'}>July (07)</option>
                        <option value={'08'}>Aug (08)</option>
                        <option value={'09'}>Sep (09)</option>
                        <option value={'10'}>Oct (10)</option>
                        <option value={'11'}>Nov (11)</option>
                        <option value={'12'}>Dec (12)</option>
                      </select>
                    </div>
                    <div className="col-xs-3">
                      <select name="expiry-year" className="form-control">
                        <option value={'13'}>2013</option>
                        <option value={'14'}>2014</option>
                        <option value={'15'}>2015</option>
                        <option value={'16'}>2016</option>
                        <option value={'17'}>2017</option>
                        <option value={'18'}>2018</option>
                        <option value={'19'}>2019</option>
                        <option value={'20'}>2020</option>
                        <option value={'21'}>2021</option>
                        <option value={'22'}>2022</option>
                        <option value={'23'}>2023</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="cvv" className="col-sm-3 control-label">Card CVV</label>
                <div className="col-sm-3">
                  <input type="text" placeholder="Security Code" id="cvv" name="cvv" className="form-control" />
                </div>
              </div>
              <div className="form-group hidden">
                <div className="col-sm-offset-3 col-sm-9">
                  <button className="btn btn-success" type="button">Pay Now</button>
                </div>
              </div>
            </fieldset>
      </form>

        return html;
    }

}