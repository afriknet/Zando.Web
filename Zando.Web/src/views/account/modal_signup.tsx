// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';




export interface LightSignUpViewProps extends jx.Views.ReactProps {
}
export class LightSignUpView extends jx.Views.ReactView {

    props: LightSignUpViewProps;


    render() {

        var html =
            <form role="form" >
                <div className="form-group">
                    <label htmlFor="">Enter Email</label>
                    <input type="email" id="" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password</label>
                    <input type="password" id="" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" id="" className="form-control" />
                </div>
                <button className="btn btn-primary btn-block" type="submit">Sign up</button>
            </form>

        return html;

    }


    componentDidMount() {

        super.componentDidMount();

        this.root.closest('.modal').attr('id', 'signup');
    }
}