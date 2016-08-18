// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/basepage');



export class LoginPage extends base.BasePage {

    get_pagecontent() {

        var html =
            <div className="row">
                <div className="col-sm-6 col-xs-12 login-register-form">
                    <div className="title"><span>Please Enter Your Information</span></div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="emailInputLogin">Email address</label>
                            <input type="email" className="form-control" id="emailInputLogin" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInputLogin">Password</label>
                            <input type="password" className="form-control" id="passwordInputLogin" placeholder="Password" />
                        </div>
                        <div className="checkbox">
                            <input type="checkbox" id="rememberMe" />
                            <label htmlFor="rememberMe">
                                Remember Me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-sm pull-left"><i className="fa fa-long-arrow-right" /> Login</button>
                        <button type="submit" className="btn btn-sm pull-right">Forgot your password?</button>
                    </form>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="title"><span>Or Login Using</span></div>
                    <button type="button" className="btn btn-primary btn-md" style={{ marginRight:10 }}><i className="fa fa-facebook" /> Facebook</button>
                    <button type="button" className="btn btn-info btn-md" style={{ marginRight: 10 }}><i className="fa fa-twitter" /> Twitter</button>
                    <button type="button" className="btn btn-danger btn-md" style={{ marginRight: 10 }}><i className="fa fa-google-plus" /> Google Plus</button>
                </div>
            </div>


        return html;
    }



    componentDidMount() {

        super.componentDidMount();

        $.getScript('/mstore/js/mimity.js', () => {

        });

    }
}


