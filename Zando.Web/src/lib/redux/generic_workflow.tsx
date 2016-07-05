/// <reference path="workflow.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import wk = require('./workflow');



export class GenericActions extends wk.FlowAction {
    static ACTION_FETCH: wk.FlowActionValue = 'ACTION_FETCH';
    static ACTION_FETCHING: wk.FlowActionValue = 'ACTION_FETCHING';
    static ACTION_FETCH_DONE: wk.FlowActionValue = 'ACTION_FETCH_DONE';
    static ACTION_FETCH_FAIL: wk.FlowActionValue = 'ACTION_FETCH_FAIL';
}

//export class GenericStates extends wk.FlowState {
//    static STATE_FETCHING: wk.FlowStateValue = 'STATE_FETCHING';
//    static STATE_FETCH_DONE: wk.FlowStateValue = 'STATE_FETCH_DONE';
//    static STATE_FETCH_FAIL: wk.FlowStateValue = 'STATE_FETCH_FAIL';
//}

export class GenericWorkflow extends wk.Workflow {

    Exec(action: wk.FlowActionValue, params?: any) {

        switch (action) {

            case GenericActions.ACTION_FETCH: {

                this.fetch(params);

            } break;

            default:
                super.Exec(action, params);
        }
        
    }


    private fetch(params: schema.callParams) {

        this.dispatch(GenericActions.ACTION_FETCHING);
        
        this.internal_fetch(params).then((data) => {

            this.dispatch(GenericActions.ACTION_FETCH_DONE, {
                data:data
            });

        }).fail((err) => {

            this.dispatch(GenericActions.ACTION_FETCH_FAIL, err);
        });
    }

    

    private internal_fetch(params: schema.callParams) {

        var d = Q.defer();

        schema.call({
            fn: params.fn,
            params: params.params
        }).then((res) => {

            d.resolve(res.response.results);

        }).fail((err) => {
            d.reject(err);
        });

        return d.promise;
    }


    get_actions() {
        return GenericActions;
    }

    //get_states() {
    //    return GenericStates;
    //}
}