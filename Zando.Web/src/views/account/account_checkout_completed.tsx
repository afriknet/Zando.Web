// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');



export class AccountCheckoutCompleted extends jx.Views.ReactView {

    render() {

        return <InternalView owner={this} />
    }
    
}



class InternalView extends jx.Views.ReactView {


    render() {

        var no_transform = { textTransform: 'none' }

        var bill = jx.local.get('last-cart')['billing'];

        var html =
            <div>
                {/* LIGHT SECTION */}
                <section className="lightSection clearfix pageHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="page-title">
                                    <h2 style={no_transform}>Transaction achevee</h2>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <ol className="breadcrumb pull-right">
                                    <li>
                                        <a href="/" style={no_transform}>Home</a>
                                    </li>
                                    <li className="active" style={no_transform}>transaction achevee</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                {/* MAIN CONTENT SECTION */}
                <section className="mainContent clearfix setp5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="thanksContent">

                                    <h2 style={no_transform}>Votre transaction a ete effectuee avec succes <small>Vous recevrez un email contenant les details de votre transaction</small></h2>

                                    <h3>Livraison</h3>

                                    <div className="thanksInner">
                                        <div className="row">
                                            <div className="col-sm-6 col-xs-12 tableBlcok">
                                                <address>
                                                    <span>address de livraison: </span> <a href="#">{bill['address1']}</a> <br />
                                                    <span>email: </span> <a href={"{0}".format(this.app.get_account()['email']) }>{this.app.get_account()['email']}</a> <br />
                                                    <span>telephone: </span> {this.app.get_user()['phone']}
                                                </address>
                                            </div>
                                            <div className="col-sm-6 col-xs-12">
                                                <div className="well">
                                                    <h2><small>No order</small>{jx.local.get('last-order')['number']}</h2>
                                                </div>
                                            </div>

                                            <div className="col-xs-12">
                                                <div className="well">
                                                    <h2><small>No order</small>{jx.local.get('last-order')['number']}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        

        return html;

    }

}