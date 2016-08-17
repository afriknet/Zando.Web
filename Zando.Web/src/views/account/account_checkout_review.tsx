/// <reference path="account_cart.tsx" />
/// <reference path="account_checkout_payment.tsx" />

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';
import { AccountCart} from './account_cart';
import pymt = require('./account_checkout_payment');


export interface AccountCheckoutReviewProps extends jx.Views.ReactProps {
    
}

export class AccountCheckoutReview extends jx.Views.ReactView {

    props: AccountCheckoutReviewProps;
    services: any[];


    constructor(props: AccountCheckoutReviewProps) {
        super(props);        
    }
    

    render() {

        var pymt_info: pymt.PaymentInfo = this.props.owner['payment_info'] as any;
        var pymt_mthd = null;

        switch (pymt_info.cart_type) {

            case pymt.PaymentType.card: {
                pymt_mthd ='Credit Card - VISA'
            } break;

            case pymt.PaymentType.paypal: {
                pymt_mthd = 'Paypal'
            } break;
        }

        var html =
            <div>
                <div className="col-xs-12">

                    <div className="page-header">
                        <h4>order review</h4>
                        </div>
                    </div>

                <br/>

                <Panel title="Billing Address" dim={'col-lg-12'}>
                    <BillingAddress owner={this} />
                </Panel>

                <Panel title="Payment Method">
                    <address>
                        <span>{pymt_mthd}</span>
                    </address>
                </Panel>

                <Panel title="Shipping address">
                    <BillingAddress owner={this} /> 
                </Panel>

                <div className="col-lg-12" style={{ marginTop:30 }}>
                    <AccountCart ref="cartlist" owner={this} />
                </div>

                
          </div>

        return html;
    }    


    componentDidMount() {

        super.componentDidMount();
    }


    componentDidUpdate() {

        super.componentDidUpdate();
    }


    can_go_next(): Q.Promise<boolean> {

        var can_go = $.isArray((this.refs['cartlist'] as any).cart['items'])
            && (this.refs['cartlist'] as any).cart['items'].length > 0;
        
        return Q.resolve(can_go);
    }
}



interface PanelProps extends jx.Views.ReactProps {
    title: string
    dim?: string
}
class Panel extends jx.Views.ReactView {

    props: PanelProps;

    render() {

        var _dim = this.props.dim ? this.props.dim : 'col-sm-6';
        
        var html =
            <div className={"{0} col-xs-12".format(_dim)} style={{ fontSize: 18 }}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">{this.props.title}</h4>
                        </div>
                    <div className="panel-body" style={{ color:'gray' }}>
                        {this.props.children}
                    </div>
                </div>
            </div>

        return html;
    }

}



interface BillingAddressProps extends jx.Views.ReactProps {    
}
interface BillingAddressState extends jx.Views.ReactState {
    cart: any
}
class BillingAddress extends jx.Views.ReactView {

    props: BillingAddressProps;


    constructor(props: BillingAddressProps) {
        super(props);
        this.state.loading = true;
    }


    render() {

        if (this.state.loading) {
            return <div style={{ minHeight:100 }}></div>
        }

        var acc = this.app.get_account();
        var bill = acc['billing'];



        var html =
            <address>
                <strong>{acc['name']}</strong>
                <br/>
                <span>{'{0}, '.format(bill['address1'])}</span>                
                <span>{bill['city']}</span>
                <br/>
                <span>{window['BFHCountriesList'][bill['country']]}</span>
            </address>

        return html;
    }


    componentDidMount() {
        this.forceUpdate();
    }


    componentDidUpdate() {

        if (this.state.loading) {

            this.fetch_cart().then(cart => {

                this.setState(_.extend(this.state, {
                    cart: cart,
                    loading: false
                }));

            });

        }

    }

    fetch_cart() {

        var d = Q.defer();

        schema.call({
            fn: 'get',
            params: ['/carts', {
                expand: 'billing',
                where: {
                    account_id: this.app.get_account()['id'],
                    status: 'active'
                }
            }]
        }).then(res => {
            
            d.resolve(res.response.results[0]);
        });

        return d.promise;
    }
}

