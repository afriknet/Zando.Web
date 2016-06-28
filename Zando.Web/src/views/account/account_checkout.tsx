/// <reference path="account_checkout_billing.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';

import {AccountCheckoutBilling} from './account_checkout_billing';

interface AccountCheckoutState extends jx.Views.ReactState {
    activepage: number
}
export class AccountCheckout extends jx.Views.ReactView {

    constructor(props?: any) {

        super(props);

        this.state.activepage = 0;
        
        this['data'] = {};
    }

    state: AccountCheckoutState;
    count: number;
    
    render() {

        var __style = {
            borderBottom: 0
        }


        var html =

            <div className="clearfix stepsPage">

                <div className="progress-wizard" style={__style}>

                    <BigLabel label="Checkout" />
                    
                    <hr />

                    <ProgressBar activepage={this.state.activepage} />

                    <br />

                    <div className="col-lg-12" style={{ marginTop:45 }}>

                        <form>

                            <div className="page-content">

                            </div>

                            <div className="col-xs-12">
                                <div className="well well-lg clearfix">
                                    <ul className="pager">
                                        <li className="previous"><a href="#" onClick={(e) => { e.preventDefault(); this.go_back() } } className={this.display_backBtn() }>back</a></li>
                                        <li className="next"><a href="#" onClick={(e) => { e.preventDefault(); this.go_next() } }>Continue</a></li>
                                    </ul>
                                </div>
                            </div>

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

        if (this.state.activepage < 3) {
            
            this.setState({
                activepage: ++this.state.activepage
            });
        }
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
                    
                    view = <AccountCheckoutBilling owner={this} />

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
                    title={<span>Billing &amp; Shipping Address</span>}  />

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