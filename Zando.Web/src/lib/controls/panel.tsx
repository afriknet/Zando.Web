// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');

import jx = require('../jx');

import {Types} from '../jx';

export interface PanelProps extends jx.Views.ReactProps {
    title?: string,
    style?: jx.Types.Bootstrap.Style
}
interface PanelState extends jx.Views.ReactState {
    style: jx.Types.Bootstrap.Style
}
export class Panel extends jx.Views.ReactView {

    props: PanelProps;
    state: PanelState;


    constructor(props: PanelProps) {
        super(props);

        this.state.style = props.style;

        if (!this.state.style) {
            this.state.style = jx.Types.Bootstrap.Style.default;
        }
        
    }


    private resolve_style(){

        switch (this.state.style) {
            case Types.Bootstrap.Style.primary:
                return 'panel-primary';
            case Types.Bootstrap.Style.success:
                return 'panel-success';
            case Types.Bootstrap.Style.info:
                return 'panel-info';
            case Types.Bootstrap.Style.warning:
                return 'panel-warning';
            case Types.Bootstrap.Style.danger:
                return 'panel-danger';
            default:
                return 'panel-default';
        }
    }


    render() {

        var html = <div className={'panel {0}'.format(Types.Bootstrap.toString(this.props.style)) }>
                        <div className="panel-heading">
                            {this.props.title}
                        </div>
                        <div className="panel-body">
                            {this.props.children}
                        </div>
                   </div> 


        return html;

    }
}