


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');



export class AccountHomePage extends jx.Views.ReactView {

    render() {
        return null
    }


    componentDidMount() {

        jx.carts.display_cart(true);

        $('.innerWrapper').load('/html/account_home.html', () => {
            this.init_view();
        });

    }


    init_view() {

        var acc_name = '{0} {1}'.format(this.app.get_account()['first_name'], this.app.get_account()['last_name']);

        $('.account-name').html(acc_name);

    }

}


