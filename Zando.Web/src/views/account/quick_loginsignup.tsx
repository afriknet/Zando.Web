// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';




export enum ViewMode { signup, login }

export interface QuickLoginSignUpViewProps extends jx.Views.ReactProps {
    mode: ViewMode,
    fullview?: boolean,
    container?: Modal
}
interface QuickLoginSignUpViewState extends jx.Views.ReactState {
    mode: ViewMode
}
export class QuickLoginSignUpView extends jx.Views.ReactView {


    constructor(props: QuickLoginSignUpViewProps) {
        super(props);
        this.props.owner['quick_signuplogin_view'] = this;
        this.state.mode = props.mode ? props.mode : ViewMode.signup;
        this.cancel_authentication = true;
    }


    props: QuickLoginSignUpViewProps;
    state: QuickLoginSignUpViewState;
    cancel_authentication: boolean;


    render() {

        switch (this.state.mode) {

            case ViewMode.login:
                return this.login_view();
            default:
                return this.signup_view();
        }        
    }
    


    afterClosed(): Q.Promise<any> {

        if (this.cancel_authentication) {

            var info = this.app.get_appInfo();

            this.app.router.navigate(info.fallback_url);
            
        } else {

            return Q.resolve(true);
        }

        return Q.resolve(true);

    }


    update_guest_signup() {

        var __email = this.app.get_user()['email'];
        var pswrd = this.app.get_guest_pssw();

        var d = Q.defer();

        utils.spin(this.root);

        Backendless.UserService.login(__email, pswrd, false, new Backendless.Async((usr: any) => {

            usr['email'] = usr['name'] = this.jget('#signup-email').val();
            usr['password'] = this.jget('#signup-pws').val();
            usr['is_verified'] = 1;

            var model = Backendless.Data.of(Backendless.User);

            model.save(usr, new Backendless.Async(succ => {

                this.update_schema_account(__email, usr['email']).then(() => {

                    this.app.login(usr['email'], usr['password']).then(() => {

                        this.cancel_authentication = false;

                        d.resolve(true);

                    }).finally(() => {

                        utils.unspin(this.root);

                    });

                }).fail(err => {

                    toastr.error(err.message, 'error');
                    utils.unspin(this.root);

                    d.reject(err);
                });
                
                
            }, (err: any) => {

                toastr.error(err.message, 'error');
                utils.unspin(this.root);

                d.reject(err);
            }));


        }, (err: any) => {

            toastr.error(err.message, 'error');

            utils.unspin(this.root);

            d.reject(err);
            
        }));


        return d.promise;
    }


    update_schema_account(old_email: string, new_email: string) {

        var d = Q.defer();

        schema.call({
            fn: 'get',
            params: ['/accounts', { email: old_email }]
        }).then(res => {

            var acc = res.response.results[0];

            acc['email'] = acc['name'] = new_email;

            schema.call({
                fn: 'put',
                params: ['/accounts/{0}'.format(acc['id']), { email: new_email }]
            }).then(rs => {

                d.resolve(true);

            }).fail(err => {

                d.reject(err);
            });

        });


        return d.promise;

    }


    signup_view() {

        var that = this;

        function add_fullview_controls(){

            if(!that.props.fullview){
                return null;
            }
            
                    
            var views = [
                    <div className="form-group quick">
                        <label htmlFor="">Prenom</label>
                        <input type="text" name="first-name" required className="form-control" />
                    </div>,
                    <div className="form-group quick">
                        <label htmlFor="">Nom</label>
                        <input type="text" name="last-name" required className="form-control" />
                    </div>
                ]

            return views;
        }


        var html =
            <div>
                <form role="form" className="form-signup">
                    {add_fullview_controls()}
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" id="signup-email" name="email" required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mot de passe</label>
                        <input type="password" id="signup-pws" required name="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="" className="">Confirmer votre mot de passe</label>
                        <input type="password" id="signup-confirm" required name="confirm" className="form-control" />
                    </div>
                    <button className="btn btn-primary btn-block btn-signup" onClick={this.do_signup.bind(this)} type="button">Inscrivez-vous</button>
                    <button type="button" className="btn btn-link btn-block" onClick={this.display_login.bind(this)}>vous possedez deja un compte?</button>
                </form>
            </div>
        return html;
    }


    do_signup() {

        if (!this.root.find('form').valid()) {
            return Q.reject(false);
        }


        if (!this.app.user_is_verified()) {

            return this.update_guest_signup().then(() => {

                if (this.props.container) {
                    this.props.container.close();
                }

                return true;

            });
        } else {

            utils.spin(this.root);

            this.app.signup({
                email: this.root.find('[name="email"]').val(),
                is_verified: 1,
                name: this.root.find('[name="first-name"]').val(),
                surname: this.root.find('[name="last-name"]').val(),
                password: this.root.find('[name="password"]').val()
            }).then((data) => {

                toastr.success('Votre compte a ete cree avec success');

                this.app.router.navigate('/account/profile')

            }).fail((err: any) => {

                toastr.error(err.message);

            }).finally(() => {

                utils.unspin(this.root);

            });

        }
        
    }
    

    login_view() {

        var html =
            <div>
                <form role="form" className="form-login">
                    <div className="form-group">
                        <label htmlFor="">Email</label>
                        <input type="email" id="" name="email" required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Mot de passe</label>
                        <input type="password" id="login-pws" required name="password" className="form-control" />
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" /> Restez connecte
                        </label>
                    </div>
                    <button className="btn btn-primary btn-block btn-login" onClick={this.do_login.bind(this) } type="button">Identifiez-vous</button>
                    <button className="btn btn-link btn-block" type="button" style={{ textTransform: 'none' }}>Mot de passe oublie?</button>
                </form>
            </div>

        return html;
    }


    do_login() {

        if (!this.root.find('form').valid()) {
            return;
        }        
    }


    init_validation() {

        switch (this.state.mode) {

            case ViewMode.login: {

                this.root.find('.form-login').validate({
                    rules: {                        
                        confirm: {
                            equalTo: '#login-pws'
                        }
                    }

                });

            } break;

            case ViewMode.signup: {

                this.root.find('.form-signup').validate({
                    rules: {                        
                        confirm: {
                            equalTo: '#signup-pws'
                        }
                    }

                });


            } break;                
        }
        
        
    }


    componentDidMount() {

        super.componentDidMount();
        
        this.root.closest('.modal').attr('id', 'signup');

        this.init_validation();
    }


    componentDidUpdate() {

        if (this.state.mode === ViewMode.login) {
            this.root.closest('.modal').find('.modal-title').html('Identifiez-vous');
        }

        this.init_validation();
    }


    display_login() {

        this.setState(_.extend(this.state, {
            mode: ViewMode.login
        }));
    }
}