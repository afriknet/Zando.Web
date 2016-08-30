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
    is_checking_out: boolean,
    display_actions?: boolean
}
export class AccountProfile extends jx.Views.ReactView{

    account: any;
    props: AccountProfileProps;
    pssw: string;

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

        var hide_actions = this.props.display_actions ? '' : 'hidden';

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

                  <div className="col-lg-12 actions">
                      <button className={"btn btn-sm {0}".format(hide_actions) } onClick={this.save.bind(this)}><i className="fa fa-check"></i> <span>Sauvergarder</span></button>
                  </div>  
                  

                </div>

              </div>


        return html;

    }


    componentDidMount() {


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


    save() {

        if (!this.validate()) {
            return;
        }

        var usr: any = (ko as any).mapping.toJS(this.usr);

        utils.spin(this.root);

        this.state.loading = true;


        Backendless.UserService.update(usr, new Backendless.Async(_usr => {

            this.app.store_user(_usr);

            var account: any = {
                email: _usr['email'],
                first_name: _usr['name'],
                last_name: _usr['surname']
            }

            if (this.pssw) {
                account.password = this.pssw;
            }


            this.update_account(account).then(() => {

                this.app.store_account(account['email']).then(() => {

                    toastr.info('Profile updated successfully');

                    this.app.update_login_info();

                    utils.unspin(this.root);

                }).finally(() => {

                    utils.unspin(this.root);
                });


            }).finally(() => {

                utils.unspin(this.root);

            });


        }, (err: any) => {

            toastr.error(err.message);

            utils.unspin(this.root);

        }));

    }


    update_account(acc: any): Q.Promise<any> {

        var d = Q.defer();

        schema.call({
            fn: 'put',
            params: ['/accounts/{0}'.format(this.app.get_account()['id']), acc]
        }).then(res => {

            d.resolve(res.response);

        }).fail(err => {

            toastr.error(err);

            d.reject(err);

        });

        return d.promise;

    }

 }