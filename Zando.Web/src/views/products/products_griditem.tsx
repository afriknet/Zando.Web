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
            <div className="col-sm-4 col-xs-12" data-prodid={this.props.product['id']}>

                <div className="productBox">

                    <div className="productImage clearfix im">
                        
                        <div style={{ maxHeight: 293.9, minWidth: 271.5 }}>
                            {this.resolve_image() }
                        </div>

                        <div className="productMasking">

                            <ul className="list-inline btn-group" role="group">
                                <li><a className="btn btn-default btn-zoom" href="javascript:void(0)"><i className="fa fa-search"></i></a></li>
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
                    this.props.owner['modal']['showModal'](this.props.product);
                });

                this.jget('.btn-zoom').click((e) => {

                    var id = $(e.currentTarget).closest('[data-prodid]').attr('data-prodid');

                    this.app.router.navigate('/productitem/{0}'.format(id));
                });

            } break;


            case Actions.ACTION_ADD_TO_CART: {
                
            } break;
            

            default:
                super.onAfterFlowAction();
        }
    }

}



class Actions extends gn.GenericActions {
    static ACTION_ADD_TO_CART: fl.FlowActionValue = 'ACTION_ADD_TO_CART'
}


class GridItemWorkflow extends gn.GenericWorkflow {

}