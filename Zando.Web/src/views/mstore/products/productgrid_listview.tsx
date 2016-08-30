/// <reference path="productgrid_boxview.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import gn = require('../../lib/redux/generic_workflow');
import box = require('./productgrid_boxview');


export interface ProductGridListViewProps extends jx.Views.ReactProps{
    
}
interface ProductGridListViewState extends jx.Views.ReactState{
    items: any[];
    items_on_page: number;
    activepage: number;
}


interface FilterValuesInfo {
    type: string,
    min?: number,
    max?: number
}

export class ProductGridListView extends jx.Views.ReactView{

    props:ProductGridListViewProps;
    state:ProductGridListViewState;
    unfiltered_count: number;
    skip_pageclick: boolean;

    whereclause: any;

    constructor(props:ProductGridListViewProps){

        super(props);
        
        this.state.loading = true;
        this.state.items_on_page = 8;
        this.whereclause = {};
    }

    componentDidMount(){
        
        jx.pubsub.subscribe(jx.constants.subpub.products_grid.on_filter_applied, (msg, info: FilterValuesInfo) => {
            this.apply_filter(info)
        });        
    }


    apply_filter(filterinfo:any) {

        switch (filterinfo.type) {

            case jx.constants.subpub.products_grid.filter_price_range: {

                //{size: {$gt: 2, $lt: 10}}

                this.whereclause = _.extend(this.whereclause, {
                    price: {
                        $gte: filterinfo['min'],
                        $lte: filterinfo['max']                         
                    }
                })
                
            } break;
        }

        this.load_page(this.state.activepage);

    }
    

    private query_count(): Q.Promise<number> {
        
        var d = Q.defer<number>();

        schema.call({
            fn: 'get',
            params: ['/products/:count', this.whereclause]
        }).then(res => {
            d.resolve(res.response as any);
        }).fail(err => {

        });

        return d.promise;

    }


    private fetch_page(activepage: number) {
        
        var d = Q.defer();
        
        this.query_count().then(count => {

            this.unfiltered_count = count;
            
            schema.call({
                fn: 'get',
                params: ['/products', _.extend( {
                    limit: this.state.items_on_page,
                    page: activepage
                }, this.whereclause)]
            }).then((res) => {
                
                d.resolve(res.response.results);

            }).fail((err) => {
                d.reject(err);
            });
            
        });
        
        return d.promise;   
    }


    render() {

        var that = this;

        function resolve_content():any {

            if (that.state.loading) {
                return <div style={{ minHeight: 350 }}></div>
            }

            var products =
                <div style={{ minHeight: 350}}>
                    {
                        _.map(that.state.items, item => {
                            return <box.ProductGridBoxView product={item} />
                        }) }
                </div>

            return [products, <GridPagination owner={that} totalcount={that.unfiltered_count} itemsOnPage={that.state.items_on_page} />]
        }
        

        var html =

            <div className="col-sm-9" style={{ minHeight:350 }}>
              <div className="title"><span>T-Shirts</span></div>
              <div className="product-sorting-bar">
                <div>Sort By
                  <select name="sortby" className="select2">
                    <option value="">Recomended</option>
                    <option value="">Low Price » High Price</option>
                    <option value="">High Price » High Price</option>
                  </select>
                </div>
                <div>Show
                  <select name="show" className="select2 items-onpage">
                    <option value="">8</option>
                    <option value="">12</option>
                    <option value="">16</option>
                  </select> per page
                </div>
          </div>

          { resolve_content() }

                
        </div>


        return html;
    }    


    load_page(page: number) {

        utils.spin(this.root);
        
        this.fetch_page(page).then((data) => {

            this.setState(_.extend(this.state, {
                items: data,
                loading: false,
                activepage: page
            }), () => {

                var old_val = this.skip_pageclick;

                this.skip_pageclick = true;

                try {

                    this.jget('.paging')['pagination']('selectPage', page);

                    jx.pubsub.publish(jx.constants.subpub.products_grid.on_products_loaded, data);

                } finally {

                    this.skip_pageclick = old_val;

                }

            });

        }).finally(() => {

            utils.unspin(this.root);

        });        
    }
    
}



interface GridPaginationProps extends jx.Views.ReactProps {
    totalcount: number,
    itemsOnPage: number
}
class GridPagination extends jx.Views.ReactView {

    props: GridPaginationProps;


    render() {

        var html =

            <div className="row">

                <div className="col-xs-12 text-center">
                    <div className="paging" style={{ display:'inline-block' }}>
                    </div>
                </div>
                

            </div>
    
        return html;
    }


    componentDidMount() {

        super.componentDidMount();


        this.forceUpdate();
    }


    componentDidUpdate() {

        super.componentDidUpdate();

        var that = this;

        this.root.find('.paging')['pagination']({

            items: that.props.totalcount,

            itemsOnPage: that.props.itemsOnPage,

            listStyle: 'pagination',

            prevText: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',

            nextText: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>',

            onPageClick: (pagenumber, ev: Event) => {

                if (ev) {
                    ev.preventDefault()
                }

                if (that.props.owner['skip_pageclick']) {
                    return;
                }

                if (pagenumber === 1) {
                    this.app.router.update_url('/products');
                } else {
                    this.app.router.update_url('/products/pages/{0}'.format(pagenumber));
                }

                utils.jump_up();

                that.props.owner['load_page'](pagenumber);

            }
        });

    }


}
