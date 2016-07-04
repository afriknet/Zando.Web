/// <reference path="products_griditem.tsx" />
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
    

    onStateHasChanged() {
        
        switch (this.state.flow.flowstate) {

            case States.STATE_STARTED: {
                
            } break;
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

        switch (this.state.flow.flowstate) {

            case States.STATE_STARTED: {

                var items = _.map(this.props.items, itm => {
                    return <ProductGridItem />
                });

                return items;

            } 
        }
    }
}



class Actions extends gn.GenericActions {
}

class States extends gn.GenericStates {

}

class GridWorkflow extends gn.GenericWorkflow {
    
}

