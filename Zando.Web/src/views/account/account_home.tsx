


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');



export class AccountHomePage extends jx.Views.ReactView {

    render() {
        return null
    }


    componentDidMount() {

        carts.display_cart();

        $('.innerWrapper').load('/html/account_home.html', () => {
            
        });

    }

}


