// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import prof = require('./account_profile');
import cartlist = require('../cart/cart_itemlist');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../../lib/controls';
import old_prof = require('../../account/account_profile');


export class AccountOrdersView extends base.BasePage {

    get_pagecontent() {

        return <InternalView />
    }


    componentDidMount() {

        super.componentDidMount();


        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart(false);

            $('.navigation > li').removeClass('active');

            $('.li-orders').removeClass('hidden')

            $('.li-orders').addClass('active');
        });
    }

}


class InternalView extends jx.Views.ReactView {

    render() {

        var html =
            <div>

                <div className="col-md-9">

                    My orders
                   
                </div>
                
                <cartlist.NewArrivals col="col-md-3" />

            </div>

        return html;
    }


}