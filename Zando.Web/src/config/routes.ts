
/// <reference path="../lib/jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import {Types} from '../lib/jx';


export var routes: Types.RouteList = {
    '/': {
        url: 'home/home',
        descr:'home'
    },
    
    '/login': {
        url: 'home/login'
    },


    '/dashboard': {
        url: 'account/account_dashboard'
    },

    '/dashboard/:sub': {
        url: 'account/account_dashboard'
    },

    '/account': {
        url: 'account/account_dashboard'
    },

    '/account/:sub': {
        url: 'account/account_dashboard'
    },
    
    '/explore': {
        url: 'products/products_explore'
    },

     '/explore/:page': {
        url: 'products/products_explore'
    },

    
}
