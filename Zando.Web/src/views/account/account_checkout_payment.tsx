

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, CheckBox} from '../../lib/controls';


enum PaymentOptions { card, paypal }

export interface AccountCheckoutPaymentsProps extends jx.Views.ReactProps {
    index: number
}
export class AccountCheckoutPayments extends jx.Views.ReactView {

    props: AccountCheckoutPaymentsProps;
    services: any[];


    constructor(props: AccountCheckoutPaymentsProps) {

        super(props);

        this.state.loading = true;
        
        this.props.owner['pages'].push({
            index: this.props.index,
            view: this
        });
    }

    get account(): any {
        return this.props.owner['data'];
    }

    get method_select(): JQuery {
        return this.jget('.method-select');
    }

    get cardtype_select(): JQuery {
        return this.jget('.card-select');
    }

    
    get cardno_txt(): JQuery {
        return this.jget('.card-no');
    }

    get cardcv_txt(): JQuery {
        return this.jget('.card-cv');
    }

    get cardexp_month_select(): JQuery {
        return this.jget('.card-expire');
    }

    get cardexp_year_select(): JQuery {
        return this.jget('.card-year');
    }


    render() {
        var html =
            <div >

                <div className="col-xs-12 no-p">
                    <div className="page-header">
                        <h4>Payment Information</h4>
                    </div>
                </div>

                <br/>

                <form>

                   <div className="form-group col-sm-4 col-xs-12" style={{ marginBottom: 60 }}>

                        <label htmlFor="">Payment By</label>

                        <span className="step-drop" >
                          <select name="guiest_id3" id="guiest_id3" className="select-drop method-select">
                            <option value="0">Credit Card</option>
                            <option value="1">Paypal</option>                        
                          </select>
                        </span>
                   </div>

                   <div className="form-group col-sm-4 col-xs-12 card" style={{ marginBottom: 60 }}>
                        <label htmlFor="">Card type </label>
                        <span className="step-drop">
                          <select name="guiest_id3" id="guiest_id3" className="select-drop card-select">
                            <option value="0">Visa</option>
                            <option value="1">Master</option>                        
                          </select>
                        </span>
                  </div>

                   <div className="form-group col-sm-4 col-xs-12 card" style={{ marginBottom: 60 }}>
                        <label htmlFor="">Card Number</label>
                        <input type="password" required name="cardno" className="form-control card-no" id=""/>
                   </div>
                

                    <div className="form-group col-sm-4 col-xs-12 card">
                        <label htmlFor="">Expiration Date</label>
                        <div className="row">
                          <div className="col-xs-6">
                            <span className="step-drop">
                              <select name="guiest_id3" id="guiest_id3" className="select-drop card-expire">
                                <option value="0">month</option>
                                <option value="1">month 1</option>
                                <option value="2">month 2</option>
                                <option value="3">month 3</option>
                              </select>
                            </span>
                          </div>
                          <div className="col-xs-6 card">
                            <span className="step-drop">
                              <select name="guiest_id3" id="guiest_id3" className="select-drop card-year">
                                <option value="0">2016</option>
                                <option value="1">2017</option>
                                <option value="2">2018</option>
                                <option value="3">2019</option>
                              </select>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-sm-4 col-xs-12 card">
                        <label htmlFor="">CV Code</label>
                        <input type="text" required name="cardcv" className="form-control card-cv" id=""/>
                      </div>
                    
               </form>

               <br/>

                <div className="col-xs-12 paypal no-p" style={{ display: 'none', textAlign:'center' }}>
                    <h4 style={{ display:'inline-block' }}><i className="fa fa-hourglass-end" aria-hidden="true"></i> <span>Under construction</span></h4>
                </div>

               

           </div>;

        return html;
    }


    componentDidMount() {

        this.root.find('input').css('font-size', '18px');

        this.root.find('select').css('font-size', '18px');

        this.root.find('.select-drop')['selectbox']({

            onChange: (val:any) => {

                if (parseInt(val) === PaymentOptions.paypal) {

                    this.jget('.card').hide();

                    this.jget('.paypal').show();

                } else {

                    this.jget('.card').show();

                    this.jget('.paypal').hide();
                }

            }
        });

        this.root.find('.step-drop a').css('font-size', '18px');

        this.set_validations();
        
    }


    set_validations() {

        this['validator'] = this.root.find('form').validate({

            success:'valid',

            errorPlacement: function (error, element) { },

            highlight: (el) => {
                this.set_error($(el));
            },

            unhighlight: (el) => {
                this.unset_error($(el));
            },
        });
    }


    set_error(el: JQuery) {

        var __error = {
            border: '1px solid #CC5965',
            'box-shadow': '0 0 3px #CC5965'
        }

        el.css(__error);

        var label = el.closest('.form-group').find('label');

        label.attr('data-color', label.css('color'));

        label.css('color', '#CC5965');
    }


    unset_error(el: JQuery) {

        el.css("border", "medium none");
        el.css("box-shadow", "none");

        var label = el.closest('.form-group').find('label');

        label.css('color', '#555!important');


    }


    load_data() {

        var d = Q.defer();

        utils.spin(this.root);

        schema.call({
            fn: 'get',
            params: ['/settings/shipments']
        }).then(res => {

            this.services = _.filter(res.response['services'], (srv: any) => {
                return srv.price != undefined;
            });


            d.resolve(true);

        }).finally(() => {
            utils.unspin(this.root);
        });


        return d.promise;
    }

    private sel_val(sel: JQuery) {
        return parseInt(sel.val());
    }

    can_go_next(): Q.Promise<boolean> {

        var meth = this.sel_val(this.method_select);

        if (meth === PaymentOptions.card) {

            var ok = this.jget('form').valid();

            if (ok) {
                return Q.resolve(true);
            } else {
                return Q.reject(false) as any;
            }
        }

        return Q.reject(false) as any;
    }
}