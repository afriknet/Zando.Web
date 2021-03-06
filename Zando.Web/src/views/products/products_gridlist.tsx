﻿/// <reference path="products_griditem.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import flow = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');
import { ProductGridItem } from './products_griditem';


export interface ProductsGridListState extends jx.Views.ReactState {
}
export interface ProductsGridListProps extends jx.Views.ReactProps {
    items:any
}
export class ProductsGridList extends jx.Views.ReactView {

    state: ProductsGridListState;
    props: ProductsGridListProps;

    constructor(props: ProductsGridListProps) {
        super(props);
    }


    get redux_enabled(): boolean {
        return true;
    }


    get_workflow() {
        return new GridWorkflow();
    }
    

    onAfterFlowAction() {
        
        switch (this.state.flowstate) {

            case Actions.ACTION_START: {
                
            } break;

            default:
                super.onAfterFlowAction();
        }
    }


    render() {

        var html =
            <div className="row items">
                {this.fill_with_items()}
            </div>

        return html;
    }


    fill_with_items() {

        switch (this.state.flowstate) {

            case Actions.ACTION_START: {

                var items = _.map(this.props.items, item => {
                    return <ProductGridItem owner={this.props.owner} key={utils.guid() } product={item} />
                });

                return items;

            } 
        }
    }
}



class Actions extends gn.GenericActions {
}


class GridWorkflow extends gn.GenericWorkflow {
    
}

