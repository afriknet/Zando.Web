/// <reference path="products_gridlist.tsx" />
/// <reference path="../../lib/redux/generic_workflow.tsx" />
/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../lib/redux/reducers.tsx" />
/// <reference path="../../lib/redux/workflow.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import fl = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');
import gr = require('./products_gridlist');




interface ProductExplorerPageState extends jx.Views.ReactState {
    active_page: number
    data: any
}
export interface ProductExplorerPageProps extends jx.Views.ReactProps {
}


export class ProductExplorerPage extends jx.Views.ReactView {

    props: ProductExplorerPageProps;
    state: ProductExplorerPageState;
    items: any[];

    constructor(props?: ProductExplorerPageProps) {
        super(props);
        this.state.loading = true;
    }


    render() {        
        return null
    }


    get redux_enabled(): boolean {
        return true;
    }


    componentDidMount() {
        
        $('#page-content').load('/html/products_explore.html', () => {

            this.init_view();

            super.componentDidMount();
        });
    }


    init_view() {

        this.activate_user();

    }


    activate_user() {

        carts.display_cart();

        if (this.app.get_account()) {
            $('.my-account').removeClass('hidden');
            $('.my-account').removeClass('hidden');
        }
    }


    load_items() {

        var d = Q.defer();

        utils.spin(this.root);

        schema.call({
            fn: 'get',
            params: ['/products']
        }).then(res => {

            this.items = [];

            if (res.response && res.response.results) {
                this.items = res.response.results;
            }

            d.resolve(true);

        }).fail(err => {

            d.reject(false);
        });


        return d.promise;
    }


    get_workflow() {        
        return new ProdExplWorkflow();
    }


    onStateHasChanged() {

        var count = 0;

        switch (this.state.flowstate) {

            case ProdExplStates.STATE_STARTED: {
                
                this.flow.Exec(gn.GenericActions.ACTION_FETCH, {
                    fn: 'get',
                    params: ['/products', {
                        limit: 6,
                        page: 1
                    }]
                } as schema.callParams);

            } break;


            case ProdExplStates.STATE_FETCH_DONE: {

                var data = this.state.data

                ReactDOM.render(<gr.ProductsGridList items={data} />, $('.items')[0]);

                var __active_page = this.state.active_page;

                if (!__active_page) {
                    __active_page = 1;
                }

                this.flow.Exec(ProdExplActions.ACTION_PAGE_DATA,{
                    active_page: __active_page
                });
                    
            } break;

            case ProdExplStates.STATE_FETCH_FAIL: {
                
            } break;
        }
    }
}



class ProdExplActions extends gn.GenericActions {
    static ACTION_FILTER: fl.FlowActionValue = 'ACTION_FILTER'
    static ACTION_PAGE_DATA: fl.FlowActionValue = 'ACTION_PAGE_DATA'
}

class ProdExplStates extends gn.GenericStates {
    static STATE_FILTERING: fl.FlowStateValue = 'STATE_FILTERING'
    static STATE_HAS_PAGED: fl.FlowStateValue = 'STATE_HAS_PAGED'
}

class ProdExplWorkflow extends gn.GenericWorkflow {

    Exec(action: fl.FlowActionValue, params?: any) {

        switch (action) {

            case ProdExplActions.ACTION_PAGE_DATA: {

                this.dispatch(ProdExplStates.STATE_HAS_PAGED, params);

            } break;

            default:
                super.Exec(action, params);
        }

    }

}






