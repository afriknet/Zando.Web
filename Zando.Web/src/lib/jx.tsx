﻿/// <reference path="server.ts" />
/// <reference path="../../typings/backendless.d.ts" />
/// <reference path="redux/reducers.tsx" />
/// <reference path="redux/workflow.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="redux/workflow.ts" />
/// <reference path="redux/reducers.tsx" />
/// <reference path="controls.tsx" />
/// <reference path="../views/mstore/lib/app_page_middleheader.tsx" />



import React = require('react');
import ReactDOM = require('react-dom');

import { DataSource } from './server';

import rx = require('redux');
import flow = require('./redux/workflow');
import rdx = require('./redux/reducers');
import ctrls = require('./controls');
import mdl = require('../views/mstore/lib/app_page_middleheader');


enum API { default, moltin, schemaIo };

var __api = API.moltin;

interface viewAccessInfo {
    key: string,
    view: Views.ReactView
}

interface Accessors {
    ['name']: viewAccessInfo
}

var __accessors: Accessors = {} as any;



var __router_ctx: any;
var __app: application.App;
var __moltin: any;
var __tmp_pws: any;

declare var page;
declare var Moltin;
declare var Cookies;
declare var PubSub;

declare var chance;

export module Types {

    export interface AppSettings {
        rootpage: string,
        masterpage_template?: string,
        homepage_template?: string,
        viewpath_root?: string,
        srv_url?: string,

        BACKENDLESS_APPID?: string,
        BACKENDLESS_KEYID?: string,
        BACKENDLESS_VERID?: string,        
    }


    export interface AppInfo {
        last_url?: string,
        fallback_url?: string
    }


    export interface RouteInfo {
        url: string,
        descr?: string,
        store?: boolean
    }


    export interface RouteList {
        [name: string]: RouteInfo
    }


    export module Bootstrap {

        export enum Style { default, primary, success, info, warning, danger}

        export function toString(style: Style) {

            switch (style) {

                case Style.primary: return 'primary';
                case Style.success: return 'success';
                case Style.info: return 'info';
                case Style.warning: return 'warning';
                case Style.danger: return 'danger';
                    
                default:
                    return 'default';
            }

        }

    }


    export enum Usertype { admin, contact, guest }


    export interface User {

        email: string,
        password: string,
        name: string,
        surname: string,
        is_verified?: number

    }
}


export module constants {

    export module local {
        export const guest_usr: string = 'guest_usr'
        export const current_usr: string = 'current-user';
        export const current_acc: string = 'current-acc';
        export const app_info: string = 'app_info';        
    }
    export module headers {
        export const pageheader: string = 'pageheader'
        export const middleheader: string = 'middleheader'
    }

    export module subpub {

        export module products_grid {
            export const on_products_loaded: string = 'on_products_loaded'
            export const on_filter_applied: string = 'on_filter_applied'
            export const filter_price_range: string = 'price_range'
            export const filter_categories: string = 'filter_categories'
        }
        
    }


    export module app_menus {
        export const active_nav_menu: string = 'active-nav-menu';
    }
}


interface MetadataInfo {
    model: string,
    fields: any
}
var Metadata: MetadataInfo[] = [];


function __metadata_exists(entity: string) {

    var metadata = _.find(Metadata, m => {

        return m.model === entity

    });

    return metadata != undefined;
}


function metadata(model: string): Q.Promise<any> {

    var d = Q.defer();

    Backendless.Persistence.describe(model, new Backendless.Async(data => {

        Metadata.push({
            model: model,
            fields: data
        });

        d.resolve(data);

    }, err => {

        d.reject(err);

    }));

    return d.promise;
}


export module Views {
    
    
    export interface ReactProps extends React.Props<any> {
        owner?: ReactView,
        redux?: boolean,
        flow?: any,
        className?: string
    }


    export interface ReactState extends rdx.ReduxState {
        loading?: boolean,        
    }


    export class ReactView extends React.Component<ReactProps, any>{

        state: ReactState;
        props: ReactProps;
        __context: any;
        unsubscribe: rx.Unsubscribe;


        constructor(props?: ReactProps) {            

            super(props);

            this.props = props;

            if (this.redux_enabled) {

                this.state = {
                    flowid: this.flow.id,
                    flowstate: -1
                }
            } else {

                this.state = {};

            }
        }


        private __flow: flow.Workflow;
        get flow(): flow.Workflow {
            if (!this.__flow) {
                this.__flow = this.get_workflow();
            }
            return this.__flow;
        }

        get flow_id(): string {
            return 'flowid-{0}'.format(this.flow.id);
        }


        get redux_enabled(): boolean {
            return this.props.redux;
        }


        get_workflow() {

            if (this.props.flow) {
                return this.props.flow;
            }

            return new flow.Workflow();
        }



        get app(): application.App {
            return __app;
        }


        initalize_state(): ReactState {
            return {
            };
        }


        get root(): JQuery {            
            return $(ReactDOM.findDOMNode(this));
        }


        jget(sel: string): JQuery {
            return this.root.find(sel);
        }


        notify(cmd: string, data?: any): Q.Promise<any> {
            return Q.resolve(true);
        }


        componentWillMount() {

            if (this.redux_enabled) {

                this.flow.attach();

                this.unsubscribe = this.flow.store.subscribe(() => {

                    this.onStateWillChanged();
                });

            }
        }


        componentDidUpdate() {

            if (this.redux_enabled) {
                this.onAfterFlowAction();
            }
        }


        componentWillUnmount() {

            if (this.redux_enabled) {
                this.unsubscribe();
            }
            
        }

        componentDidMount() {    

            if (this.redux_enabled) {
                this.flow.start();
            }                    
        }


        get_html_lang(term: string, value?: string) {
            return <span data-localize={term}>value</span>
        }


        onStateWillChanged() {
            
            var app_state = this.flow.store.getState();

            var that = this;

            if (app_state['current_flowid'] === that.flow_id) {

                var new_flow = this.onGetFlowState(app_state[that.flow_id]);

                this.setState(_.extend({}, that.state, new_flow));
                
            }
        }



        onGetFlowState(new_flow: any) {

            return new_flow;

        }



        onAfterFlowAction() {

        }

    }


    export interface MasterPageProps extends ReactProps {
        page_path: string,        
        page_navmenu: string,
        page_content: string,
        page_title?: string,
        page_descr?: string,
        pagetemplate?: string,        
    }


    export class MasterPage extends ReactView {

        props: MasterPageProps;

        constructor(props: MasterPageProps) {
            super(props);
        }
        

        render() {
            return null;
        }


        get_page_template() {

            var page_tmp = this.props.pagetemplate;

            if (!page_tmp) {
                page_tmp = this.app.settings.masterpage_template;
            }

            return page_tmp;
        }


        componentDidMount() {
            
            var that = this;
            
            $(this.app.settings.rootpage).load(this.get_page_template(), () => {
                $('.navbar .dropdown-toggle')['dropdownHover']();
                that.init_page();
            });
        }
        

        get root(): JQuery {
            return $(this.app.settings.rootpage);
        }


        get page_navmenu(): JQuery {

            var navmenu = this.props.page_navmenu;
            
            return this.root.find(navmenu);
        }


        get page_content(): JQuery {
            return this.root.find(this.props.page_content);
        }


        get_subview() {

            var subview = undefined;

            if (this.app.router.params) {
                subview = this.app.router.params.sub;
            }

            return subview;
        }
        

        fix_page_path() {

            this.root.find('#page-path').find('li').removeClass('active');

            if (this.root.find('#page-path').find('li.home').length == 0) {
                this.root.find('#page-path').append($('<li class="home"><a href="/">home</a></li>'));
            }

            var li = $('<li class="active"><a href="/">{0}</a></li>'.format(this.props.page_path));

            this.root.find('#page-path').append(li);

            this.root.find('.page-title').html(this.props.page_title);
            this.root.find('.page-descr').html(this.props.page_descr);
        }


        init_page() {

            this.fix_page_path();

            //this.init_datalinks();
            
            //this.resolve_subview();
        }


        is_secured() {
            return false;
        }
        
    }
    

    export class HomePage extends MasterPage {

        get_page_template() {

            var page_tmp = this.props.pagetemplate;

            if (!page_tmp) {
                page_tmp = this.app.settings.homepage_template;
            }

            return page_tmp;
        }

    }

}


export module application {


    export class Router {

        private __app: App;
        constructor(app: App) {
            this.__app = app;
        }

        params: any;
        routes: any;

        
        start_routing(routes: any) {

            this.routes = routes;
            
            _.each(Object.keys(routes), (key: string) => {

                var route = routes[key];

                page(key, ctx => {

                    this.params = ctx.params;

                    this.__app.store_appInfo({
                        last_url: ctx.path
                    })

                    var url = _.find(Object.keys(this.routes), r => {
                        return r === key;
                    });

                    var route = null;

                    if (url) {
                        route = this.routes[url];
                    }

                    if (!route) {
                        // --> 404
                    }
                    
                    var path = '..' + utils.Path.join('/views', route.url);

                    if (route.url != 'home/home') {

                        if ($('.fullscreenbanner').length > 0 && $('.fullscreenbanner')['revpause']) {
                            $('.fullscreenbanner')['revpause']()
                        }

                    } else {

                        if ($('.fullscreenbanner').length > 0 && $('.fullscreenbanner')['revresume']) {
                            $('.fullscreenbanner')['revresume']()
                        }
                    }
                    
                    require([path], module => {

                        var view = module[Object.keys(module)[0]];

                        ReactDOM.unmountComponentAtNode($(this.__app.settings.rootpage)[0]);

                        $(this.__app.settings.rootpage).empty();

                        ReactDOM.render(React.createElement(view), $(this.__app.settings.rootpage)[0]);

                    });
                });

            });
            
            page.start();
            
        }


        update_url(url: string): any {

            this.__app.store_appInfo({
                last_url: url
            })

            return page.show(url, null, false);
        }


        navigate(urlpath: string) {
            return page(urlpath);
        }

    }


    export class App {

        private __router: Router;
        get router(): Router {

            if (!this.__router) {
                this.__router = new application.Router(this);
            }

            return this.__router;
        }


        private __setts: Types.AppSettings;
        get settings(): Types.AppSettings {
            return this.__setts;        
        }


        private __datasource: DataSource;
        get datasource(): DataSource {

            if (!this.__datasource) {
                this.__datasource = new DataSource(this.settings.srv_url);
            }
            return this.__datasource;
        }
        
        
        get moltin(): any {
            return __moltin;
        }


        get_default_settings() :Types.AppSettings {

            return {
                
                rootpage: '#root-page',
                masterpage_template: '/html/masterpage.html',
                homepage_template:'/html/homepage.html',
                viewpath_root:''
            }

        }


        load_settings() {

            var d = Q.defer();

            require(['../config/settings'], fn => {

                this.__setts = _.extend(this.get_default_settings(), fn['settings']);

                this.load_backendless();

                d.resolve(fn);

            });
            

            return d.promise;
        }


        load_rootes() {

            var d = Q.defer();

            require(['../config/routes'], fn => {

                var routes = fn['routes'];

                this.router.start_routing(routes);

                d.resolve(fn);

            });
            
            return d.promise;            
        }

        
        load_backendless() {
            Backendless.initApp(this.settings.BACKENDLESS_APPID, this.settings.BACKENDLESS_KEYID, this.settings.BACKENDLESS_VERID);
        }


        load_moltin() {

            var d = Q.defer();

            __moltin = new Moltin({ publicId: 'oAnwFWaRcNTslPDKiwa88DwMXc3tlMcgwpt9WwCLM6' });

            __moltin.Authenticate(function () {
                d.resolve(true);
            });

            return d.promise;

        }


        user_is_verified() {

            var usr = this.get_user();

            return usr && (usr['is_verified'] === 1 );

        }


        store_user(usr)
        {
            cookies.set(constants.local.current_usr, usr);
            local.set(constants.local.current_usr, usr);        
        }


        store_appInfo(app_info: Types.AppInfo) {

            var old_info = this.get_appInfo();

            if (!old_info) {
                old_info = {};
            }

            var info = _.extend(old_info, app_info);

            local.set(constants.local.app_info, info);
        }


        get_appInfo(): Types.AppInfo {
            return local.get(constants.local.app_info);
        }


        internal_store_account(acc: any) {
            cookies.set('account', acc);
            local.set(constants.local.current_acc, acc);
        }


        store_account(__email: string): Q.Promise<Boolean> {

            var d = Q.defer<Boolean>();
            
            schema.call({
                fn: 'get',
                params: ['/accounts', { email: __email }]
            }).then(res => {

                if (res.response.results.length > 0) {

                    this.internal_store_account(res.response.results[0]);
                    
                    d.resolve(true);
                } else {
                    d.reject({
                        message:' Account not found'
                    });
                }

            }).fail((err: any) => {

                d.reject(err);
            });

            return d.promise;
        }

        
        get_user(): any {
            return local.get(constants.local.current_usr);
        }


        get_account(): any {
            return local.get(constants.local.current_acc);
        }
        

        login(email: string, password: string, update_cart_ui: boolean): Q.Promise<any> {

            var d = Q.defer();

            Backendless.UserService.login(email, password, true, new Backendless.Async((data) => {

                this.store_user(data);
                        
                this.store_account(data['email']).then(() => {

                    this.update_login_info();

                    if (update_cart_ui) {
                        carts.display_cart(true);
                    }

                    d.resolve(data);

                }).then(err => {

                    d.reject(err);

                });
                
            }, (err) => {
                d.reject(err);
            }));


            return d.promise;

        }


        logout() {

            Backendless.UserService.logout(new Backendless.Async((data) => {

                local.remove(constants.local.current_usr);
                local.remove(constants.local.current_acc);

                cookies.remove('current-user');
                cookies.remove('account');

                __app.router.navigate('/')

            }, (err) => {

                alert(err);

            }));


        }


        update_login_info() {

            this.display_loggedin_info();
            
        }


        private display_loggedin_info() {

            var view = this.get_view(constants.headers.pageheader);

            if (view) {

                view['update_loggin_info']();

            } else {

                if (!this.user_is_verified()) {
                    return;
                }

                $('.log-in').addClass('hidden');
                $('.log-out').removeClass('hidden');

                var usr_info = __app.get_user()['name'];

                if (!usr_info) {
                    usr_info = __app.get_user()['email'];
                }

                $('.log-out').find('.usr-info').html(usr_info);


                $('.log-out').find('.usr-logout').off('click');
                $('.log-out').find('.usr-logout').click(() => {

                    this.display_loggedout_info();
                });

            }
            
        }


        private display_loggedout_info() {

            $('.log-in').removeClass('hidden');
            $('.log-out').addClass('hidden');


            var ul = $('.products-cart ul');
            ul.empty();
            ul.append($('<li>Item(s) in your cart</li>'));


            $('.my-account').addClass('hidden');
            $('.my-account').addClass('hidden');
            $('.products-cart .cart-total').html('€{0}'.format(0));


            Backendless.UserService.logout(new Backendless.Async((data) => {

                cookies.remove('current-user');
                cookies.remove('account');

                __app.router.navigate('/')

            }, (err) => {

                alert(err);

            }));

            
        }


        signup(params: Types.User): Q.Promise<any> {

            var usr = _.extend(new Backendless.User(), params);
            
            var d = Q.defer();

            Backendless.UserService.register(usr, new Backendless.Async((data) => {

                this.create_account({
                    email: params.email,
                    name: params.name
                }).then((acc) => {

                    __app.store_user(data);

                    var rst = {
                        user: data,
                        acc: acc.response
                    }

                    local.set(constants.local.current_acc, rst.acc);
                    
                    this.update_login_info();

                    d.resolve(rst);

                }).fail(err => {

                    d.reject(err)
                });
                
            }, (err) => {
                d.reject(err)
            }));

            return d.promise;
        }


        create_account(params: { email: any, name: any }) {

            return schema.call({
                fn: 'post',
                params: ['/accounts', {
                    email: params.email,
                    name: params.name
                }]
            });

        }


        get_model(modelname: string): Q.Promise<Backendless.DataStore> {
        
            var d = Q.defer<Backendless.DataStore>();

            var model_obj = Backendless.Persistence.of(modelname);

            if (!__metadata_exists(modelname)) {

                metadata(modelname).then(meta => {
                    d.resolve(model_obj);
                });

            } else {
                return Q.resolve(model_obj);
            }

            return d.promise;
        }


        login_as_guest(): Q.Promise<any> {

            var d = Q.defer();

            Backendless.UserService.login('guest@gmail.com', 'guest', false, new Backendless.Async(res => {
                d.resolve(true);
            }, err => {
                d.reject(false);
            }));

            return d.promise;
        }


        get_guest_pssw() {
            var acc = local.get(constants.local.guest_usr);
            return acc['password'];
        }

        
        register_view(key: string, view: Views.ReactView) {

            __accessors[key] = view;
        }


        get_view(key: string): Views.ReactView {

            return __accessors[key];
        }


        remove_view(key: string) {
            delete __accessors[key];
        }


        start() {
            
            Q.all([
                this.load_settings(),
                //this.load_moltin(),
                this.load_rootes()]).then(() => {

                    return this.login_as_guest();
                    
                });                      
        }
    }


    export function InitApplication() {

        __app = new application.App();

        __app.start();
    }

}

 
export module carts {


    function add_li(cart_id: any, prod: any, cart_item: any) {

        function format_product_name(name: string) {            
            return '<span>{0}</span>'.format(name);
        }


        var url_img = null;


        if (prod['amazon'] && parseInt(prod['amazon']) === 1) {

            url_img = aws.retrieve_pict(prod);

        } else {

            if (prod.images && prod.images.length > 0) {
                url_img = prod.images[0].file.url;
            }
        }
        

        var price = cart_item.price; // numeral(cart_item.price).format('€0,0.00');        
        var qty = cart_item.quantity;

        var width = '20%';

        if (prod['amazon'] && parseInt(prod['amazon']) === 1) {
            width = '5%';
        }

        
        var html =
            `<li>
                <a href="/account/product/0-1">

                    <div class="media">

                        <img class="media-left media-object" src="{0}" alt="cart-Image" style="{4}; max-height:80px; display:inline-block"/>
                         
                        <div class="media-body" style="display:inline-block">
                            <h5 class="media-heading" style="display:inline-block; text-transform:lowercase">{1}<br><span>{2} X €{3}</span></h5>
                        </div>
                    </div>
                </a>
            </li>
            `.format(url_img, format_product_name(prod.name), qty, price, width);  

        return html.trim();
    }


    function add_actions() {

        //account/carts
        //account/checkout

        var html =
            `<li>
                <div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn btn-default btn-cart">Shopping Cart</button>
                    <button type="button" class="btn btn-default btn-checkout">Checkout</button>
                </div>
             </li>
            `;

        return html.trim();
    }


    function fetch_account(__email: string, store_acc?: boolean) {

        var acc = __app.get_account();

        if (acc) {
            return Q.resolve(acc);
        }

        return schema.call({
            fn: 'get',
            params: ['/accounts', { email: __email }]
        }).then(res => {

            if (store_acc) {
                __app.internal_store_account(res.response.results[0]);
            }
            
            return res.response.results[0];
        });
    }


    function fetch_items_of_carts(__carts: any[]) {

        var d = Q.defer();

        var item_ids = [];
        var items: any[] = [];

        _.each(__carts, cart => {

            _.each(cart.items, (item: any) => {

                items.push(item);

                item_ids.push(item.product_id);
            });
        });

        if (item_ids.length === 0) {
            item_ids.push(utils.guid());
        }


        schema.call({
            fn: 'get',
            params: ['/products', { 'id': { $in: item_ids } }]
        }).then(res => {

            var products = [];

            if (res.response && res.response.results) {
                products = res.response.results;
            }

            d.resolve({
                prods: products,
                items: items
            });

        }).fail(err => {

            d.reject(false);
        });

        return d.promise;
    }


    function init_actions(ul: JQuery) {

        ul.find('.btn-checkout').off('click');

        ul.find('.btn-checkout').click((e) => {

            var appinfo = __app.get_appInfo();
            
            __app.store_appInfo({
                fallback_url: appinfo.last_url
            });

            page('/account/checkout');

        });


        ul.find('.btn-cart').off('click');

        ul.find('.btn-cart').click((e) => {
            page('/account/cart');
        });
    }


    export function update_cart_ui(email: string, animate: boolean) {
        
        var d = Q.defer<any>();
        
        var view: mdl.PageMiddleHeader = __app.get_view(constants.headers.middleheader) as any;

        if (animate) {
            view.begin_updating_cart_ui();
        }

        fetch_account(email, true).then(acc => {

            schema.call({
                fn: 'get',
                params: ['/carts', {
                    where: {
                        account_id: acc['id'],
                        status: 'active'
                    }
                }]
            }).then(res => {

                var cart_id = utils.guid();

                var cart = res.response.results[0];

                if (res.response.results.length > 0) {
                    cart_id = res.response.results[0]['id'];
                }


                fetch_items_of_carts(res.response.results).then((data: { prods: any[], items: any[] }) => {

                    view.end_updating_cart_ui(data);

                    d.resolve(data.items);

                });

            });

        });

        return d.promise;
        
    }


    export function display_cart(animate: boolean) {

        var account = local.get(constants.local.current_acc);

        if (!account) {

            create_guest_user().then(obj => {

            });

        } else {

            update_cart_ui(account['email'], animate)
        }

    }


    export function flyToElement(flyer, flyingTo, callback) {
        var $func = $(this);
        var divider = 3;
        var flyerClone = $(flyer).clone();
        $(flyerClone).css({ position: 'absolute', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000 });
        $('body').append($(flyerClone));

        var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2;
        var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2;

        $(flyerClone).animate({
            opacity: 0.4,
            left: gotoX,
            top: gotoY,
            width: $(flyer).width() / divider,
            height: $(flyer).height() / divider
        }, 700,
            function () {
                $(flyingTo).fadeOut('fast', function () {
                    $(flyingTo).fadeIn('fast', function () {
                        $(flyerClone).fadeOut('fast', function () {
                            $(flyerClone).remove();
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            });
    }


    function create_account(params: {email: any, name: any}) {

        return schema.call({
            fn: 'post',
            params: ['/accounts', {
                email: params.email,
                name: params.name
            }]
        });

    }


    function create_guest_user(): Q.Promise<{ user: any, acc: any }> {

        var d = Q.defer<{user: any,acc: any}>();
        
        var key = '{0}_{1}'.format(chance.word({ length: 5 }), chance.word({ length: 5 }));
        
        __tmp_pws = 'guest_{0}'.format(key);
        
        var _email = 'guest_{0}_@guest.com'.format(key);

        var guest = {
            email: _email,
            password: __tmp_pws,
            name: 'guest_name_{0}'.format(key),
            surname: 'guest_surname_{0}'.format(key),
            is_verified: 0
        }

        local.set(constants.local.guest_usr, guest);
        
        __app.signup(guest as any).then(rst => {

            local.set('guest-usr', guest);

            d.resolve(rst);
            
        }).fail(err => {

            d.reject(err);
        });

        return d.promise;

    }


    function create_cart(product:any) {

        var d = Q.defer();

        schema.call({
            fn: 'post',
            params: ['/carts', {

                account: {
                    email: __app.get_user()['email']
                },

                items: [
                    { product_id: product['id'] }
                ]
            }]
        }).then(res => {

            d.resolve(res.response);

        }).fail(err => {

            d.reject(err);
        });

        return d.promise;
    }


    function fetch_or_create_account(): Q.Promise<{ user: any, acc: any }> {

        var d = Q.defer<{ user: any, acc: any }>();

        var __usr = __app.get_user();

        if (!__usr) {

            create_guest_user().then(obj => {

                d.resolve(obj);

            });

            return d.promise;

        } else {

            return fetch_account(__usr['email'], true).then(acc => {

                return {
                    user: __usr,
                    acc: acc
                }

            });

        }
        
    }


    function fetch_cart(account: any): Q.Promise<any> {

        var d = Q.defer();

        schema.call({
            fn: 'get',
            params: ['/carts', {
                where: {
                    account_id: account['id'],
                    status: 'active'
                }
            }]
        }).then(res => {

            if (res.response.results.length > 0) {
                d.resolve(res.response.results[0]);
            } else {
                d.resolve(null);
            }
        });

        return d.promise;

    }


    export function add_product_into_cart(product: any) {

        var d = Q.defer();
        
        fetch_or_create_account().then(obj => {

            var __usr = obj.user;
            var __acc = obj.acc;

            fetch_cart(__acc).then(cart => {

                if (!cart) {

                    create_cart(product).then(cart => {

                        update_cart_ui(__app.get_user()['email'], true);

                        d.resolve(true);
                    })

                } else {

                    add_product_to_cart_ui(cart['id'], product).then(() => {

                        update_cart_ui(__app.get_user()['email'], true);

                        d.resolve(true);

                    });
                    
                }
            })

        });


        return d.promise;
        
    }


    function add_product_to_cart_ui(cart_id: any, product: any) {

        var d = Q.defer();

        schema.call({
            fn: 'post',
            params: ['/carts/{0}/items'.format(cart_id), {
                product_id: product['id']
            }]
        }).then(prod => {
                        
            d.resolve(prod);

        }).fail(err => {

            d.reject(err);
        });

        return d.promise;

    }

}


export module local {

    var local:any = $['localStorage'];


    export function set(name: string, obj: any) {
        local.set(name, obj);
    }


    export function get(name: string) {

        function isJson(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        var obj: any = local.get(name);

        if (obj) {

            if (isJson(obj)) {

                obj = JSON.parse(obj);
            }
        }

        return obj;
    }


    export function remove(name: string) {
        return local.remove(name);
    }
}


export module data {

    export function get_schema(model: string) {

        return schema.call({
            fn: 'get',
            params: ['/:models/{0}'.format(model)]
        }).then(data => {


        });

    }
}


export module pubsub {

    export function subscribe(topic: string, callback: (msg?: any, data?: any) => any): number {

        return PubSub.subscribe(topic, callback);
    }


    export function publish(topic: string, data?: any) {

        PubSub.publish(topic, data);

    }
}


