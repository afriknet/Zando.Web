// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');



export interface PageTopHeaderState extends jx.Views.ReactState {
    is_logged: boolean;
}
export class PageTopHeader extends jx.Views.ReactView {

    state: PageTopHeaderState;

    render() {

        var logged_in_visible = this.is_connected() ? '' : 'hidden';
        var logged_out_visible = !this.is_connected() ? '' : 'hidden';

        var html =

            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="pull-left header-language">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" id="dropdownLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img alt="English" src="/mstore/images/en.jpg" />English <i className="fa fa-caret-down" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownLanguage">
                                        <li><a href="#"><img alt="English" src="/mstore/images/en.jpg" />English</a></li>
                                        <li><a href="#"><img alt="French" src="/mstore/images/fr.jpg" />French</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pull-left">
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" id="dropdownCurrency" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        USD <i className="fa fa-caret-down" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownCurrency">
                                        <li><a href="#">$ Dollar</a></li>
                                        <li><a href="#">£ Pound</a></li>
                                        <li><a href="#">€ Euro</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pull-left hidden-xs"><a href="#"><i className="fa fa-phone" /> +123-456-789</a></div>
                            <div className="pull-left hidden-xs"><a href="mailto:cs@domain.tld"><i className="fa fa-envelope" /> support@afriknetmarket.com</a></div>

                            <div className={"pull-right logged-out {0}".format(logged_out_visible) }>
                                <a href="/login" className="">
                                    <span><i className="fa fa-user" /> connectez-vous</span>
                                </a>
                            </div>


                            <div className={"pull-right logged-out {0}".format(logged_out_visible) }>
                                <a href="/signup" className="">
                                    <span><i className="fa fa-star" /> creer un compte</span>
                                </a>
                            </div>

                            <div className={"pull-right header-account logged-in {0}".format(logged_in_visible) }>
                                <div className="dropdown">
                                    <a href="#" className="dropdown-toggle" id="dropdownAccount" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span><i className="fa fa-user" /> My Account <i className="fa fa-caret-down" /></span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownAccount">
                                        <li><a href="#">Orders</a></li>
                                        <li><a href="#">Vouchers</a></li>
                                        <li><a href="#">Points</a></li>
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pull-right hidden-xs"><a href="compare.html"><i className="fa fa-align-left" /> Compare (4) </a></div>
                            <div className={"pull-right hidden-xs logged-in {0}".format(logged_in_visible) }><a href="wishlist.html"><i className="fa fa-heart" /> Wishlist (3) </a></div>
                        </div>
                    </div>
                </div>
            </div>


        return html;

    }


    componentDidMount() {

        super.componentDidMount();

        this.app.register_view('page-header', this);
    }

    componentWillUnmount() {

        this.app.remove_view('page-header');
    }

    is_connected(): boolean {

        var usr = this.app.get_user();

        if (!usr) {
            return false;
        }

        if (!this.app.user_is_verified()) {
            return false;
        }

        return true;

    }


    update_loggin_info() {

        if (!this.app.get_user()) {
            return;
        }

        var usr_info = this.app.get_user()['name'];

        if (!usr_info) {
            usr_info = this.app.get_user()['email'];
        }

        this.forceUpdate();
        
    }
}
