// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');



export class SignupView extends jx.Views.ReactView {


    render() {

        return null;

    }


    componentDidMount() {

        $('#page-content').append($('<div class="signup-view" ></div>'));

        ReactDOM.render(<InternalView owner={this} />, $('#page-content .signup-view')[0]);
        
    }


    componentDidUpdate() {

        ReactDOM.unmountComponentAtNode($('#page-content')[0]);

        $('#page-content').empty();

        ReactDOM.render(<InternalView owner={this} />, $('#page-content')[0]);

    }
    
}




class InternalView extends jx.Views.ReactView {


    render() {

        var html =
            <div>

                <section className="lightSection clearfix pageHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6">
                                <div className="page-title">
                                    <h2 style={{ textTransform:'none' }} >Inscrivez-vous</h2>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <ol className="breadcrumb pull-right">
                                    <li>
                                        <a href="/" style={{ textTransform: 'none' }}>accueil</a>
                                    </li>
                                    <li className="active" style={{ textTransform: 'none' }}>inscription</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mainContent clearfix signUp">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
                                <div className="panel panel-default">
                                    <div className="panel-heading"><h3 style={{ textTransform: 'none' }}>Inscrivez-vous</h3></div>
                                    <div className="panel-body">
                                        <form role="form">
                                            <div className="form-group">
                                                <label htmlFor="">First Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Last Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Enter Email</label>
                                                <input type="email" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Password</label>
                                                <input type="password" className="form-control" />
                                            </div>
                                            <button className="btn btn-primary btn-block" type="button">Submit</button>
                                            <button className="btn btn-link btn-block" type="button"><span style={{ textTransform:'none' }}>Vous avez deja un compte?</span> Log in</button>
                                        </form>
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