/// <reference path="../jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');

import jx = require('../jx');


export interface SubPageProps extends jx.Views.ReactProps {
}
export class SubPage extends jx.Views.ReactView {

    props: SubPageProps;

    constructor(props: SubPageProps) {
        super(props);
    }


    componentDidMount() {

        

    }
       
}


