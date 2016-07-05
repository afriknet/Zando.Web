// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX




import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import flow = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');




export class ProductGridItem extends jx.Views.ReactView {

    get redux_enabled(): boolean {
        return true;
    }


    get_workflow() {
        return new GridWorkflow();
    }


    render() {

        var html =
            <div className="col-sm-4 col-xs-12">

                <div className="productBox">

                    <div className="productImage clearfix">

                        <img src="/img/products/products-01.jpg" alt="products-img"/>

                        <div className="productMasking">

                            <ul className="list-inline btn-group" role="group">
                                <li><a data-toggle="modal" href=".login-modal" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
                                <li><a href="cart-page.html" className="btn btn-default"><i className="fa fa-shopping-cart"></i></a></li>
                                <li><a className="btn btn-default" data-toggle="modal" href=".quick-view"><i className="fa fa-eye"></i></a></li>
                            </ul>

                        </div>

                    </div>

                    <div className="productCaption clearfix">

                        <a href="javascript:void(0)">
                            <h5>Nike Sportswear</h5>
                        </a>
                        <h3>$199</h3>
                    </div>
                </div>
                
            </div>


        return html;

    }
}



class Actions extends gn.GenericActions {
}


class GridWorkflow extends gn.GenericWorkflow {

}