/// <reference path="../jx.tsx" />
/// <reference path="reducers.tsx" />

// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import jx = require('../jx');
import rx = require('redux');
import rdx = require('./reducers');


var __store = rx.createStore<rdx.ReduxAction>(rdx.Reduce as any, {} as any);


export interface ApplicationAction extends String {
}
export interface ApplicationState extends String {
}


export class FlowAction {
    static ACTION_IDLE: ApplicationAction = 'ACTION_IDLE';
    static ACTION_ATTACH: ApplicationAction = 'ACTION_ATTACH';
}
export class FlowState {
    static NONE: ApplicationState = 'None'
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


    Exec(action: FlowAction, params?: any) {
        
    }


    //fetch_data(): Q.Promise<any> {

    //    this.dispatch(FlowState.Fetching);

    //    return this.internal_fetch().then((data) => {

    //        this.dispatch(FlowState.Fetch_done, data);

    //        return true;

    //    }).fail((err) => {

    //        this.dispatch(FlowState.Fetch_failed, err);

    //        return false;
    //    });
    //}


    //private internal_fetch() {
    //    return Q.resolve(true);
    //}


    attach() {

        this.attach_workflow();
    }
        

    private attach_workflow() {

        var attach: rdx.ReduxAction = {
            type: FlowAction.ACTION_ATTACH,
            flowid: this.id
        }

        this.store.dispatch(attach)
    }



    private dispatch(next: rdx.ReduxAction, payload?: any) {

        var action: rdx.ReduxAction = {
            type: next.type,
            flowid: this.id,
            payload: payload
        }

        this.store.dispatch(action)

    }

}
