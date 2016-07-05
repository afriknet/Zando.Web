// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX




import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import fl = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';




export interface ProductGridItemProps extends jx.Views.ReactProps {
    product: any
}
export class ProductGridItem extends jx.Views.ReactView {

    props: ProductGridItemProps;

    get redux_enabled(): boolean {
        return true;
    }


    get_workflow() {
        return new GridItemWorkflow();
    }


    render() {

        var html =
            <div className="col-sm-4 col-xs-12">

                <div className="productBox">

                    <div className="productImage clearfix im">
                        
                        <div style={{ maxHeight: 293.9, minWidth: 271.5 }}>
                            {this.resolve_image() }
                        </div>

                        <div className="productMasking">

                            <ul className="list-inline btn-group" role="group">
                                <li><a href="javascript:void(0)" className="btn btn-default"><i className="fa fa-heart"></i></a></li>
                                <li><a href="javascript:void(0)" className="btn btn-default btn-cart"><i className="fa fa-shopping-cart"></i></a></li>
                                <li><a className="btn btn-default btn-quickview" href="javascript:void(0)"><i className="fa fa-eye"></i></a></li>
                            </ul>

                        </div>

                    </div>

                    <div className="productCaption clearfix">

                        <a href="javascript:void(0)">
                            <h5>{this.props.product['name']}</h5>
                        </a>
                        <h3 data-price={this.props.product['price']}></h3>
                    </div>
                </div>
                
            </div>


        return html;

    }


    resolve_image() {

        var img = null, prod = this.props.product;

        if (prod.images && prod.images.length > 0) {

            var url = prod.images[0].file.url;

            img = <img style={{ width: '100%', height:'100%' }} src={url} alt="products-img"/>

        }
        
        return img;        
    }


    onAfterFlowAction() {

        switch (this.state.flowstate) {

            case Actions.ACTION_START: {

                _.each(this.jget('[data-price]'), el => {
                    $(el)['autoNumeric']('init', { 'aSign': '€' });
                    $(el)['autoNumeric']('set', $(el).attr('data-price'));
                });


                this.jget('.btn-cart').click(() => {
                    carts.flyToElement(this.jget('.btn-cart'), $('.products-cart'), () => {                        
                    });
                });

                this.jget('.btn-quickview').click(() => {

                    (this.props.owner['modal'] as Modal).show(this.quick_view());

                });

            } break;


            case Actions.ACTION_ADD_TO_CART: {



            } break;
            

            default:
                super.onAfterFlowAction();
        }
    }


    quick_view() {

        var html =
            <div>

                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"> & times; </button>

                <div className="media">

                    <div className="media-left">
                        <img className="media-object" src="/img/products/quick-view/quick-view-01.jpg" alt="Image"/>
                    </div>
                                           
                    <div className="media-body">
                        <h2>Old Skool Navy</h2>
                        <h3>$149</h3>
                        <p>Classic sneaker from Vans.Cotton canvas and suede upper.Textile lining with heel stabilizer and ankle support.Contrasting laces.Sits on a classic waffle rubber sole.</p>
                        <span className="quick-drop">
                            <select name="guiest_id3" id="guiest_id3" className="select-drop">
                                <option value={"0"}>Size</option>
                                <option value="1">Size 1</option>
                                <option value="2">Size 2</option>
                                <option value="3">Size 3</option>
                            </select>
                        </span>
                        <span className="quick-drop resizeWidth">
                            <select name="guiest_id4" id="guiest_id4" className="select-drop">
                                <option value="0">Qty</option>
                                <option value="1">Qty 1</option>
                                <option value="2">Qty 2</option>
                                <option value="3">Qty 3</option>
                            </select>
                        </span>
                        <div className="btn-area">
                            <a href="#" className="btn btn-primary btn-block">Add to cart <i className="fa fa-angle-right" aria-hidden="true" /></a>
                        </div>
                  </div>

                </div>    
            </div>

        return html;
    }
}



class Actions extends gn.GenericActions {
    static ACTION_ADD_TO_CART: fl.FlowActionValue = 'ACTION_ADD_TO_CART'
}


class GridItemWorkflow extends gn.GenericWorkflow {

}