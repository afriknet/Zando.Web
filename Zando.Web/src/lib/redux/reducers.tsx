/// <reference path="../../../typings/redux/redux.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import rx = require('redux');

export interface ReduxAction extends rx.Action {    
    flowid?: any,
    payload?: any
}

export interface ReduxState {
    flowstate?: any,
    flowid?: any,
    //payload?: any
}


export function Reduce(state: ReduxState, action: ReduxAction): ReduxState {
    
    if (action) {

        if (action.flowid) {

            var flow_id = 'flowid-{0}'.format(action.flowid);

            switch (action.type) {

                case 'ATTACH': {

                    if (!state[flow_id]) {

                        var new_state = _.extend({}, state, {
                            [flow_id]: {
                                flowstate: -1,
                                flowid: action.flowid
                            }
                        });

                        return new_state;
                    }
                }

                default:

                    return _.extend({}, state, {

                        current_flowid: flow_id,

                        [flow_id]: _.extend({}, {
                            flowstate: action.type,
                            flowid: action.flowid
                        }, action.payload)

                        //[flow_id]: {
                        //    flowstate: action.type,
                        //    flowid: action.flowid,
                        //    payload: action.payload
                        //} as ReduxState

                    });
            }

        }
    }

    return state;
}
