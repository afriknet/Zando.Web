/// <reference path="jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', './jx'], function (require, exports, React, jx) {
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader(props) {
            _super.call(this, props);
            this.files = [];
        }
        ImageLoader.prototype.render = function () {
            var html = React.createElement("div", {"className": "row"}, React.createElement("div", {"className": "col-lg-12"}, React.createElement("form", {"action": "hn_fileupload.ashx", "name": "upload-file", "className": "dropzone", "id": "dropzone"})));
            return html;
        };
        ImageLoader.prototype.componentDidMount = function () {
            _super.prototype.componentDidMount.call(this);
            var __url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            __url = '{0}/hn_fileupload.ashx'.format(__url);
            Dropzone.autoDiscover = false;
            var $drop = this.root.find('.dropzone');
            var that = this;
            this.dropzone = $drop.dropzone({
                withCredentials: true,
                url: __url,
                init: function () {
                    this.on('addedfile', function (file) {
                        that.add_file(file);
                    });
                    this.on('success', function (file) {
                        file['previewElement'].classList.add("dz-success");
                        that.file_uploaded(file);
                    });
                    this.on('canceled', function (files) {
                    });
                    this.on('complete', function (args) {
                    });
                }
            });
        };
        ImageLoader.prototype.add_file = function (file) {
            var files = this.files;
            var found = _.find(files, function (f) {
                return f.name === file.name;
            }) != undefined;
            if (!found) {
                var _file = {
                    name: file.name,
                    size: file.size,
                    type: file.type
                };
                this.files.push(_file);
                if (this.props.on_file_added) {
                    this.props.on_file_added(_file);
                }
            }
        };
        ImageLoader.prototype.file_uploaded = function (file) {
            var files = this.files;
            var f = _.find(files, function (fl) {
                return fl.name === file.name;
            });
            f.status = true;
        };
        return ImageLoader;
    })(jx.Views.ReactView);
    exports.ImageLoader = ImageLoader;
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/lib/imageload.js.map