/// <reference path="account_cart.tsx" />

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';
import { AccountCart} from './account_cart';


export interface AccountCheckoutReviewProps extends jx.Views.ReactProps {
    
}

export class AccountCheckoutReview extends jx.Views.ReactView {

    props: AccountCheckoutReviewProps;
    services: any[];


    constructor(props: AccountCheckoutReviewProps) {
        super(props);        
    }
    

    render() {

        var html =
            <div>
                <div className="col-xs-12">

                    <div className="page-header">
                        <h4>order review</h4>
                        </div>
                    </div>

                <br/>

                <Panel title="Billing Address" dim={'col-lg-12'}>
                    <address>
                        <strong>Adam Smith</strong>
                        <br/>
                        <span>9/4 C Babor Road, Mohammad pur, </span>
                        <span>Shyamoli, Dhaka </span>
                        <br/>
                        <span>Bangladesh</span>
                        </address>
                    </Panel>

                <Panel title="Payment Method">
                    <address>
                        <span>Credit Card - VISA</span>
                        </address>
                    </Panel>

                <Panel title="Payment Method">
                    <address>
                        <span>Shipping Method</span>
                        </address>
                </Panel>

                <div className="col-lg-12" style={{ marginTop:30 }}>
                    <AccountCart owner={this} />
                </div>


          </div>

        return html;
    }    
}


class AccountCarts extends jx.Views.ReactView {

    render() {


        var html;
        
        return html;
    }

    componentDidMount() {

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
