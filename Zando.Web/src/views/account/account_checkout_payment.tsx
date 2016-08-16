

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, CheckBox} from '../../lib/controls';


export enum PaymentType { card, paypal }


export interface PaymentInfo {
    cart_type: PaymentType,
    card_number: string,
    card_cvc: string,
    exp_month: number,
    exp_year: number
}


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

        function get_exp_years() {
            
            var k: number = 0;

            var years: any[] = [];

            while (k <= 20) {

                var val = 2010 + 1 * k;

                years.push(<option value={"{0}".format(val) }>{val}</option>);

                k++;
            }

            return years;
        }


        var months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];


        var html =

            <div>

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
                                        {_.map([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], k => {
                                            return <option value={"{0}".format(k) }>{months[k]}</option>
                                        }) }                                
                              </select>
                            </span>
                          </div>
                          <div className="col-xs-6 card">
                            <span className="step-drop">
                              <select name="guiest_id3" id="guiest_id3" className="select-drop card-year">
                                        {
                                            get_exp_years()
                                        }
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

        this.root.find('.method-select')['selectbox']({

            onChange: (val:any) => {

                if (parseInt(val) === PaymentType.paypal) {

                    this.jget('.card').hide();

                    this.jget('.paypal').show();

                } else {

                    this.jget('.card').show();

                    this.jget('.paypal').hide();
                }
            }
        });


        this.root.find('.select-drop').not('.method-select')['selectbox']();


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


    private string_to_int(sel: JQuery) {
        return parseInt(sel.val());
    }


    get_payment_info(): PaymentInfo {

        return {
            cart_type: this.string_to_int(this.method_select),
            card_number: this.cardno_txt.val(),
            card_cvc: this.cardcv_txt.val(),
            exp_month: this.string_to_int(this.cardexp_month_select),
            exp_year: this.string_to_int(this.cardexp_year_select)
        }

    }


    can_go_next(): Q.Promise<boolean> {

        var meth = this.string_to_int(this.method_select);

        if (meth === PaymentType.card) {

            var ok = this.jget('form').valid();

            if (ok) {

                this.props.owner['payment_info'] = this.get_payment_info();

                return Q.resolve(true);
            } else {
                return Q.reject(false) as any;
            }
        }

        return Q.reject(false) as any;
    }
}