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


declare var Schema;



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


    get prof(): prof.AccountProfile {
        return this.refs['prof'] as prof.AccountProfile
    }


    get cart(): CreditCardView {
        return this.refs['cart'] as CreditCardView
    }

    get cart_list(): cart.CartItemsDatalist {
        return this.refs['cart_list'] as cart.CartItemsDatalist
    }


    render() {

        var html =

        <div className="row" style={{marginBottom:20}}>
            
            <div className="col-md-9">
              
              <div className="title">
                <span>Checkout</span>
              </div>

              <prof.AccountProfile ref='prof' is_checking_out={true} />

              <br />
               
              <CreditCardView ref='cart' />

              <br />

              <cart.CartItemsDatalist ref='cart_list' owner={this} is_embedded={true} />

            </div>

            <cart.NewArrivals />

          </div>

        
        return html
    }


    pay_cart(): Q.Promise<any> {

        var d = Q.defer();
        
        if (!this.prof.validate()) {
            utils.jump_up();
        }

        utils.spin(this.root);

        this.cart.create_cc_token().then(card_info => {

            schema.call({
                fn: 'post',
                params: ['/orders', {
                    cart_id: this.cart_list.cart['id'],
                    billing: {
                        card: card_info
                    }
                }]
            }).then(res => {

                jx.local.set('last-order', res);
                jx.local.set('last-cart', this.cart_list.cart);

                var that = this;

                swal({
                        title: "Transaction completed",
                        text: "Now you can continue shopping",
                        type: "success"
                }, function () {

                    d.resolve(res.response);

                    that.app.router.navigate('/');
                })

                

            }).fail(err => {

                toastr.error(err);

                d.reject(err);

            }).finally(() => {

                utils.unspin(this.root);
            });
        })

        return d.promise;
    }
}



interface PaymentInfo {
    //cart_type: PaymentType,
    card_number: string,
    card_cvc: number,
    exp_month: number,
    exp_year: number
}

class CreditCardView extends jx.Views.ReactView{


    render(){

        var html =
        <form role="form" className="form-horizontal">
            <fieldset>
              <legend>Payment</legend>
              <div className="form-group hidden">
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
                      <select name="expiry-year" id="expiry-year" className="form-control">                        
                        <option value={'2016'}>2016</option>
                        <option value={'2017'}>2017</option>
                        <option value={'2018'}>2018</option>
                        <option value={'2019'}>2019</option>
                        <option value={'2020'}>2020</option>
                        <option value={'2021'}>2021</option>
                        <option value={'2022'}>2022</option>
                        <option value={'2023'}>2023</option>
                        <option value={'2024'}>2020</option>
                        <option value={'2025'}>2021</option>
                        <option value={'2026'}>2022</option>
                        <option value={'2027'}>2023</option>
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


    get cardholder_txt(): JQuery {
        return this.jget('#card-holder-name');
    }

    get cardno_txt(): JQuery {
        return this.jget('#card-number');
    }

    get cardcv_txt(): JQuery {
        return this.jget('#cvv');
    }

    get cardexp_month_select(): JQuery {
        return this.jget('#expiry-month');
    }

    get cardexp_year_select(): JQuery {
        return this.jget('#expiry-year');
    }


    private string_to_int(sel: JQuery) {
        return parseInt(sel.val());
    }

    create_cc_token(): Q.Promise<any> {

        var info= {
            number: this.cardno_txt.val(),
            cvc: this.cardcv_txt.val(),
            exp_month: this.string_to_int(this.cardexp_month_select),
            exp_year: 2019//this.string_to_int(this.cardexp_year_select)
        }

        var d = Q.defer();

        Schema.createToken(info, (status, res) => {

            if (status != 200) {

                if (res['error']) {
                    toastr.error(res['error']['message']);
                    d.reject(false);
                }

            } else {

                d.resolve(res);
            }

        });

        return d.promise;
    }

}