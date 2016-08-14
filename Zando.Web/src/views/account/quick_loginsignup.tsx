// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';




export enum ViewMode { signup, login }

export interface QuickLoginSignUpViewProps extends jx.Views.ReactProps {
    mode: ViewMode    
}
interface QuickLoginSignUpViewState extends jx.Views.ReactState {
    mode: ViewMode
}
export class QuickLoginSignUpView extends jx.Views.ReactView {


    constructor(props: QuickLoginSignUpViewProps) {
        super(props);
        this.props.owner['quick_signuplogin_view'] = this;
        this.state.mode = props.mode ? props.mode : ViewMode.signup;
    }


    props: QuickLoginSignUpViewProps;
    state: QuickLoginSignUpViewState;


    render() {

        switch (this.state.mode) {

            case ViewMode.login:
                return this.login_view();
            default:
                return this.signup_view();
        }        
    }


    onClosing(): Q.Promise<Boolean> {

        return Q.reject<Boolean>(false);

    }


    signup_view() {

        var html =
            <form role="form" >
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" id="" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Mot de passe</label>
                    <input type="password" id="" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="" className="">Confirmer votre mot de passe</label>
                    <input type="password" id="" className="form-control" />
                </div>
                <button className="btn btn-primary btn-block" type="button">Inscrivez-vous</button>
                <button type="button" className="btn btn-link btn-block" onClick={this.display_login.bind(this)}>Identifiez-vous</button>
            </form>

        return html;
    }


    login_view() {

        var html =
            <form role="form" >
                <div className="form-group">
                    <label htmlFor="">Email</label>
                    <input type="email" id="" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Mot de passe</label>
                    <input type="password" id="" className="form-control" />
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" /> Restez connecte
                    </label>
                </div>
                <button className="btn btn-primary btn-block" type="button">Identifiez-vous</button>
                <button className="btn btn-link btn-block" type="button" style={{ textTransform: 'none' }}>Mot de passe oublie?</button>
            </form>

        return html;
    }


    componentDidMount() {

        super.componentDidMount();

        this.root.closest('.modal').attr('id', 'signup');
    }


    componentDidUpdate() {

        if (this.state.mode === ViewMode.login) {
            this.root.closest('.modal').find('.modal-title').html('Identifiez-vous');
        }

    }


    display_login() {

        this.setState(_.extend(this.state, {
            mode: ViewMode.login
        }));
    }
}