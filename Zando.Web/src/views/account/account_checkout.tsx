/// <reference path="account_checkout_completed.tsx" />
/// <reference path="account_checkout_billing.tsx" />

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="quick_loginsignup.tsx" />



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';

import {AccountCheckoutBilling} from './account_checkout_billing';
import { AccountCheckoutShipments } from './account_checkout_shipments';
import { AccountCheckoutPayments, PaymentInfo } from './account_checkout_payment';
import * as rv from './account_checkout_review';
import { QuickLoginSignUpView, ViewMode } from './quick_loginsignup';
//import cmpl = require('./account_checkout_completed');


declare var chance;
declare var Schema;


interface PageInfo {
    index: number,
    view: any;
}


interface AccountCheckoutState extends jx.Views.ReactState {
    activepage: number,
    //completed?: boolean
}

export class AccountCheckout extends jx.Views.ReactView {


    constructor(props?: any) {

        super(props);

        this.state.activepage = 0;
        
        this['data'] = {};

        this.pages = [];
    }


    state: AccountCheckoutState;
    pages: PageInfo[];
    payment_info: PaymentInfo;
    

    render() {

        var __style = {
            borderBottom: 0
        }


        var str_next = 'Continue';
        if (this.state.activepage === 3) {
            str_next = 'Complete';
        }
        

        var html =

            <div className="clearfix stepsPage animated fadeInUp">

                <div className="progress-wizard" style={__style}>

                    <BigLabel label="Checkout" />
                    
                    <hr />

                    <ProgressBar activepage={this.state.activepage} />

                    <br />

                    <div className="col-lg-12" style={{ marginTop:45 }}>

                        <div className="page-content" style={{ paddingLeft: 0, paddingRight: 0 }}>

                        </div>

                        <div className="col-xs-12 no-p">

                            <hr />

                            <div className="well well-lg clearfix">
                                <ul className="pager">
                                    <li className="previous"><a href="#" onClick={(e) => { e.preventDefault(); this.go_back() } } className={this.display_backBtn() }>back</a></li>
                                    <li className="next"><a href="#" onClick={(e) => { e.preventDefault(); this.go_next() } }>{str_next}</a></li>
                                </ul>
                            </div>
                        </div>


                        <form>

                            
                        </form>


                    </div>
                    

                </div>;

                <div id="signup">
                    <Modal ref='modal' owner={this}
                        title="Creez votre compte"
                        //onClosing={this.on_closing_quicklogin.bind(this)}
                        afterClosed={this.after_closed_quicklogin.bind(this)}
                        hide_footer={true} />
                </div>
            </div>

            

        return html;
    }


    display_backBtn() {

        if (this.state.activepage === 0) {
            return 'hideContent'
        }
    }


    go_next() {

        if (this.state.activepage <= 3) {

            this.can_go_next().then(() => {

                if (this.state.activepage < 3) {

                    this.setState({
                        activepage: ++this.state.activepage
                    });

                } else {

                    this.post_order();
                }
                
            });
            
        }
    }


    post_order() {

        utils.spin(this.root);

        this.internal_post().then((res) => {

            jx.local.set('last-order', res);
            jx.local.set('last-cart', this['cart']);

            this.app.router.navigate('/checkout/completed');
            
        }).finally(() => {

            utils.unspin(this.root);

        });


    }
    

    internal_post() {

        var d = Q.defer();

        schema.call({
            fn: 'post',
            params: ['/orders', {
                cart_id: this['cart']['id'],
                billing: {
                    card: this['card_info']
                }
            }]
        }).then(res => {

            d.resolve(res.response);

        }).fail(err => {

            toastr.error(err);

            d.reject(err);

        }).finally(() => {

            utils.unspin(this.root);
        });

        return d.promise;
    }


    can_go_next(): Q.Promise<boolean> {

        var info = _.find(this.pages, p => {
            return p.index === this.state.activepage;
        });

        if (info && info.view['can_go_next']) {
            return info.view['can_go_next']();
        }

        return Q.resolve(true);
    }


    go_back() {
        
        if (this.state.activepage > 0) {
            
            this.setState({
                activepage: --this.state.activepage
            });
        }
    }


    componentDidMount() {
        
        if (!this.app.user_is_verified()) {
            
            this.create_account();

        } else {

            this.set_currentpage();
        }        
    }


    componentDidUpdate() {

        this.set_currentpage();
    }


    set_currentpage() {

        this.root.find('[data-page]').hide();


        var $page = this.root.find('[data-page="{0}"]'.format(this.state.activepage));


        if ($page.length === 0) {

            $page = $('<div data-page="{0}"></div>'.format(this.state.activepage)).appendTo(this.root.find('.page-content'));

            var view: any = null;

            switch (this.state.activepage) {

                case 0:

                    view = <AccountCheckoutBilling owner={this} index={0} />;

                    break;

                case 1:

                    view = <AccountCheckoutShipments owner={this} index={1}  />

                    break;

                case 2:

                    view = <AccountCheckoutPayments owner={this} index={2}/>

                    break;

                case 3:

                    view = <rv.AccountCheckoutReview owner={this}/>

                    break;

            }

            if (view) {

                ReactDOM.render(view, $page[0]);
            }

        } else {

            $page.show();

        }

    }


    create_account(): Q.Promise<any> {

        var d = Q.defer();

        (this.refs['modal'] as Modal).show(<QuickLoginSignUpView owner={this}
                                                        container={(this.refs['modal'] as Modal)}
                                                        mode={ViewMode.signup} />);

        return d.promise;
    }

    
    after_closed_quicklogin(): Q.Promise<Boolean> {

        return (this['quick_signuplogin_view'].afterClosed() as Q.Promise<Boolean>).then(ok => {

            if (ok) {

                this.set_currentpage();

            }

            return ok;
        });


    }

}


interface ProgressBarProps extends jx.Views.ReactProps {
    activepage: number
}
class ProgressBar extends jx.Views.ReactView {

    props: ProgressBarProps;

    constructor(props: ProgressBarProps) {
        super(props);
    }

    render() {
        
        var html =

            <div className="col-lg-12">

                <ProgressBarItem pageindex={0} activepage={this.props.activepage}
                    title={<span>Billing Address</span>}  />

                <ProgressBarItem pageindex={1} activepage={this.props.activepage}
                    title={<span>Shipping Method</span>} />

                <ProgressBarItem pageindex={2} activepage={this.props.activepage}
                    title={<span>Payment Method</span>} />

                <ProgressBarItem pageindex={3} activepage={this.props.activepage}
                    title={<span>Review</span>} />
            </div>
        
        return html;

    }
        
}



enum ProgressBarValue { none, active, complete, fullBar, disabled }

interface ProgressBarItemProps extends jx.Views.ReactProps {
    title: any,
    pageindex: number,
    activepage: number,
    //progress_value?: ProgressBarValue
}
class ProgressBarItem extends jx.Views.ReactView {

    constructor(props: ProgressBarItemProps) {
        super(props);
    }


    props: ProgressBarItemProps;


    render() {

        var html =
            <div className={"col-xs-3 progress-wizard-step {0}".format(this.progress_value()) } data-pageindex={this.props.pageindex}>

                <div className="text-center progress-wizard-stepnum">{this.display_title()}</div>

                <div className="progress">
                    <div className="progress-bar"></div>
                </div>

                <a href="/account/checkout/0-1" className="progress-wizard-dot"></a>

            </div>


        return html;
    }


    display_title() {
        return this.props.title
    }


    progress_value() {

        var value = ProgressBarValue.none;

        if (this.props.activepage < this.props.pageindex) {
            value = ProgressBarValue.disabled;            
        }

        if (this.props.activepage === this.props.pageindex) {

            value = ProgressBarValue.active;

            if (this.props.pageindex === 0) {
                value = ProgressBarValue.complete;
            }

            if (this.props.pageindex === 3) {
                value = ProgressBarValue.fullBar;
            }
        }

        if (this.props.activepage > this.props.pageindex) {
            value = ProgressBarValue.fullBar
        }
        

        switch (value) {

            case ProgressBarValue.active:
                return 'active';
            case ProgressBarValue.complete:
                return 'complete';
            case ProgressBarValue.fullBar:
                return 'complete fullBar';
            case ProgressBarValue.disabled:
                return 'disabled';
            default:
                return null;
        }

    }
}



class CompletedView extends jx.Views.ReactView {

    render() {

        var html =
            <div className="clearfix stepsPage animated fadeInRight">

                <div className="row">

                    <div className="col-lg-12">

                        <BigLabel label="La transaction a ete effectuee avec succes" />

                        <br/>

                        <button className="btn btn-lg btn-warning"><i className="fa fa-reply"></i> Continuez a parcourir nos produits</button>

                    </div>

                </div>

            </div>
            
        return html;

    }

}