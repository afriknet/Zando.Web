/// <reference path="../../lib/controls.tsx" />

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import ReactB = require('react-bootstrap');
var b: any = ReactB;

import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';


interface AccountProfilePageState extends jx.Views.ReactState {
}
export interface AccountProfilePageProps extends jx.Views.ReactProps {
    
}
export class AccountProfilePage extends jx.Views.ReactView {

    props: AccountProfilePageProps;
    account: any;

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


    private pssw: any;


    constructor(props: AccountProfilePageProps) {
        super(props);        
    }


    render() {

        var html =
            <div className="animated fadeInUp">

                <BigLabel label="My profile" inline={true} />

                <a href="javascript:void(0)" className="pull-right text-info btn-reset-pass" style={{ marginTop: 5, fontSize:15 }}>Reset password</a>

                <i className="pull-right fa fa-spin fa-spinner fa-2x text-primary hidden" style={{ marginLeft:10 }}></i>

                <hr />

                <div className="row">

                    <div className="col-md-2 col-sm-3 col-xs-12">
                        <div className="thumbnail">
                            <img alt="profile-image" src="/img/products/profile/profile-image.jpg" />
                            <div className="caption">
                                <a role="button" className="btn btn-primary btn-block" href="#">Change Avatar</a>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-10 col-sm-9 col-xs-12">

                        <form className="form-horizontal">

                            <TextControl label="First name" field="name" required />
                            <TextControl label="Last name" field="surname" required />
                            <TextControl label="Email address" field="email" required type="email"/>
                            <TextControl label="Phone number" field="phone" />
                            
                            
                            <div className="form-group">                                
                                
                                <div className="col-md-offset-10 col-md-2 col-sm-offset-9 col-sm-3">
                                    <button className="btn btn-primary btn-block btn-save"
                                        onClick={() => { this.update_profile() } }
                                        type="button">
                                        SAVE INFO
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>

                    <Modal ref='modal' owner={this} onClosing={() => { return this.update_password(); } } />

                </div>
            </div>

        return html;
    }


    update_password(): Q.Promise<Boolean> {

        return this['change_psw'].save().then((new_psw:any) => {

            var acc = {
                password: new_psw
            }

            return this.update_account(acc).then(() => {

                return true;
            });
            
        });
        
    }


    update_profile() {
        
        if (this.jget('.form-horizontal').valid()) {

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


    componentDidMount() {

        this.jget('.btn-reset-pass').click(() => {
            (this.refs['modal'] as Modal).show(<ChangePassword owner={this} />);
        });
        

        this.jget('.form-horizontal').validate({
            rules: {
                first_name: 'required',
                last_name: 'required',
                email: {
                    required: true,
                    email: true
                }
            }
        });


        ko.cleanNode(this.jget('form')[0]);

        ko.applyBindings(this.usr, this.jget('form')[0]);
    }


    componentDidUpdate() {

        ko.cleanNode(this.jget('form')[0]);

        ko.applyBindings(this.usr, this.jget('form')[0]);
    }


    load_account(): Q.Promise<any> {

        var d = Q.defer();

        var id = this.app.get_account()['id']

        this.jget('.fa-spin').removeClass('hidden');

        schema.call({
            fn: 'get',
            params: ['/accounts/{0}'.format(id)]
        }).then(res => {

            this.account = res.response;

            if (!this.account['phone']) {
                this.account['phone'] = '';
            }

            this.account = ko['mapping'].fromJS(this.account);

            d.resolve(true);

        }).finally(() => {
            //utils.unspin(this.root);
            this.jget('.fa-spin').addClass('hidden');
        });

        return d.promise;
    }
}



export class ChangePassword extends jx.Views.ReactView {

    constructor(props?: any) {
        super(props);
        this.props.owner['change_psw'] = this;
    }

    render() {

        var html =
                <div className="col-lg-12 commentsForm" style={{ padding:20 }}>

                    <BigLabel label="Reset your password" />

                    <br />
                    {/**/}
                    <form className="form-horizontal">

                        <TextControl label="old password" type="password" field='curr_psw' />
                            
                        <TextControl label="new password" type="password" field='new_psw'/>

                    </form>

             </div>
        

        return html;

    }


    componentDidMount() {
        
        this.jget('form').validate({
            rules: {
                curr_psw: 'required',
                new_psw: 'required'
            }
        })
        
    }


    save() {

        var form = this.jget('form');

        if (!form.valid()) {
            return Q.reject(false) as any;
        }

        var d = Q.defer<Boolean>();

        utils.spin(form);

        var email = this.app.get_user()['email'];
        var pswrd = form.find('[name="curr_psw"]').val();
        var new_pswrd = form.find('[name="new_psw"]').val();

        Backendless.UserService.login(email, pswrd, false, new Backendless.Async((usr: any) => {

            usr['password'] = new_pswrd;

            var model = Backendless.Data.of(Backendless.User);

            model.save(usr, new Backendless.Async(succ => {

                utils.unspin(form);

                d.resolve((new_pswrd as any));

            }, (err: any) => {

                toastr.error(err.message, 'error');
                utils.unspin(form);
                d.reject(err);

            }));


        }, (err: any) => {

            toastr.error(err.message, 'error');

            utils.unspin(form);
            d.reject(err);

        }));

        return d.promise;
    }

}



interface TextControlProps extends jx.Views.ReactProps {
    label: string,    
    field?: string,
    property?: string,
    type?: string,
    required?: boolean,
    placeholder?: boolean
}
class TextControl extends jx.Views.ReactView {

    props: TextControlProps;

    render() {

        var property = this.props.property ? this.props.property : 'textInput';

        var type = this.props.type ? this.props.type : 'text';

        var _props: any = {
        }

        if (this.props.required) {
            _props.required = true;
        }

        var html =
            <div className="form-group">
                <label htmlFor="" className="col-md-2 col-sm-3 control-label">{this.props.label}</label>
                <div className="col-md-10 col-sm-9">
                    <input type={type} {..._props}
                        name={this.props.field} data-bind={"{0}:{1}".format(property, this.props.field) }
                        className="form-control" id={this.props.field} style={{ fontSize: 18 }} placeholder=""/>
                </div>
            </div>


        return html;

    }
    
}
