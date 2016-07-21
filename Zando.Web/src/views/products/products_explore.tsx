/// <reference path="product_modal.tsx" />
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
import reactboot = require('react-bootstrap');
var b: any = reactboot

import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import fl = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');
import gr = require('./products_gridlist');

import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';
import {ProdModal } from './product_modal';




interface ProductExplorerPageState extends jx.Views.ReactState {
    active_page: number
    data: any[]
}
export interface ProductExplorerPageProps extends jx.Views.ReactProps {
}


export class ProductExplorerPage extends jx.Views.ReactView {

    props: ProductExplorerPageProps;
    state: ProductExplorerPageState;
    unfiltered_count: number;
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


    get root(): JQuery {
        return $('#page-content');
    }
    

    componentDidMount() {
        
        $('#page-content').load('/html/products_explore.html', () => {

            this.init_view();

            this.mount_quickview();

            super.componentDidMount();
        });
    }


    mount_quickview() {

        ReactDOM.unmountComponentAtNode($('.quick-view')[0]);

        ReactDOM.render(<ProdModal owner={this} bsSize='lg' classlist='quick-view' hide_footer={true} />, $('.quick-view')[0]);
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
    

    get_workflow() {        
        return new ProdExplWorkflow();
    }
    

    onAfterFlowAction() {
        

        switch (this.state.flowstate) {

            case ProdExplActions.ACTION_START: {


                var page = this.get_page_from_url();

                if (!page) {
                    page = 1;
                }

                this.fetch_page(page);
                
            } break;


            case ProdExplActions.ACTION_FETCH_DONE: {

                utils.unspin(this.root);

                ReactDOM.unmountComponentAtNode($('.items-list')[0]);
                
                ReactDOM.render(<gr.ProductsGridList owner={this} items={this.state.data} />, $('.items-list')[0]);
                

                if (!this.state.active_page) {

                    this.init_paging();

                } else {

                    if (!this.state.active_page) {
                        
                    }
                } 
    
            } break;

            case ProdExplActions.ACTION_PAGE_CHANGED: {

                this.fetch_page(this.state.active_page);

            } break;
                
        }
    }
    

    get_page_from_url() {

        var page = undefined;

        if (this.app.router.params) {

            page = this.app.router.params.page;
        }

        try {

            page = parseInt(page)

        } catch(e){

            page = undefined;
        }

        return page;

    }


    fetch_page(activepage: number) {

        utils.spin(this.root);

        this.query_count().then(count => {

            this.unfiltered_count = count;

            this.flow.Exec(gn.GenericActions.ACTION_FETCH, {
                fn: 'get',
                params: ['/products', {
                    limit: 6,
                    page: activepage
                }]
            } as types.callParams);
        });
               
    }
    

    query_count(): Q.Promise<number> {

        var d = Q.defer<number>();

        schema.call({
            fn: 'get',
            params: ['/products/:count', {
                //active: true
            }]
        }).then(res => {
            d.resolve(res.response as any);
        });

        return d.promise;

    }
    

    go_to_page(pagenumber: number) {

        this.flow.Exec(ProdExplActions.ACTION_PAGE_CHANGED, {
            active_page: pagenumber
        });        
    }


    init_paging() {
                

        this.jget('.paging')['pagination']({

            items: this.unfiltered_count,

            itemsOnPage: 6,

            listStyle: 'pagination',

            prevText: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',

            nextText: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',

            onPageClick: (pagenumber, ev: Event) => {

                if (ev) { ev.preventDefault() }
                
                if (pagenumber === 1) {
                    this.app.router.update_url('/explore');
                } else {
                    this.app.router.update_url('/explore/{0}'.format(pagenumber));
                }

                this.go_to_page(pagenumber);
            }
        });

        if (!this.get_page_from_url()) {

            this.flow.Exec(ProdExplActions.ACTION_PAGE_CHANGED, {
                active_page: 1
            });

        } else {

            this.jget('.paging')['pagination']('selectPage', this.get_page_from_url());

        }

        

    }

}


class ProdExplActions extends gn.GenericActions {
    static ACTION_FILTER: fl.FlowActionValue = 'ACTION_FILTER'    
    static ACTION_PAGE_CHANGED: fl.FlowActionValue = 'ACTION_PAGE_CHANGED'
}


class ProdExplWorkflow extends gn.GenericWorkflow {

    Exec(action: fl.FlowActionValue, params?: any) {

        switch (action) {

            case ProdExplActions.ACTION_PAGE_CHANGED: {

                this.dispatch(ProdExplActions.ACTION_PAGE_CHANGED, params);

            } break;

            default:
                super.Exec(action, params);
        }
    }
}








