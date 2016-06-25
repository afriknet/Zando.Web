/// <reference path="../../typings/tsd.d.ts" />
String.prototype.format = function () {
    var d = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        d[_i - 0] = arguments[_i];
    }
    var args = (arguments.length === 1 && $.isArray(arguments[0])) ? arguments[0] : arguments;
    var formattedString = this;
    for (var i = 0; i < args.length; i++) {
        var pattern = new RegExp("\\{" + i + "\\}", "gm");
        formattedString = formattedString.replace(pattern, args[i]);
    }
    return formattedString;
};
_.mixin({
    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
});
var utils;
(function (utils) {
    function is_null_or_empty(val) {
        return val === null || val === undefined
            || !val || (0 === val.length);
    }
    utils.is_null_or_empty = is_null_or_empty;
    function exec(spin, call) {
        var d = Q.defer();
        spin.removeClass('hidden');
        d.promise.finally(function () {
            spin.addClass('hidden');
        });
        call(d);
        return d.promise;
    }
    utils.exec = exec;
    function resolve_rst(rst) {
        if ($.isArray(rst.results)) {
            var r = rst.results;
            if (r.length > 0) {
                return r[0];
            }
        }
    }
    utils.resolve_rst = resolve_rst;
    function guid() {
        return _.guid();
    }
    utils.guid = guid;
    function scrollToObj(target, offset, time) {
        $('html, body').animate({ scrollTop: $(target).offset().top - offset }, time);
    }
    utils.scrollToObj = scrollToObj;
    function loadfile(file) {
        var d = Q.defer();
        require([file], function (f) {
            d.resolve(f);
        }, function (err) {
            d.reject(err);
        });
        return d.promise;
    }
    utils.loadfile = loadfile;
    utils.Path = {
        join: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var parts = [];
            for (var i = 0, l = arguments.length; i < l; i++) {
                parts = parts.concat(arguments[i].split("/"));
            }
            // Interpret the path commands to get the new resolved path.
            var newParts = [];
            for (i = 0, l = parts.length; i < l; i++) {
                var part = parts[i];
                // Remove leading and trailing slashes
                // Also remove "." segments
                if (!part || part === ".")
                    continue;
                // Interpret ".." to pop the last segment
                if (part === "..")
                    newParts.pop();
                else
                    newParts.push(part);
            }
            // Preserve the initial slash if there was one.
            if (parts[0] === "")
                newParts.unshift("");
            // Turn back into a single string path.
            return newParts.join("/") || (newParts.length ? "/" : ".");
        }
    };
    function can_delete() {
        var d = Q.defer();
        swal({
            title: "Voulez-vous reellement effacer cet element?",
            text: "Ce changement est definitif et ne peut etre annule",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true,
        }, function (confirmed) {
            if (confirmed) {
                d.resolve(true);
            }
            else {
                d.reject(false);
            }
        });
        return d.promise;
    }
    utils.can_delete = can_delete;
    function can_looseChanges() {
        var d = Q.defer();
        swal({
            title: "Voulez-vous reellement quitter cette page?",
            text: "Les modifications non sauvegardees seront perdues",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            cancelButtonText: "Annuler",
            closeOnConfirm: true,
            closeOnCancel: true,
        }, function (confirmed) {
            if (confirmed) {
                d.resolve(true);
            }
            else {
                d.reject(false);
            }
        });
        return d.promise;
    }
    utils.can_looseChanges = can_looseChanges;
    function spin(el) {
        $(el).waitMe({
            effect: 'rotation'
        });
    }
    utils.spin = spin;
    function unspin(el) {
        $(el).waitMe('hide');
    }
    utils.unspin = unspin;
    function query(model, where) {
        var d = Q.defer();
        var model_obj = Backendless.Persistence.of(model);
        if (where) {
            var qry = new Backendless.DataQuery();
            qry.condition = where;
            model_obj.find(qry, new Backendless.Async(function (res) {
                d.resolve(res.data);
            }, function (err) {
                d.reject(err);
            }));
        }
        return d.promise;
    }
    utils.query = query;
    function flyToElement(flyer, flyingTo, callback) {
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
        }, 700, function () {
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
    utils.flyToElement = flyToElement;
})(utils || (utils = {}));
var schema;
(function (schema) {
    function call(params) {
        var d = Q.defer();
        var srv_url = 'https://umarket-node.herokuapp.com/api';
        //var srv_url = 'http://localhost:1337/api';
        $.ajax(srv_url, {
            type: 'POST',
            data: params,
            crossDomain: true,
            "dataType": "json",
            "cache": false,
            success: function (res) {
                if (res && res.response) {
                    if (typeof res.response === 'string') {
                        res.response = JSON.parse(res.response);
                    }
                }
                d.resolve(res);
            },
            error: function (err) {
                d.reject(err);
            }
        });
        return d.promise;
    }
    schema.call = call;
})(schema || (schema = {}));
var lang;
(function (lang) {
    function localize(root) {
        var el = root ? $(root) : $('[data-localize]');
        el['localize']('lang', {
            language: 'fr',
            pathPrefix: "/lang",
            callback: function (data, defaultCallback) {
                defaultCallback(data);
                //app.data_lang = data;
                //if (outer_callback) {
                //    outer_callback();
                //}
            }
        });
    }
    lang.localize = localize;
})(lang || (lang = {}));
var carts;
(function (carts) {
    function add_li(cart_id, prod, cart_item) {
        var url_img = null;
        if (prod.images && prod.images.length > 0) {
            url_img = prod.images[0].file.url;
        }
        var price = numeral(cart_item.price).format('€0,0.00');
        var qty = cart_item.quantity;
        var html = "<li data-cart-itemid=\"{4}\" data-cart-id=\"{5}\">\n                <div class=\"row\">\n                    <div class=\"col-sm-3\">\n                        <img src=\"{0}\" class=\"img-responsive\" alt=\"\">\n                    </div>\n                    <div class=\"col-sm-9\">\n                        <h4><a href=\"/explore\">{1}</a></h4>\n                        <p>{2}x - \u20AC{3}</p>\n                        <a href=\"#\" class=\"remove\"><i class=\"fa fa-times-circle\"></i></a>\n                    </div>\n                </div>\n             </li>\n            ".format(url_img, prod.name, qty, price, cart_item['id'], cart_id); //
        return html.trim();
    }
    function add_actions() {
        //account/carts
        //account/checkout
        var html = "<li>\n                <div class=\"row\">\n                    <div class=\"col-sm-6\">\n                        <a href=\"/account/carts\" class=\"btn btn-primary btn-block btn-view-cart\">View Cart</a>\n                    </div>\n                    <div class=\"col-sm-6\">\n                        <a href=\"/account/checkout\" class=\"btn btn-primary btn-block btn-checkout-cart\">Checkout</a>\n                    </div>\n                </div>\n            </li>\n            ";
        return html.trim();
    }
    function fetch_account(__email) {
        return schema.call({
            fn: 'get',
            params: ['/accounts', { email: __email }]
        }).then(function (res) {
            return res.response.results[0];
        });
    }
    function fetch_items_of_carts(__carts) {
        var d = Q.defer();
        var item_ids = [];
        var items = [];
        _.each(__carts, function (cart) {
            _.each(cart.items, function (item) {
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
        }).then(function (res) {
            var products = [];
            if (res.response && res.response.results) {
                products = res.response.results;
            }
            d.resolve({
                prods: products,
                items: items
            });
        }).fail(function (err) {
            d.reject(false);
        });
        return d.promise;
    }
    function init_actions(ul) {
        ul.find('.remove').click(function (e) {
            var li = $(e.currentTarget).closest('li');
            var cartid = li.attr('data-cart-id');
            var itemid = li.attr('data-cart-itemid');
            utils.spin(ul);
            schema.call({
                fn: 'delete',
                params: ['/carts/{0}/items/{1}'.format(cartid, itemid)]
            }).then(function (res) {
                carts.update_cart(cookies.get('current-user')['email']);
            }).fail(function (err) {
                toastr.error(err);
            }).finally(function () {
                utils.unspin(ul);
            });
        });
        //ul.find('.btn-view-cart').click(e => {
        //    e.preventDefault();
        //    page('');
        //});
    }
    function update_cart(email) {
        return fetch_account(email).then(function (acc) {
            var d = Q.defer();
            schema.call({
                fn: 'get',
                params: ['/carts', {
                        where: {
                            account_id: acc['id'],
                            processed: false
                        }
                    }]
            }).then(function (res) {
                var cart_id = utils.guid();
                if (res.response.results.length > 0) {
                    cart_id = res.response.results[0]['id'];
                }
                fetch_items_of_carts(res.response.results).then(function (data) {
                    var ul = $('.navbar-cart .dropdown-menu');
                    if (ul.length === 0) {
                        ul = $('<ul class="dropdown-menu"></ul>').appendTo($('.navbar-cart'));
                    }
                    else {
                        $(ul).empty();
                    }
                    _.each(data.prods, function (prod) {
                        var cart_item = _.find(data.items, function (itm) {
                            return itm.product_id === prod.id;
                        });
                        ul.append(add_li(cart_id, prod, cart_item));
                    });
                    if (data.prods.length > 0) {
                        ul.append(add_actions());
                    }
                    init_actions(ul);
                    d.resolve(true);
                });
            });
            return d.promise;
        });
    }
    carts.update_cart = update_cart;
})(carts || (carts = {}));
var cookies;
(function (cookies) {
    function set(name, obj) {
        Cookies.set(name, obj, { expires: 30 });
    }
    cookies.set = set;
    function get(name) {
        function isJson(str) {
            try {
                JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return true;
        }
        var obj = Cookies.get(name);
        if (obj) {
            if (isJson(obj)) {
                obj = JSON.parse(obj);
            }
        }
        return obj;
    }
    cookies.get = get;
    function remove(name) {
        return Cookies.remove(name);
    }
    cookies.remove = remove;
})(cookies || (cookies = {}));
var iCheck;
(function (iCheck) {
    function icheck(params) {
        params.$el['iCheck']({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio'
        });
        params.$el.off('ifChecked');
        params.$el.on('ifChecked', function (e) {
            if (params.onChecked) {
                params.onChecked(e);
            }
        });
        params.$el.off('ifUnchecked');
        params.$el.on('ifUnchecked', function (e) {
            if (params.onUnchecked) {
                params.onUnchecked(e);
            }
        });
    }
    iCheck.icheck = icheck;
})(iCheck || (iCheck = {}));
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/lib/utils.js.map