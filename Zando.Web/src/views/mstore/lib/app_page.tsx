/// <reference path="app_page_topheader.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');


import { PageHeader } from './app_page_topheader';
import { PageSubHeader } from './app_page_subheader';
import { PageNavigationBar } from './app_page_navigationbar';
import { PageFooter } from './app_page_footer';



export class BasePage extends jx.Views.ReactView {

    render() {

        var html =

            <div>

                <PageHeader />

                <PageSubHeader />

                <PageNavigationBar />

                <div className="container" style={{ minHeight: 400 }}>

                    {this.get_pagecontent()}
                    
                </div>

                <PageFooter />

            </div>

        return html;

    }


    get_pagecontent() {
        return null;
    }

}

