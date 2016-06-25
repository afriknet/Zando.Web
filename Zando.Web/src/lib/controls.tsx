﻿/// <reference path="jx.tsx" />
/// <reference path="../../typings/react/react-bootstrap.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('./jx');
import rb = require('react-bootstrap');

var b:any = rb;


export interface FiconProps extends jx.Views.ReactProps {
    icon: string
}
export class Ficon extends jx.Views.ReactView {

    props: FiconProps;

    constructor(props: FiconProps) {
        super(props);
    }

    render() {
        return <i className={"fa fa-{0}".format(this.props.icon) }></i>
    }
}



export interface BigLabelProps extends React.HTMLProps<any> {
    label?: any,
    lang?: string,
    require?: boolean,
    inline?: boolean
}
export class BigLabel extends jx.Views.ReactView {

    props: BigLabelProps;


    constructor(props: BigLabelProps) {
        super(props);
    }


    render() {

        var __style: any = {
            background:'transparent'  
        };
        
        var __p_style: any = {
            fontSize: 32,
            fontWeight: 100
        }

        if (this.props.inline) {
            __style.display = 'inline-block';
            __p_style.display = 'inline-block';
        }

        var html = <div className="breadcrumb-wrapper" style={__style}>
                        <p className="label-value" style={__p_style}>{this.format_label()}{this.is_required() }</p>
                    </div>;

        return html;
    }


    format_label(): any {

        if (this.props.lang) {
            return <span data-localize={this.props.lang}>this.props.label</span>
        } else {
            return this.props.label;
        }
    }


    is_required() {

        if (this.props.require) {
            return <span className="required">*</span>
        }
    }


    componentDidMount() {

        super.componentDidMount();

        if (this.props.require) {
            this.root.addClass('require');
        }
    }

}




export interface FromProps extends React.HTMLProps<any> {
}
export class Form extends jx.Views.ReactView{

    props: FromProps;

    constructor(props: FromProps) {
        super(props);
    }


    render() {
        return <form>
                {this.props.children}
               </form> 
    }

}



export interface FromGroupProps extends React.HTMLProps<any> {
}
export class FormGroup extends jx.Views.ReactView {

    props: FromGroupProps;
    
    constructor(props: FromGroupProps) {
        super(props);
    }


    render() {

        var default_props: FromGroupProps = {
            className:'form-group'
        }

        var props = _.extend(default_props, this.props);

        return <div {...props}>
                    {this.props.children}
               </div> 
    }
}


export interface EditTextProps extends React.HTMLProps<any> {    
}
export class EditText extends jx.Views.ReactView {

    props: EditTextProps;

    constructor(props: EditTextProps) {
        super(props);
    }


    render() {

        var default_props: FromGroupProps = {
            className: 'form-control'
        }


        var props = _.extend(default_props, this.props);


        var html = <div {...props}>
                        {this.props.children}
                   </div> 
        
        return html;

    }
}



export interface TableLayoutProps extends React.HTMLProps<any> {
}
export class TableLayout extends React.Component<TableLayoutProps, {}> {

    props: TableLayoutProps;

    constructor(props: TableLayoutProps) {
        super(props);
    }

    render() {

        var props = _.extend({
            style: { display: 'table'}
        }, this.props);

        var html = <div {...props} >
                      <div style={{ display: 'table-row' }}>
                            { React.Children.map(this.props.children, child => {
                                return <div style={{ display: 'table-cell'}}>
                                            {child}
                                       </div>
                            })}
                      </div>    
                   </div> 

        return html;
    }


    get_arra

}



export interface TreeViewNodeInfo {
    id: any,
    title: string,
    children?: TreeViewNodeInfo[]
}
export interface TreeViewProps extends jx.Views.ReactProps {
    
    data: any[],
    key_field: string,
    display_field: string,
    parent_field: string
}
export class TreeView extends jx.Views.ReactView {

    props: TreeViewProps;

    constructor(props: TreeViewProps) {
        super(props);
    }


    count: number;


    render() {
        
        var html = <div id="nestable2" className="treeview-root" >
                        <div className="dd root">
                            <ol className="dd-list">
                                { this.build_treeview()}
                            </ol>
                       </div> 
                   </div> 
        
        return html;
    }


    componentDidMount() {

        super.componentDidMount();

        (this.root.find('.root') as any).nestable();

    }


    build_treeview():any {
        
        return _.map(this.props.data, d => {
            return this.build_treenode(d);
        });
    }


    build_treenode(node: any) {

        var li = <li className="dd-item" data-id={ _.result(node, this.props.key_field) } >
                     <div className="dd-handle">{ _.result(node, this.props.display_field) }</div>
                     { this.build_children_nodes(node) }
                </li>
        return li;
    }


    build_children_nodes(parent_node: any) {

        var parent_id = _.result(parent_node, this.props.key_field);

        var children = _.filter(this.props.data, d => {
            return _.result(d, this.props.parent_field) === parent_id;
        });

        if (children.length === 0) {
            return null;
        }

        var ol = <ol className="dd-list" >
                        {_.map(children, child => {
                            return this.build_treenode(child);
                        })}
                </ol>
        
        return ol;
    }
}


export interface TextNumericProps extends React.HTMLProps<any> {
    ctx?: any,
    property?: any,
    aSign?: string
}
interface TextNumericState extends jx.Views.ReactState {
    value:any
}
export class TextNumeric extends jx.Views.ReactView {

    props: TextNumericProps;
    state: TextNumericState;


    constructor(props: TextNumericProps) {
        super(props);

        if (this.props.ctx && this.props.property) {
            this.state.value = _.result(this.props.ctx, this.props.property);
        }
    }

    render() {

        return <b.FormControl {...this.props}  value={this.state.value}  />
    }

    componentDidMount() {

        super.componentDidMount();

        (this.root as any).autoNumeric('init', this.props);

        this.root.on('change', e => {

            var __value = ($(e.currentTarget) as any).autoNumeric('get');
            

            if (this.props.ctx && this.props.property) {
                this.props.ctx[this.props.property](__value);                
            }

            //this.setState(_.extend(this.state, {
            //    value: __value
            //}));

        });
        
    }
}




export interface CheckBoxProps extends jx.Views.ReactProps {
    is_checked: boolean,
    onchecked?: (id) => void,
    onunchecked?:(id) => void 
}
export class CheckBox extends jx.Views.ReactView {

    props: CheckBoxProps;

    constructor(props: CheckBoxProps) {
        super(props);
    }

    render() {

        var html = <div className="checkbox-x custom" >
                        <label>
                            <input type="checkbox" /><span className="chk-caption" ></span>
                        </label>
                   </div> 
        
        return html;

    }


    componentDidMount() {

        super.componentDidMount();

        (this.root.find('input') as any).iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio'
        });

        if (this.props.is_checked) {
            (this.root.find('input') as any).iCheck('check');
        }

        this.root.find('input').on('ifChecked', e => {

            if (this.props.onchecked) {

                var img_id = $(e.currentTarget).closest('[data-img-id]').attr('data-img-id');

                this.props.onchecked(img_id);
            }
        });


        this.root.find('input').on('ifUnchecked', e => {

            if (this.props.onunchecked)
            {
                var img_id = $(e.currentTarget).closest('[data-img-id]').attr('data-img-id');

                this.props.onunchecked(img_id);
            }
        });


    }

}
