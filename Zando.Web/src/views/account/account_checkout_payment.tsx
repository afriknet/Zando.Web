

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, CheckBox} from '../../lib/controls';




export interface AccountCheckoutPaymentsProps extends jx.Views.ReactProps {
    
}
export class AccountCheckoutPayments extends jx.Views.ReactView {

    props: AccountCheckoutPaymentsProps;
    services: any[];


    constructor(props: AccountCheckoutPaymentsProps) {

        super(props);

        this.state.loading = true;
        
    }

    get account(): any {
        return this.props.owner['data'];
    }


    render() {
        var html =
            <div >

                <div className="col-xs-12">
                    <div className="page-header">
                        <h4>Payment Information</h4>
                    </div>
                </div>

                <br/>

               <div className="form-group col-sm-4 col-xs-12" style={{ marginBottom: 50 }}>

                    <label htmlFor="">Payment By</label>

                    <span className="step-drop" >
                      <select name="guiest_id3" id="guiest_id3" className="select-drop">
                        <option value="0">Credit Card</option>
                        <option value="1">Paypal</option>                        
                      </select>
                    </span>
               </div>

               <div className="form-group col-sm-4 col-xs-12" style={{ marginBottom: 50 }}>
                    <label htmlFor="">Card type </label>
                    <span className="step-drop">
                      <select name="guiest_id3" id="guiest_id3" className="select-drop">
                        <option value="0">Visa</option>
                        <option value="1">Master</option>                        
                      </select>
                    </span>
              </div>

               <div className="form-group col-sm-4 col-xs-12" style={{ marginBottom: 50 }}>
                    <label htmlFor="">Card Number</label>
                    <input type="password" className="form-control" id=""/>
               </div>
                

                <div className="form-group col-sm-4 col-xs-12">
                    <label htmlFor="">Expiration Date</label>
                    <div className="row">
                      <div className="col-xs-6">
                        <span className="step-drop">
                          <select name="guiest_id3" id="guiest_id3" className="select-drop">
                            <option value="0">month</option>
                            <option value="1">month 1</option>
                            <option value="2">month 2</option>
                            <option value="3">month 3</option>
                          </select>
                        </span>
                      </div>
                      <div className="col-xs-6">
                        <span className="step-drop">
                          <select name="guiest_id3" id="guiest_id3" className="select-drop">
                            <option value="0">2016</option>
                            <option value="1">2017</option>
                            <option value="2">2018</option>
                            <option value="3">2019</option>
                          </select>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-sm-4 col-xs-12">
                    <label htmlFor="">CV Code</label>
                    <input type="text" className="form-control" id=""/>
                  </div>
                
           </div>;

        return html;
    }


    componentDidMount() {

        this.root.find('input').css('font-size', '18px');
        this.root.find('select').css('font-size', '18px');

        this.root.find('.select-drop')['selectbox']();

        this.root.find('.step-drop a').css('font-size', '18px');
    }


    componentDidUpdate() {
        
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


    can_go_next(): Q.Promise<boolean> {
        return Q.resolve(true);
    }
}