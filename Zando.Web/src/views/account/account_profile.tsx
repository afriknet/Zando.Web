/// <reference path="../../lib/controls.tsx" />

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import ReactB = require('react-bootstrap');
var b: any = ReactB;

import { BigLabel, BigLabelProps} from '../../lib/controls';


interface AccountProfilePageState extends jx.Views.ReactState {
}
export interface AccountProfilePageProps extends jx.Views.ReactProps {
    select?: boolean,
}
export class AccountProfilePage extends jx.Views.ReactView {

    render() {

        var html =
            <div className="animated fadeInUp">

                <BigLabel label="My profile" />

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
                </div>
            </div>

        return html;
    }
}

/*
                
                
                <div className="row">

                    <div className="col-md-2 col-sm-3 col-xs-12">

                        <div className="thumbail">

                            <img src="/img/products/profile/profile-image.jpg" alt="profile-image"/>

                            <div className="caption">
                                    <a href="javascript:void(0)" className="btn btn-primary btn-block" role="button">Change Avatar</a>
                             </div>

                        </div>

                    </div>


                    <div className="col-md-10 col-sm-9 col-xs-12">

                        <form className="form-horizontal">

                            <TextControl label="First name" field="first_name" obj={null} />

                        </form>

                    </div>

                </div>
*/


interface TextControlProps extends jx.Views.ReactProps {
    label: string,
    obj: any,
    field: string,
    property?: string,
    type?: string,
    required?: boolean
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
                    <input type="text" {..._props}
                        name={this.props.field} data-bind={"{0}:{1}".format(property, this.props.field) }
                        className="form-control" id="" style={{ fontSize: 18 }} placeholder=""/>
                </div>
            </div>


        return html;

    }

}
