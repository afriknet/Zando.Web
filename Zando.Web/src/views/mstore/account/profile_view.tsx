/// <reference path="account_profile.tsx" />
/// <reference path="../cart/cart_itemlist.tsx" />
/// <reference path="../../../lib/controls.tsx" />
/// <reference path="../../account/account_profile.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import prof = require('./account_profile');
import cartlist = require('../cart/cart_itemlist');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../../lib/controls';
import old_prof = require('../../account/account_profile');


export class UsrProfilePage extends base.BasePage {

    get_pagecontent() {

        return <UserProfileView />
    }


    componentDidMount() {

        super.componentDidMount();


        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart(false);

            $('.navigation > li').removeClass('active');

            $('.li-profile').removeClass('hidden')

            $('.li-profile').addClass('active');
        });
    }

}


class UserProfileView extends jx.Views.ReactView {

    render() {
        
        var html =
            <div>

                <div className="col-md-9">

                    <div className="title" style={{ marginBottom:20 }}>
                        <a href="javascript:void(0)"><i className="fa fa-info" style={{ marginRight:10 }}></i> <span>Information personnelle</span></a>
                    </div>

                    <prof.AccountProfile ref='prof' display_actions={true} is_checking_out={false} />

                    <div className="title" style={{ marginTop: 50 }}>
                        <a href="javascript:void(0)"><i className="fa fa-cog" style={{ marginRight: 10 } }></i> <span>Reglages</span></a>
                    </div>

                    <div className="col-lg-12" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <button className={"btn btn-sm" } onClick={this.change_password.bind(this)}><i className="fa fa-lock"></i> <span>Changer votre mot de passe</span></button>
                    </div>  
                </div>

                <Modal ref='modal' owner={this} onClosing={(saving) => { return this.save_password_change(saving) } } />

                <cartlist.NewArrivals col="col-md-3" />

            </div>
        
        return html;
    }


    change_password() {
        (this.refs['modal'] as Modal).show(<old_prof.ChangePassword owner={this} />);
    }

    save_password_change(saving: boolean) {

        if (!saving) {
            return Q.resolve(true);
        }
        
        return this['change_psw'].save().then(ok => {

            return Q.resolve(true);

        });
    }
    
}