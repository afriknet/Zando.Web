/// <reference path="../jx.tsx" />
/// <reference path="reducers.tsx" />

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import jx = require('../jx');
import rx = require('redux');
import rdx = require('./reducers');


var __store = rx.createStore<rdx.ReduxAction>(rdx.Reduce as any, {} as any);


export interface FlowActionValue extends String {
}


export class FlowAction {
    static ACTION_IDLE: FlowActionValue = 'ACTION_IDLE';
    static ACTION_ATTACH: FlowActionValue = 'ACTION_ATTACH';
    static ACTION_START: FlowActionValue = 'ACTION_START';
}


var count: number;
count = 0;


export class Workflow {

    private __id: number;
    get id(): number {
        return this.__id;
    }
    

    get store(): rx.Store<rdx.ReduxAction> {
        return __store;
    }

    constructor() {        
        this.__id = ++count;
    }


    Exec(action: FlowActionValue, params?: any) {
        this.dispatch(action, params);
    }

    
    attach() {
        this.attach_workflow();
    }

    start() {
        this.dispatch(FlowAction.ACTION_START);        
    }    

    private attach_workflow() {
        this.dispatch(FlowAction.ACTION_ATTACH);        
    }


    get_actions() {
        return FlowAction;
    }


    get_flow_state(): rdx.ReduxState {

        var state = this.store.getState();

        if (!state) {
            return {} as any;
        }

        var flow_id = 'flowid-{0}'.format(this.id);
        
        if (!state[flow_id]) {
            return {
                flowstate: -1,
                flowid: this.id
            }
        }

        return state[flow_id];

    }


    dispatch(action: FlowActionValue, payload?:any) {

        var next_state: rdx.ReduxAction = {
            type: action,
            flowid: this.id,
            payload: payload
        }

        this.store.dispatch(next_state);

    }


}
