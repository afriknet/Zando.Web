// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');



export class AccountHomePage extends jx.Views.ReactView {

    render() {

        return null

    }


    componentDidMount() {

        $('.innerWrapper').load('/html/account_home.html', () => {

        });

    }

}
