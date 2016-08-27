
/// <reference path="../lib/jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import {Types} from '../lib/jx';


export var routes: Types.RouteList = {
    '/': {
        url: 'mstore/home/home',
        descr: 'home'        
    },

    '/products': {
        url: 'mstore/products/productgrid',
    },

    '/products/pages/:page': {
        url: 'mstore/products/productgrid',
    },

    '/cart': {
        url: 'mstore/cart/cart_itemlist',
    },


    '/profile': {
        url: 'mstore/account/profile_view',
    },


    '/checkout': {
        url: 'mstore/cart/cart_checkout'
    },

    '/login': {
        url: 'mstore/home/login'
    },

    '/signup': {
        url: 'mstore/home/signup'
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

    '/checkout/completed': {
        url: 'account/account_checkout_completed'
    },
    
    '/explore': {
        url: 'products/products_explore'
    },

     '/explore/:page': {
        url: 'products/products_explore'
    },

     '/amazon': {
         url: 'products/amazon_explore'
     },

     '/productitem/:id': {
         url: 'products/product_single'
     }

    
}
