// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');


export class LoginPage extends jx.Views.HomePage {

    render() {
        return null;
    }


    componentDidMount() {

        $('#page-content').load('/html/login.html', () => {
            this.init_actions();       
        });

    }

    init_actions() {

        var that = this;

        this.root.find('.btn-login').click(() => {

            if (that.root.find('form').valid()) {

                utils.spin(that.root);

                var _email = this.root.find('[type="email"]').val();
                var _pass = this.root.find('[type="password"]').val();

                this.app.login(_email, _pass, false).then((usr) => {

                    toastr.success('Logged in successfully');

                    this.app.router.navigate('/');

                }).fail(err => {

                    toastr.error(err.message);

                }).finally(() => {
                    utils.unspin(that.root);
                });
            }
        });
    
    }

}