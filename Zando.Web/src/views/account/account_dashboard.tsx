/// <reference path="account_home.tsx" />
/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
/// <reference path="account_addresses.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import { AccountHomePage } from './account_home';
import { AccountAddressesPage } from './account_addresses';
import { AccountCart } from './account_cart';
import { AccountCheckout } from './account_checkout';


export class AccountDashboard extends jx.Views.HomePage {

    get content(): JQuery {
        return $('#page-content').find('.innerWrapper'); //
    }

    skip: boolean;

    constructor(props?: any) {
        super(props);
        this.skip = false;
    }


    render() {

        return null

    }



    componentDidMount() {

        $('#page-content').load('/html/account_dashboard.html', () => {

            if (!this.skip) {
                this.skip = true;
                this.resolve_route();
            }

        });        
    }



    resolve_route() {

        var subview = this.get_subview();

        //mainContent clearfix userProfile animated fadeInUp

        $('.mainContent').removeClass().addClass('mainContent clearfix userProfile animated fadeInUp');

        switch (subview) {

            case 'addresses':
            case 'address': {
                ReactDOM.render(<AccountAddressesPage />, this.content[0]);
            } break;
                            
            case 'cart': {

                this.root.find('.tabs').addClass('hidden');

                $('.page-title h2').html('Cart');
                $('.page-path').html('Cart');

                ReactDOM.render(<AccountCart />, this.content[0]);

            } break;


            case 'checkout': {

                $('.mainContent').removeClass().addClass('mainContent clearfix stepsWrapper animated fadeInUp');

                this.root.find('.tabs').addClass('hidden');

                $('.page-title h2').html('Checkout');
                $('.page-path').html('Checkout');

                ReactDOM.render(<AccountCheckout />, this.content[0]);

            } break;

            
            default: {

                ReactDOM.render(<AccountHomePage />, this.content[0]);

            } break;
        }


        this.highlight_active_page();
    }


    highlight_active_page(__subview?:any) {

        var subview = this.get_subview();

        if (!subview) {
            subview = 'dashboard';
        }
        

        $('[data-menu]').removeClass('active');

        $('[data-menu="{0}"]'.format(subview)).addClass('active');

        var title = $('[data-menu="{0}"]'.format(subview)).attr('data-title');

        if (!title) {
            title = $('[data-menu="{0}"]'.format(subview)).attr('data-menu');
        }

        $('.page-title h2').html(title);
        $('.page-path').html(title);
    }


}