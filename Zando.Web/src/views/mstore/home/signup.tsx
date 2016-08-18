// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/basepage');



export class SignUpPage extends base.BasePage {

    private __usr: jx.Types.User
    private get usr(): jx.Types.User {

        if (!this.__usr) {
            this.__usr = ko['mapping'].fromJS({

                email: '',
                is_verified: 1,
                name: '',
                password: '',
                surname:''

            } as jx.Types.User);
        }
        
        return this.__usr;
    }


    get_pagecontent() {

        var html =
            <div className="row">
                <div className="col-sm-8 login-register-form">
                    <div className="title"><span>Create An Account</span></div>
                    <div className="row">
                        <form className="form-signup">
                            <div className="form-group col-sm-6">
                                <label htmlFor="nameInput">Name</label>
                                <input type="text" data-bind="textInput:name" className="form-control" name="name" required id="nameInput" placeholder="Name" />
                            </div>

                            <div className="form-group col-sm-6">
                                <label htmlFor="nameInput">Surname</label>
                                <input type="text" data-bind="textInput:surname" className="form-control" name="surname" id="surnameInput" placeholder="Surname" />
                            </div>

                            <div className="col-sm-12" style={{ padding: 0 }}>

                                <div className="form-group col-sm-6">
                                    <label htmlFor="emailInput">Email address</label>
                                    <input type="email" className="form-control"name="email" data-bind="textInput:email" required id="emailInput" placeholder="Email" />
                                </div>

                            </div>
                            
                            
                            <div className="form-group col-sm-6">
                                <label htmlFor="passwordInput">Password</label>
                                <input type="password" className="form-control" name="psswrd" data-bind="textInput:password" required id="passwordInput" placeholder="Password" />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="passwordConfirmInput">Confirm Password</label>
                                <input type="password" className="form-control" name="confirm" required id="passwordConfirmInput" placeholder="Password" />
                            </div>
                            <div className="form-group col-sm-6">
                                <label htmlFor="addressInput">Address</label>
                                <textarea className="form-control" rows={3} id="addressInput" defaultValue={""} />
                            </div>
                            <div className="col-xs-12">
                                <div className="checkbox">
                                    <input type="checkbox" id="agreeCheckbox" />
                                    <label htmlFor="agreeCheckbox">
                                        I agree with <a href="#"><u>Terms and Conditions.</u></a>
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <button type="button" className="btn btn-sm" onClick={this.signup.bind(this)}><i className="fa fa-long-arrow-right" /> Register</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="title"><span>Already Registered?</span></div>
                    <form className="form-login">
                        <div className="form-group">
                            <label htmlFor="emailInputLogin" required>Email address</label>
                            <input type="email" className="form-control" data-bind="textInput:email" id="emailInputLogin" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInputLogin" required >Password</label>
                            <input type="password" className="form-control" data-bind="textInput:password" id="passwordInputLogin" placeholder="Password" />
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">
                                Remember Me
                            </label>
                        </div>
                        <button type="button" onClick={this.login.bind(this)} className="btn btn-sm"><i className="fa fa-long-arrow-right" /> Login</button>
                    </form>
                </div>
            </div>



        return html;
    }



    componentDidMount() {

        super.componentDidMount();

        $.getScript('/mstore/js/mimity.js', () => {
            this.init_view();
        });
    }


    init_view() {

        ko.applyBindings(this.usr, this.root.find('.form-signup')[0]);
        
        this.root.find('.form-signup').validate({
            rules: {
                confirm: {
                    equalTo: '#passwordInput'
                }
            }
        });
    }


    signup() {

        if (!this.root.find('.form-signup').valid()) {
            return;
        }

        var usr = ko['mapping'].toJS(this.usr);

        utils.spin(this.root);

        this.app.signup(usr as any).then(obj => {

            toastr.info('Votre compte a ete cree avec success');

            this.app.router.navigate('/products')

        }).fail(err => {

            toastr.error(err.message);

        }).finally(() => {

            utils.unspin(this.root);

        });
    }


    login() {

        if (!this.root.find('.form-login').valid()) {
            return;
        }

        utils.spin(this.root);

        this.app.login(this.root.find('#emailInputLogin').val(), this.root.find('#passwordInputLogin').val()).then(obj => {

            toastr.info('Bienvenu sur AfriknetMarket');

            this.app.router.navigate('/products')

        }).fail(err => {

            toastr.error(err.message);

        }).finally(() => {

            utils.unspin(this.root);

        });
    }
}


