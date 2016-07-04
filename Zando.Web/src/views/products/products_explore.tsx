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
import flow = require('../../lib/redux/workflow');



interface ProductExplorerPageState extends jx.Views.ReactState {
    
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
        return new Workflow();
    }


    onStateHasChanged() {

    }
}



class Actions extends flow.FlowAction {
}

class States extends flow.FlowState {

}

class Workflow extends flow.Workflow {


    

}






