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
}

export class ProductGridListView extends jx.Views.ReactView{

    props:ProductGridListViewProps;
    state:ProductGridListViewState;
    unfiltered_count:number;
    

    constructor(props:ProductGridListViewProps){

        super(props);
        
        this.state.loading = true;

    }

    componentDidMount(){

        if(this.state.loading){

            utils.spin(this.root);

            this.fetch_page(1).then((data)=>{

                this.setState(_.extend(this.state, {
                    items: data,
                    loading: false
                }));

            }).finally(()=>{

                utils.unspin(this.root);

            });
            
        }
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
        }).fail(err => {

        });

        return d.promise;

    }


    fetch_page(activepage: number) {
        
        var d = Q.defer();

        this.query_count().then(count => {

            this.unfiltered_count = count;
            
            schema.call({
                fn: 'get',
                params: ['/products', {
                    limit: 8,
                    page: activepage
                }]
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

            var products = _.map(that.state.items, item => {
                return <box.ProductGridBoxView product={item} />
            })

            return [products, <GridPagination />]
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
              <select name="show" className="select2">
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
}


class GridPagination extends jx.Views.ReactView {

    render() {

        var html =

            <div className="col-xs-12 text-center">
                <ul className="pagination">
                    <li className="disabled"><a href="#">«</a></li>
                    <li className="disabled"><a href="#">‹</a></li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">›</a></li>
                    <li><a href="#">»</a></li>
                </ul>
            </div>


        return html;
    }
}
