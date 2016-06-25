/// <reference path="server.ts" />
/// <reference path="../../typings/backendless.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');

import { DataSource } from './server';


enum API { default, moltin, schemaIo };

var __api = API.moltin;


var __router_ctx: any;
var __app: Application.App;
var __moltin: any;

declare var page;
declare var Moltin;
declare var Cookies;


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


    export interface RouteInfo {
        url: string,
        descr?: string
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
        className?: string
    }


    export interface ReactState {
        loading?: boolean
    }


    export class ReactView extends React.Component<ReactProps, any>{

        state: ReactState;
        props: ReactProps;
        __context: any;

        constructor(props?: ReactProps) {            

            super(props);

            this.props = props;

            this.state = this.initalize_state();
        }



        get app(): Application.App {
            return __app;
        }


        initalize_state(): ReactState {
            return {
            };
        }


        get root(): JQuery {            
            return $(ReactDOM.findDOMNode(this));
        }


        notify(cmd: string, data?: any): Q.Promise<any> {
            return Q.resolve(true);
        }


        componentDidMount() {            
        }

        get_html_lang(term: string, value?: string) {
            return <span data-localize={term}>value</span>
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


export module Application {


    export class Router {

        private __app: App;
        constructor(app: App) {
            this.__app = app;
        }

        params: any;
        routes: any;



        init_routes(routes: any) {

            this.routes = routes;


            _.each(Object.keys(routes), (key: string) => {

                var route = routes[key];

                page(key, ctx => {

                    this.params = ctx.params;

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
                this.__router = new Application.Router(this);
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

                this.router.init_routes(routes);

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


        store_user(usr)
        {
            cookies.set('current-user', usr);            
        }

        private store_account(__email: string): Q.Promise<Boolean> {

            var d = Q.defer<Boolean>();
            
            schema.call({
                fn: 'get',
                params: ['/accounts', { email: __email }]
            }).then(res => {

                if (res.response.results.length > 0) {

                    cookies.set('account', res.response.results[0]);

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
            return cookies.get('current-user');
        }

        get_account(): any {
            return cookies.get('account');
        }
        

        login(email: string, password: string): Q.Promise<any> {

            var d = Q.defer();

            Backendless.UserService.login(email, password, true, new Backendless.Async((data) => {

                this.store_user(data);

                this.store_account(data['email']).then(() => {
                    d.resolve(data);
                });
                
            }, (err) => {
                d.reject(err);
            }));


            return d.promise;

        }


        signup(params: { email: string, password: string, name: string, surname: string }): Q.Promise<any> {

            var usr = new Backendless.User();
            usr.email = params.email;
            usr.password = params.password;
            usr['name'] = params.name;
            usr['surname'] = params.surname;

            var d = Q.defer();

            Backendless.UserService.register(usr, new Backendless.Async((data) => {
                d.resolve(data);
            }, (err) => {
                d.reject(err)
            }));

            return d.promise;
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

        __app = new Application.App();

        __app.start();
    }

}