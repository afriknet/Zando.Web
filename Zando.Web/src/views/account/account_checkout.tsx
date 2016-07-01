/// <reference path="account_checkout_billing.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';

import {AccountCheckoutBilling} from './account_checkout_billing';
import { AccountCheckoutShipments } from './account_checkout_shipments';
import { AccountCheckoutPayments } from './account_checkout_payment';
import { AccountCheckoutReview } from './account_checkout_review';


declare var chance;


interface PageInfo {
    index: number,
    view: any;
}


interface AccountCheckoutState extends jx.Views.ReactState {
    activepage: number
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

            if (this.state.activepage < 3) {

                this.can_go_next().then(() => {

                    this.setState({
                        activepage: ++this.state.activepage
                    });
                });

            } else {

                this.post_order();
            }
            
        }
    }


    post_order() {

        var d = Q.defer();

        schema.call({
            fn: 'post',
            params: ['/orders', {
                cart_id: this['cart']['id']
            }]
        }).then(res => {

            d.resolve(true);

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

        this.set_currentpage();
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

                    view = <AccountCheckoutReview owner={this}/>
                    
                    break;
                
            }

            if (view) {
                
                ReactDOM.render(view, $page[0]);
            }

        } else {

            $page.show();

        }

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