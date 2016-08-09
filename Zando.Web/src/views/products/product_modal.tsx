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

    resolve_image() {

        var img = null, prod = this.product;
        
        if (prod['amazon'] && parseInt(prod['amazon']) === 1) {

            img = aws.retrieve_pict(prod);

            //img =
            //    <div className="">
            //        <div className="product-imitation" style={{ height: '260' }}>
            //            <img alt="products-img" className="scale img-responsive" data-scale="best-fill" data-align="center" src={img_url} />
            //        </div>
            //    </div>

        } else {

            if (prod.images && prod.images.length > 0) {

                img = prod.images[0].file.url;

                //img = <img style={{ width: '100%', height: '100%' }} src={url} alt="products-img"/>

            }

        }


        return img;
    }



    quick_view() {

        var url = this.resolve_image(); //this.product ? this.product.images[0].file.url : '';

        var img = <img className="media-object" src={url} alt="Image"/>

        var html =
            <div className="media">

                <div className="media-left" style={{ maxWidth: 460, maxHeight: 453 }}>
                    {img}
                </div>
                
                <div className="media-body">
                    <h2>{this.product.name}</h2>
                    <br />
                    <h3 style={{ color:'#c5c5c5'}}>{"€" + this.product.price}</h3>
                    <p>{this.product.description}</p>
                    {/*
                    <span className="quick-drop hidden">
                        <select name="guiest_id3" id="guiest_id3" className="select-drop">
                            <option value={"0"}>Size</option>
                            <option value="1">Size 1</option>
                            <option value="2">Size 2</option>
                            <option value="3">Size 3</option>
                        </select>
                    </span>
                    <span className="quick-drop resizeWidth hidden">
                        <select name="guiest_id4" id="guiest_id4" className="select-drop">
                            <option value="0">Qty</option>
                            <option value="1">Qty 1</option>
                            <option value="2">Qty 2</option>
                            <option value="3">Qty 3</option>
                        </select>
                    </span> */}
                    <div className="btn-area">
                        <a href="#" className="btn btn-primary btn-block">Add to cart <i className="fa fa-angle-right" aria-hidden="true" /></a>
                    </div>
                </div>

            </div>

        return html;
    }

}