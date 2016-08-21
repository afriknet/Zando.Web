/// <reference path="../../../lib/controls.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import ctrls = require('../../../lib/controls');



export interface AccountProfileProps extends jx.Views.ReactProps{
    is_checking_out:boolean
}
export class AccountProfile extends jx.Views.ReactView{

    account: any;
    props:AccountProfileProps;

    constructor(props:AccountProfileProps){
        super(props);
        this.state.loading = true;
    }


    private __usr: any;
    get usr(): any {

        if (!this.__usr) {

            var usr_obj = this.app.get_user();

            var reset = !usr_obj || ((usr_obj['surname']) && ((usr_obj['surname'] as string).indexOf('guest_surname_') === 0));

            if (reset) {

                usr_obj['name'] = usr_obj['surname'] = null;

            }
            
            this.__usr = ko['mapping'].fromJS(usr_obj)
        }

        return this.__usr;
    }


    private __address: any;
    get address(): any {

        if (!this.__address) {

            var address = this.account['addresses'].results[0];

            if (!address) {

                address = {
                    phone: '',
                    address1: '',
                    city: '',
                    country: ''
                }
            }

            this.__address = ko['mapping'].fromJS(address);
        }
        return this.__address;
    }


    render() {

        if (this.state.loading) {
            return <div style={{ minHeight:200 }} ></div>
        }

        var html =
              <div>
                <div className="row">
                  
                    <form className="profile">

                        <div className="col-lg-12" style={{ paddingLeft: 0, paddingRight:0 }}>

                            <ctrls.TextControl label="First Name" required={true} field="name" obj={this.usr} />

                            <ctrls.TextControl label="Last Name" field="surname" required={true} obj={this.usr} />

                        </div>


                        <div className="col-lg-12" style={{ paddingLeft: 0, paddingRight: 0 }}>

                            <ctrls.TextControl label="Email" field="email" type="email" required={true} obj={this.usr} />

                            <ctrls.TextControl label= "Telephone" field= "phone" obj= { this.address} />

                        </div>
                        
                        

                  </form>

                  <form className="address">

                        <div className="form-group col-sm-12">
                            <label htmlFor="addressInput">Address</label>
                            <textarea id="addressInput" name='address1'
                                data-bind='textInput:address1'
                                rows={3} className="form-control" defaultValue={""} />
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="cityInput">City </label>
                            <input type="text" placeholder="City"
                                data-bind='textInput:city'
                                name='city' id="cityInput" className="form-control" />
                        </div>

                        <ctrls.CountryControl label= "Country" field= "country" obj= { this.address } required={true}/>

                  </form>
                    
                </div>

              </div>


        return html;

    }


    componentDidMount() {


        this.jget('.btn-reset-pass').click(() => {
            //(this.refs['modal'] as Modal).show(<ChangePassword owner={this} />);
        });

        if (this.state.loading) {

            utils.spin(this.root);

            this.load_account().then(() => {


                this.root.find('.profile').validate({
                    rules: {
                        first: 'required',
                        last: 'required',
                        email: {
                            required: true,
                            email: true
                        }
                    }
                });


                if (this.props.is_checking_out) {

                    this.root.find('.address').validate({
                        rules: {
                            address1: 'required',
                            last: 'required',
                            city: 'required'
                        }
                    });
                }


                ko.cleanNode(this.root[0]);


                this.setState(_.extend(this.state, {
                    loading: false
                }), () => {

                    ko.applyBindings(this.address, this.root.find('.address')[0]);
                });


            }).finally(() => {

                utils.unspin(this.root);
            });

        }
        
    }
    

    load_account(){

        var that = this;

        var d = Q.defer();

        if (!this.app.get_account()) {
            return Q.reject(false);
        }

        var id = this.app.get_account()['id']

        utils.spin(this.root);
        
        schema.call({
            fn: 'get',
            params: ['/accounts/{0}'.format(id), { expand: 'addresses' }]
        }).then(res => {
            
            this.account = res.response;
            
            d.resolve(true);

        }).finally(() => {
            utils.unspin(this.root);
        });

        return d.promise;

    }


    validate(): boolean {

        var el = this.root.find('.profile');

        var ok = el.valid();

        if (ok && this.props.is_checking_out) {
            ok = this.root.find('.address').valid();
        }

        return ok;
    }

 }