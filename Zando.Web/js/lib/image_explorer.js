/// <reference path="controls.tsx" />
/// <reference path="jx.tsx" />
/// <reference path="imageload.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', './jx', './imageload', './controls'], function (require, exports, React, jx, img, ctrls) {
    "use strict";
    var b = require('react-bootstrap');
    var ImageExplorer = (function (_super) {
        __extends(ImageExplorer, _super);
        function ImageExplorer(props) {
            _super.call(this, props);
            this.state.loading = true;
            this.images = [];
        }
        ImageExplorer.prototype.render = function () {
            if (this.state.loading) {
                return React.createElement("div", {style: { minHeight: 300 }});
            }
            var images = ["/server/images/product-1.jpg", "/server/images/product-1.jpg", "/server/images/product-2.jpg"];
            var that = this;
            var html = React.createElement("div", {className: "mt10", style: { maxHeight: 840 }}, React.createElement(b.Row, null, React.createElement(b.Col, {xs: 12}, React.createElement(b.Button, {id: "btn-open-dz", bsStyle: "info", onClick: function () { that.open_dropzone(); }}, "Upload new image"), React.createElement(b.Button, {id: "btn-close-dz", bsStyle: "warning", className: "ml10 hidden", onClick: function () { that.close_dropzone(); }}, React.createElement(ctrls.Ficon, {icon: "times"}), " close")), React.createElement(b.Col, {xs: 12, className: "image-dropzone", style: { display: 'none' }}, React.createElement("div", {className: "mt10"}, React.createElement(img.ImageLoader, {on_file_added: function (file) { return that.on_img_added(file); }})))), React.createElement("hr", null), React.createElement(b.Row, null, React.createElement(b.Col, {xs: 12}, React.createElement(ImageList, {owner: this, images: this.images}))));
            return html;
        };
        ImageExplorer.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            if (this.state.loading) {
                this.load_images();
            }
        };
        ImageExplorer.prototype.componentDidUpdate = function () {
            if (this.state.loading) {
                this.load_images();
            }
        };
        ImageExplorer.prototype.load_images = function () {
            var _this = this;
            utils.spin(this.root);
            this.props.load_data().then(function (data) {
                _this.images = data;
                _this.setState({
                    loading: false
                });
            }).finally(function () {
                utils.unspin(_this.root);
            });
        };
        ImageExplorer.prototype.on_img_added = function (file) {
            var _this = this;
            var d = Q.defer();
            var model = Backendless.Persistence.of('images');
            var defaults = {
                filename: file.name,
                is_main: false,
                productid: this.props.productid
            };
            var img = null; // ko['mapping'].toJS( meta.toEntity('images', defaults));
            model.save(img, new Backendless.Async(function (res) {
                _this.setState({
                    loading: true
                });
                d.resolve(true);
            }, function (err) {
                d.reject(err);
            }));
            return d.promise;
        };
        ImageExplorer.prototype.set_main_image = function (objectId) {
            var _this = this;
            var d = Q.defer();
            utils.spin(this.root);
            this.unset_previous().then(function () {
                _this.set_main(objectId).then(function () {
                    _this.setState({
                        loading: true
                    });
                    utils.unspin(_this.root);
                });
            });
            return d.promise;
        };
        ImageExplorer.prototype.set_main = function (objectId) {
            var d = Q.defer();
            var model = Backendless.Persistence.of('images');
            model.findById(objectId, new Backendless.Async(function (res) {
                res['is_main'] = true;
                model.save(res, new Backendless.Async(function (res1) {
                    d.resolve(true);
                }));
            }));
            return d.promise;
        };
        ImageExplorer.prototype.unset_previous = function () {
            var d = Q.defer();
            var model = Backendless.Persistence.of('images');
            var qry = new Backendless.DataQuery();
            qry.condition = "(is_main=true)";
            model.find(qry, new Backendless.Async(function (res) {
                if (res.data.length > 0) {
                    var prev = res.data[0];
                    prev['is_main'] = false;
                    model.save(prev, new Backendless.Async(function (res1) {
                        d.resolve(true);
                    }));
                }
                else {
                    d.resolve(true);
                }
            }));
            return d.promise;
        };
        ImageExplorer.prototype.unset_main_image = function () {
            var _this = this;
            var d = Q.defer();
            utils.spin(this.root);
            this.unset_previous().then(function () {
                _this.setState({
                    loading: true
                });
            }).finally(function () {
                utils.unspin(_this.root);
            });
            return d.promise;
        };
        ImageExplorer.prototype.remove_image = function (objectId) {
            var _this = this;
            var d = Q.defer();
            var model = Backendless.Persistence.of('images');
            utils.spin(this.root);
            model.findById(objectId, new Backendless.Async(function (res) {
                model.remove(res, new Backendless.Async(function (res1) {
                    _this.setState({
                        loading: true
                    });
                    d.resolve(true);
                }, function (err1) {
                    utils.unspin(_this.root);
                    d.reject(err1);
                }));
            }, function (err) {
                utils.unspin(_this.root);
                d.reject(err);
            }));
            return d.promise;
        };
        ImageExplorer.prototype.open_dropzone = function () {
            this.root.find('.image-dropzone').slideDown();
            this.root.find('#btn-close-dz').removeClass('hidden');
        };
        ImageExplorer.prototype.close_dropzone = function () {
            this.root.find('.image-dropzone').slideUp();
            this.root.find('#btn-close-dz').addClass('hidden');
        };
        return ImageExplorer;
    }(jx.Views.ReactView));
    exports.ImageExplorer = ImageExplorer;
    var ImageList = (function (_super) {
        __extends(ImageList, _super);
        function ImageList(props) {
            _super.call(this, props);
        }
        //img_id={_.result(img, 'is_main') } is_main={_.result(img, 'is_main') } img_url={img_url}
        ImageList.prototype.render = function () {
            var _this = this;
            var html = React.createElement(b.Row, null, _.map(this.props.images, function (img) {
                var img_url = '/server/images/{0}'.format(_.result(img, 'filename'));
                return React.createElement("div", {"data-img-id": _.result(img, 'objectId')}, React.createElement(ImageThumbnail, {owner: _this, img_obj: img, img_url: img_url}));
            }));
            return html;
        };
        ImageList.prototype.on_img_checked = function (id) {
            this.props.owner['set_main_image'](id);
        };
        ImageList.prototype.on_img_unchecked = function (id) {
            this.props.owner['unset_main_image'](id);
        };
        ImageList.prototype.on_img_remove = function (id) {
            this.props.owner['remove_image'](id);
        };
        return ImageList;
    }(jx.Views.ReactView));
    exports.ImageList = ImageList;
    var ImageThumbnail = (function (_super) {
        __extends(ImageThumbnail, _super);
        function ImageThumbnail(props) {
            _super.call(this, props);
        }
        Object.defineProperty(ImageThumbnail.prototype, "is_main", {
            get: function () {
                return _.result(this.props.img_obj, 'is_main');
            },
            enumerable: true,
            configurable: true
        });
        ImageThumbnail.prototype.render = function () {
            var _this = this;
            var check_props = {
                is_checked: this.is_main,
                onchecked: function (id) {
                    _this.on_img_checked(id);
                },
                onunchecked: function (id) {
                    _this.on_img_unchecked(id);
                }
            };
            var html = React.createElement("div", {className: "col-lg-3 col-md-4 col-xs-6 thumb"}, React.createElement("a", {className: "thumbnail", href: "#"}, React.createElement("img", {className: "img-responsive", src: this.props.img_url, alt: ""})), React.createElement("div", {className: "pull-right actions", style: { display: 'none' }}, React.createElement(b.Button, {bsStyle: "default", bsSize: "xs", className: "btn-remove"}, React.createElement(ctrls.Ficon, {icon: "times"}), " delete ")), React.createElement("div", {className: "pull-left info"}, React.createElement("div", {style: { display: 'table' }}, React.createElement("div", {style: { display: 'table-cell' }}, React.createElement(ctrls.CheckBox, React.__spread({}, check_props))), React.createElement("div", {style: { display: 'table-cell', paddingLeft: 10 }}, React.createElement("div", {className: "img-caption {0}".format(this.set_is_main())}, "is main")))));
            return html;
        };
        ImageThumbnail.prototype.set_is_main = function () {
            return this.is_main ? null : 'hidden';
        };
        ImageThumbnail.prototype.on_img_checked = function (id) {
            this.props.owner.on_img_checked(id);
        };
        ImageThumbnail.prototype.on_img_unchecked = function (id) {
            this.props.owner.on_img_unchecked(id);
        };
        ImageThumbnail.prototype.componentDidMount = function () {
            var _this = this;
            _super.prototype.componentDidMount.call(this);
            this.root.hover(function () {
                _this.root.find('.actions').fadeIn();
            }, function () {
                _this.root.find('.actions').fadeOut();
            });
            this.root.find('.btn-remove').click(function () {
                _this.props.owner.on_img_remove(_.result(_this.props.img_obj, 'objectId'));
            });
        };
        return ImageThumbnail;
    }(jx.Views.ReactView));
    exports.ImageThumbnail = ImageThumbnail;
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/lib/image_explorer.js.map