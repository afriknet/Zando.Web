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
    is_embedded:boolean
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
              <form>
                <div className="row">
                  
                    <div className="profile">

                        <ctrls.TextControl label="First Name" required={true} field="name" obj={this.usr} />

                        <ctrls.TextControl label="Last Name" field="surname" required={true} obj={this.usr} />

                        <ctrls.TextControl label="Email" field="email" required={true} obj={this.usr} />

                        <ctrls.TextControl label= "Telephone" field= "phone" obj= { this.address} />

                        {/**/}

                        {/*
                        <div className="form-group col-sm-6">
                            <label htmlFor="firstNameInput">First Name</label>
                            <input type="text" name='first' data-bind='textInput:name' placeholder="First Name" id="firstNameInput" className="form-control" />
                        </div>

                        <div className="form-group col-sm-6">
                            <label htmlFor="lastNameInput">Last Name</label>
                            <input type="text" name='last' data-bind='textInput:surname' placeholder="Last Name" id="lastNameInput" className="form-control" />
                        </div>
                  
                        <div className="form-group col-sm-6">
                            <label htmlFor="emailInput">Email Address</label>
                            <input type="email" name='email' data-bind='textInput:email' placeholder="Email Address" id="emailInput" className="form-control" />
                        </div>
                  
                        <div className="form-group col-sm-6">
                            <label htmlFor="phoneInput">Phone Number</label>
                            <input type="text" name='phone' data-bind='textInput:phone' placeholder="Phone Number" id="phoneInput" className="form-control" />
                        </div>
                        */}
                  </div>

                  <div className="address">

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

                  </div>
                    
                </div>

              </form>


        return html;

    }


    componentDidMount() {


        this.jget('.btn-reset-pass').click(() => {
            //(this.refs['modal'] as Modal).show(<ChangePassword owner={this} />);
        });

        if (this.state.loading) {

            utils.spin(this.root);

            this.load_account().then(() => {

                this.root.validate({
                    rules: {
                        first: 'required',
                        last: 'required',
                        email: {
                            required: true,
                            email: true
                        }
                    }
                });

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

 }