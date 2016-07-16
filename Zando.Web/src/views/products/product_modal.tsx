// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import reactboot = require('react-bootstrap');
var b: any = reactboot

import jx = require('../../lib/jx');

import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';


export class ProdModal extends Modal {

    product: any;

    constructor(props?: any) {
        super(props);
        this.props.owner['modal'] = this;
    }


    componentDidUpdate() {

        if (super.componentDidUpdate) {
            super.componentDidUpdate();
        }
        
    }


    get_parent_height(el: JQuery) {

        var h = $(el).height();

        if (h == 0) {
            return this.get_parent_height($(el).parent());
        }

        return $(el);
    }


    showModal(product: any) {

        this.product = product;

        super.show(this.quick_view());
    }



    quick_view() {

        var url = this.product ? this.product.images[0].file.url : '';

        var img = <img className="media-object" src={url} alt="Image"/>

        var html =
            <div className="media">

                <div className="media-left" style={{ maxWidth: 460, maxHeight: 453 }}>
                    {img}
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

        return html;
    }

}