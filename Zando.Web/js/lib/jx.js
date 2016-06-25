/// <reference path="server.ts" />
/// <reference path="../../typings/backendless.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', './server'], function (require, exports, React, ReactDOM, server_1) {
    var API;
    (function (API) {
        API[API["default"] = 0] = "default";
        API[API["moltin"] = 1] = "moltin";
        API[API["schemaIo"] = 2] = "schemaIo";
    })(API || (API = {}));
    ;
    var __api = API.moltin;
    var __router_ctx;
    var __app;
    var __moltin;
    var Types;
    (function (Types) {
        var Bootstrap;
        (function (Bootstrap) {
            (function (Style) {
                Style[Style["default"] = 0] = "default";
                Style[Style["primary"] = 1] = "primary";
                Style[Style["success"] = 2] = "success";
                Style[Style["info"] = 3] = "info";
                Style[Style["warning"] = 4] = "warning";
                Style[Style["danger"] = 5] = "danger";
            })(Bootstrap.Style || (Bootstrap.Style = {}));
            var Style = Bootstrap.Style;
            function toString(style) {
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
            Bootstrap.toString = toString;
        })(Bootstrap = Types.Bootstrap || (Types.Bootstrap = {}));
        (function (Usertype) {
            Usertype[Usertype["admin"] = 0] = "admin";
            Usertype[Usertype["contact"] = 1] = "contact";
            Usertype[Usertype["guest"] = 2] = "guest";
        })(Types.Usertype || (Types.Usertype = {}));
        var Usertype = Types.Usertype;
    })(Types = exports.Types || (exports.Types = {}));
    var Metadata = [];
    function __metadata_exists(entity) {
        var metadata = _.find(Metadata, function (m) {
            return m.model === entity;
        });
        return metadata != undefined;
    }
    function metadata(model) {
        var d = Q.defer();
        Backendless.Persistence.describe(model, new Backendless.Async(function (data) {
            Metadata.push({
                model: model,
                fields: data
            });
            d.resolve(data);
        }, function (err) {
            d.reject(err);
        }));
        return d.promise;
    }
    var Views;
    (function (Views) {
        var ReactView = (function (_super) {
            __extends(ReactView, _super);
            function ReactView(props) {
                _super.call(this, props);
                this.props = props;
                this.state = this.initalize_state();
            }
            Object.defineProperty(ReactView.prototype, "app", {
                get: function () {
                    return __app;
                },
                enumerable: true,
                configurable: true
            });
            ReactView.prototype.initalize_state = function () {
                return {};
            };
            Object.defineProperty(ReactView.prototype, "root", {
                get: function () {
                    return $(ReactDOM.findDOMNode(this));
                },
                enumerable: true,
                configurable: true
            });
            ReactView.prototype.notify = function (cmd, data) {
                return Q.resolve(true);
            };
            ReactView.prototype.componentDidMount = function () {
            };
            ReactView.prototype.get_html_lang = function (term, value) {
                return React.createElement("span", {"data-localize": term}, "value");
            };
            return ReactView;
        })(React.Component);
        Views.ReactView = ReactView;
        var MasterPage = (function (_super) {
            __extends(MasterPage, _super);
            function MasterPage(props) {
                _super.call(this, props);
            }
            MasterPage.prototype.render = function () {
                return null;
            };
            MasterPage.prototype.get_page_template = function () {
                var page_tmp = this.props.pagetemplate;
                if (!page_tmp) {
                    page_tmp = this.app.settings.masterpage_template;
                }
                return page_tmp;
            };
            MasterPage.prototype.componentDidMount = function () {
                var that = this;
                $(this.app.settings.rootpage).load(this.get_page_template(), function () {
                    $('.navbar .dropdown-toggle')['dropdownHover']();
                    that.init_page();
                });
            };
            Object.defineProperty(MasterPage.prototype, "root", {
                get: function () {
                    return $(this.app.settings.rootpage);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MasterPage.prototype, "page_navmenu", {
                get: function () {
                    var navmenu = this.props.page_navmenu;
                    return this.root.find(navmenu);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MasterPage.prototype, "page_content", {
                get: function () {
                    return this.root.find(this.props.page_content);
                },
                enumerable: true,
                configurable: true
            });
            MasterPage.prototype.get_subview = function () {
                var subview = undefined;
                if (this.app.router.params) {
                    subview = this.app.router.params.sub;
                }
                return subview;
            };
            MasterPage.prototype.fix_page_path = function () {
                this.root.find('#page-path').find('li').removeClass('active');
                if (this.root.find('#page-path').find('li.home').length == 0) {
                    this.root.find('#page-path').append($('<li class="home"><a href="/">home</a></li>'));
                }
                var li = $('<li class="active"><a href="/">{0}</a></li>'.format(this.props.page_path));
                this.root.find('#page-path').append(li);
                this.root.find('.page-title').html(this.props.page_title);
                this.root.find('.page-descr').html(this.props.page_descr);
            };
            MasterPage.prototype.init_page = function () {
                this.fix_page_path();
                //this.init_datalinks();
                //this.resolve_subview();
            };
            MasterPage.prototype.is_secured = function () {
                return false;
            };
            return MasterPage;
        })(ReactView);
        Views.MasterPage = MasterPage;
        var HomePage = (function (_super) {
            __extends(HomePage, _super);
            function HomePage() {
                _super.apply(this, arguments);
            }
            HomePage.prototype.get_page_template = function () {
                var page_tmp = this.props.pagetemplate;
                if (!page_tmp) {
                    page_tmp = this.app.settings.homepage_template;
                }
                return page_tmp;
            };
            return HomePage;
        })(MasterPage);
        Views.HomePage = HomePage;
    })(Views = exports.Views || (exports.Views = {}));
    var Application;
    (function (Application) {
        var Router = (function () {
            function Router(app) {
                this.__app = app;
            }
            Router.prototype.init_routes = function (routes) {
                var _this = this;
                this.routes = routes;
                _.each(Object.keys(routes), function (key) {
                    var route = routes[key];
                    page(key, function (ctx) {
                        _this.params = ctx.params;
                        var url = _.find(Object.keys(_this.routes), function (r) {
                            return r === key;
                        });
                        var route = null;
                        if (url) {
                            route = _this.routes[url];
                        }
                        if (!route) {
                        }
                        var path = '..' + utils.Path.join('/views', route.url);
                        if (route.url != 'home/home') {
                            if ($('.fullscreenbanner').length > 0 && $('.fullscreenbanner')['revpause']) {
                                $('.fullscreenbanner')['revpause']();
                            }
                        }
                        else {
                            if ($('.fullscreenbanner').length > 0 && $('.fullscreenbanner')['revresume']) {
                                $('.fullscreenbanner')['revresume']();
                            }
                        }
                        require([path], function (module) {
                            var view = module[Object.keys(module)[0]];
                            ReactDOM.unmountComponentAtNode($(_this.__app.settings.rootpage)[0]);
                            $(_this.__app.settings.rootpage).empty();
                            ReactDOM.render(React.createElement(view), $(_this.__app.settings.rootpage)[0]);
                        });
                    });
                });
                page.start();
            };
            Router.prototype.update_url = function (url) {
                return page.show(url, null, false);
            };
            Router.prototype.navigate = function (urlpath) {
                return page(urlpath);
            };
            return Router;
        })();
        Application.Router = Router;
        var App = (function () {
            function App() {
            }
            Object.defineProperty(App.prototype, "router", {
                get: function () {
                    if (!this.__router) {
                        this.__router = new Application.Router(this);
                    }
                    return this.__router;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App.prototype, "settings", {
                get: function () {
                    return this.__setts;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App.prototype, "datasource", {
                get: function () {
                    if (!this.__datasource) {
                        this.__datasource = new server_1.DataSource(this.settings.srv_url);
                    }
                    return this.__datasource;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App.prototype, "moltin", {
                get: function () {
                    return __moltin;
                },
                enumerable: true,
                configurable: true
            });
            App.prototype.get_default_settings = function () {
                return {
                    rootpage: '#root-page',
                    masterpage_template: '/html/masterpage.html',
                    homepage_template: '/html/homepage.html',
                    viewpath_root: ''
                };
            };
            App.prototype.load_settings = function () {
                var _this = this;
                var d = Q.defer();
                require(['../config/settings'], function (fn) {
                    _this.__setts = _.extend(_this.get_default_settings(), fn['settings']);
                    _this.load_backendless();
                    d.resolve(fn);
                });
                return d.promise;
            };
            App.prototype.load_rootes = function () {
                var _this = this;
                var d = Q.defer();
                require(['../config/routes'], function (fn) {
                    var routes = fn['routes'];
                    _this.router.init_routes(routes);
                    d.resolve(fn);
                });
                return d.promise;
            };
            App.prototype.load_backendless = function () {
                Backendless.initApp(this.settings.BACKENDLESS_APPID, this.settings.BACKENDLESS_KEYID, this.settings.BACKENDLESS_VERID);
            };
            App.prototype.load_moltin = function () {
                var d = Q.defer();
                __moltin = new Moltin({ publicId: 'oAnwFWaRcNTslPDKiwa88DwMXc3tlMcgwpt9WwCLM6' });
                __moltin.Authenticate(function () {
                    d.resolve(true);
                });
                return d.promise;
            };
            App.prototype.store_user = function (usr) {
                cookies.set('current-user', usr);
            };
            App.prototype.store_account = function (__email) {
                var d = Q.defer();
                schema.call({
                    fn: 'get',
                    params: ['/accounts', { email: __email }]
                }).then(function (res) {
                    if (res.response.results.length > 0) {
                        cookies.set('account', res.response.results[0]);
                        d.resolve(true);
                    }
                    else {
                        d.reject({
                            message: ' Account not found'
                        });
                    }
                }).fail(function (err) {
                    d.reject(err);
                });
                return d.promise;
            };
            App.prototype.get_user = function () {
                return cookies.get('current-user');
            };
            App.prototype.get_account = function () {
                return cookies.get('account');
            };
            App.prototype.login = function (email, password) {
                var _this = this;
                var d = Q.defer();
                Backendless.UserService.login(email, password, true, new Backendless.Async(function (data) {
                    _this.store_user(data);
                    _this.store_account(data['email']).then(function () {
                        d.resolve(data);
                    });
                }, function (err) {
                    d.reject(err);
                }));
                return d.promise;
            };
            App.prototype.signup = function (params) {
                var usr = new Backendless.User();
                usr.email = params.email;
                usr.password = params.password;
                usr['name'] = params.name;
                usr['surname'] = params.surname;
                var d = Q.defer();
                Backendless.UserService.register(usr, new Backendless.Async(function (data) {
                    d.resolve(data);
                }, function (err) {
                    d.reject(err);
                }));
                return d.promise;
            };
            App.prototype.get_model = function (modelname) {
                var d = Q.defer();
                var model_obj = Backendless.Persistence.of(modelname);
                if (!__metadata_exists(modelname)) {
                    metadata(modelname).then(function (meta) {
                        d.resolve(model_obj);
                    });
                }
                else {
                    return Q.resolve(model_obj);
                }
                return d.promise;
            };
            App.prototype.login_as_guest = function () {
                var d = Q.defer();
                Backendless.UserService.login('guest@gmail.com', 'guest', false, new Backendless.Async(function (res) {
                    d.resolve(true);
                }, function (err) {
                    d.reject(false);
                }));
                return d.promise;
            };
            App.prototype.start = function () {
                var _this = this;
                Q.all([
                    this.load_settings(),
                    //this.load_moltin(),
                    this.load_rootes()]).then(function () {
                    return _this.login_as_guest();
                });
            };
            return App;
        })();
        Application.App = App;
        function InitApplication() {
            __app = new Application.App();
            __app.start();
        }
        Application.InitApplication = InitApplication;
    })(Application = exports.Application || (exports.Application = {}));
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/lib/jx.js.map