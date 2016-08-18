// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/basepage');



export class ProductGridPage extends base.BasePage {

    get_pagecontent() {
        return <div style={{ minHeight: 430 }}>Product grid page</div>;
    }


    componentDidMount() {

        super.componentDidMount();
        
        $.getScript('/mstore/js/mimity.js', () => {

        });

    }

}
