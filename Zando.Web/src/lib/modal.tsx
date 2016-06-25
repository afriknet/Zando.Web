/// <reference path="jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import reactboot = require('react-bootstrap');
var b: any = reactboot

import { Views } from './jx';



interface ModalState extends Views.ReactState {
    show: boolean,
    content:any
}
export interface ModalProps extends Views.ReactProps {
    showModal?: boolean,
    bsSize?: string,
    action?: string,
    onFinish?: () => Q.Promise<Boolean>
}

export interface IModalDialog {
    onSave: () => Q.Promise<Boolean>    
}
export class Modal extends Views.ReactView {

    props: ModalProps;
    state: ModalState;

    constructor(props: ModalProps) {

        super(props);

        this.state.show = false;

        if (this.props.showModal != undefined) {
            this.state.show = this.props.showModal;
        }
    }


    get asDialog(): IModalDialog {
        return (this as any) as IModalDialog;
    }


    show(content?:any) {

        this.setState({ show: true, content: content });
    }


    close() {

        this.setState({ show: false });
    }
    

    render() {

        var that = this;

        var props:any = {
            show: this.state.show,
            onHide: () => {
                that.close()
            }
        }

        if (this.props.bsSize) {
            props.bsSize = this.props.bsSize;
        }

        var action = this.props.action ? this.props.action : 'Save changes';
        
        var html = <b.Modal {...props}>

                        <b.Modal.Header closeButton>

                            <b.Modal.Title>
                            </b.Modal.Title>

                        </b.Modal.Header >

                        <b.Modal.Body>

                            {this.state.content}

                        </b.Modal.Body>

                        <b.Modal.Footer>                                
                            <b.Button onClick={() => { that.save() } } className='btn-save' bsStyle="primary">{action}</b.Button>
                        </b.Modal.Footer>

                   </b.Modal> 
        
        return html;

    }
    


    save() {

        if (this.asDialog.onSave) {

            this.asDialog.onSave().then(ok => {
                this.close();
            });
        }
        
    }

    
}
