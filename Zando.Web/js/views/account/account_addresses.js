/// <reference path="../../lib/controls.tsx" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', '../../lib/jx', 'react-bootstrap', '../../lib/controls'], function (require, exports, React, ReactDOM, jx, ReactB, controls_1) {
    "use strict";
    var b = ReactB;
    var AccountAddressesPage = (function (_super) {
        __extends(AccountAddressesPage, _super);
        function AccountAddressesPage(props) {
            _super.call(this, props);
            this.state.loading = true;
            this.editform_opened = false;
        }
        AccountAddressesPage.prototype.render = function () {
            var that = this;
            var html = React.createElement("div", {className: "orderBox myAddress commentsForm"}, React.createElement("h4", {style: { display: 'inline-block' }}, "My Address"), React.createElement("button", {type: "button", onClick: function () { that.add_address(); }, className: "btn btn-primary pull-right"}, "Add new "), React.createElement("hr", null), React.createElement("div", {className: "edit-placeholder"}), React.createElement("div", {className: "table-responsive"}, React.createElement("table", {className: "table"})));
            return html;
        };
        AccountAddressesPage.prototype.componentDidMount = function () {
            var _this = this;
            if (this.state.loading) {
                this.load_data().then(function () {
                    _this.state.loading = false;
                    _this.init_datatable();
                });
            }
        };
        AccountAddressesPage.prototype.componentDidUpdate = function () {
            this.state.loading = false;
            this.init_datatable();
        };
        AccountAddressesPage.prototype.init_datatable = function () {
            var _this = this;
            var that = this;
            if (this['table']) {
                this['table'].destroy();
            }
            this['table'] = this.root.find('table').DataTable({
                data: this.data,
                lengthChange: false,
                searching: false,
                createdRow: function (row, data, dataIndex) {
                    $(row).attr('data-rowid', data['id']);
                },
                initComplete: function () {
                    _this.root.find('table').find('th').css('height', '40px');
                    _this.root.find('table tbody').find('tr').css('height', '55px');
                },
                columns: this.init_columns()
            });
        };
        AccountAddressesPage.prototype.init_columns = function () {
            var _this = this;
            var cols = [
                {
                    title: 'Adresse', data: 'address1'
                },
                {
                    title: 'Ville', data: 'city'
                },
                {
                    title: 'Phone', data: null, createdCell: function (cell, data) {
                        $(cell).empty();
                        if (data['address2']) {
                            $(cell).html(data['address2']);
                        }
                    }
                },
                {
                    title: 'Pays', data: null, createdCell: function (cell, cellData) {
                        _this.resolve_country(cell, cellData);
                    }
                }
            ];
            if (this.props.select) {
                var that = this;
                cols.unshift({
                    title: 'Select', data: null, createdCell: function (cell, cellData) {
                        $(cell).empty();
                        var label = $('<label></label>').appendTo($(cell));
                        var input = $('<input type="checkbox" />').appendTo(label);
                        iCheck.icheck({
                            $el: input,
                            onChecked: function (e) {
                                var $el = $(e.currentTarget);
                                that.root.find('table [type="checkbox"]').removeClass('selected');
                                $el.addClass('selected');
                                that.root.find('table [type="checkbox"]').not('.selected')['iCheck']('Uncheck');
                                //$el['iCheck']('Check');
                            }
                        });
                    }
                });
            }
            else {
                cols.push({
                    title: '', width: '15%', data: null, createdCell: function (cell, cellData) {
                        $(cell).empty();
                        var btn_edit = $('<button type="button" class="btn btn-default"><i class="fa fa-pencil" ></i></button>').appendTo($(cell));
                        var btn_delete = $('<button type="button" class="btn btn-default"><i class="fa fa-times" ></i></button>').appendTo($(cell));
                        $(btn_edit).click(function () {
                            _this.edit_address($(btn_edit).closest('tr').attr('data-rowid'));
                        });
                        $(btn_delete).click(function () {
                            utils.can_delete().then(function () {
                                _this.delete_address($(btn_edit).closest('tr').attr('data-rowid')).then(function () {
                                    _this.notify('update-list');
                                });
                            });
                        });
                    }
                });
            }
            return cols;
        };
        AccountAddressesPage.prototype.delete_address = function (address_id) {
            var _this = this;
            utils.spin(this.root);
            var acc_id = this.app.get_account()['id'];
            var d = Q.defer();
            schema.call({
                fn: 'delete',
                params: ['/accounts/{0}/addresses/{1}'.format(acc_id, address_id)]
            }).then(function (res) {
                d.resolve(true);
            }).fail(function (err) {
                toastr.error(err);
            }).finally(function () {
                utils.unspin(_this.root);
            });
            return d.promise;
        };
        AccountAddressesPage.prototype.resolve_country = function (cell, data) {
            $(cell).empty();
            var country = window['BFHCountriesList'][data.country];
            var html = React.createElement("div", null, React.createElement("h5", {className: "text-muted"}, React.createElement("span", null, country)));
            ReactDOM.render(html, $(cell)[0]);
        };
        AccountAddressesPage.prototype.load_data = function () {
            var _this = this;
            var that = this;
            var d = Q.defer();
            var id = this.app.get_account()['id'];
            utils.spin(this.root);
            schema.call({
                fn: 'get',
                params: ['/accounts/{0}'.format(id), { expand: 'addresses' }]
            }).then(function (res) {
                that.data = res.response['addresses'].results;
                d.resolve(true);
            }).finally(function () {
                utils.unspin(_this.root);
            });
            return d.promise;
        };
        AccountAddressesPage.prototype.add_address = function () {
            ReactDOM.unmountComponentAtNode(this.root.find('.edit-placeholder')[0]);
            ReactDOM.render(React.createElement(EditAddress, {slidedown: !this.editform_opened, owner: this}), this.root.find('.edit-placeholder')[0]);
        };
        AccountAddressesPage.prototype.edit_address = function (rowid) {
            var adr = _.find(this.data, function (d) {
                return d['id'] === rowid;
            });
            //this.scrollToObj('body', 0, 1000);
            ReactDOM.unmountComponentAtNode(this.root.find('.edit-placeholder')[0]);
            ReactDOM.render(React.createElement(EditAddress, {adr: adr, owner: this, slidedown: !this.editform_opened}), this.root.find('.edit-placeholder')[0]);
        };
        AccountAddressesPage.prototype.scrollToObj = function (target, offset, time) {
            $('html, body').animate({ scrollTop: $(target).offset().top - offset }, time);
        };
        AccountAddressesPage.prototype.notify = function (cmd, data) {
            var _this = this;
            switch (cmd) {
                case 'update-list':
                    {
                        this.load_data().then(function () {
                            _this.init_datatable();
                        });
                    }
                    break;
            }
            return Q.resolve(true);
        };
        return AccountAddressesPage;
    }(jx.Views.ReactView));
    exports.AccountAddressesPage = AccountAddressesPage;
    var EditAddress = (function (_super) {
        __extends(EditAddress, _super);
        function EditAddress(props) {
            _super.call(this, props);
        }
        EditAddress.prototype.render = function () {
            var _this = this;
            var __display = {};
            if (this.props.slidedown) {
                __display['display'] = 'none';
            }
            var html = React.createElement("div", {className: "row cartListInner", style: __display}, React.createElement("div", {className: "col-lg-12 updateArea", style: { border: 'none!important' }}, React.createElement(controls_1.BigLabel, {label: "Edit address"}), React.createElement("form", null, React.createElement(b.FormGroup, {controlId: "txtAddress", className: "col-lg-6 col-sm-12"}, React.createElement(b.ControlLabel, null, "Address"), React.createElement(b.FormControl, {type: "text", "data-bind": "textInput:address1", placeholder: "Enter an address"})), React.createElement(b.FormGroup, {controlId: "txtPhone", className: "col-lg-6 col-sm-12"}, React.createElement(b.ControlLabel, null, "Phone"), React.createElement(b.FormControl, {type: "phone", "data-bind": "textInput:address2", placeholder: "Enter an phone number"})), React.createElement(b.FormGroup, {controlId: "txtCity", className: "col-lg-6 col-sm-12"}, React.createElement(b.ControlLabel, null, "Ville"), React.createElement(b.FormControl, {type: "text", "data-bind": "textInput:city", placeholder: "Enter an address"})), React.createElement(b.FormGroup, {controlId: "txtCountry", className: "col-lg-6 col-sm-12"}, React.createElement(b.ControlLabel, null, "Pays"), React.createElement("select", {id: "countries", type: "text", className: "form-control bfh-countries"}))), React.createElement("a", {href: "#", className: "btn pull-right", onClick: function () { _this.slide_up(); }, style: { marginLeft: 10 }}, "Close"), React.createElement("a", {href: "#", className: "btn pull-right", onClick: function () { _this.save(); }}, "Save"), React.createElement("br", null)));
            return html;
        };
        EditAddress.prototype.componentDidMount = function () {
            this.root.find('.bfh-countries')['bfhcountries']();
            this.bind_controls();
            if (this.props.slidedown) {
                this.props.owner['editform_opened'] = true;
                this.root.slideDown();
            }
        };
        EditAddress.prototype.componentDidUpdate = function () {
            this.bind_controls();
            if (this.props.slidedown) {
                this.props.owner['editform_opened'] = true;
                this.root.slideDown();
            }
        };
        EditAddress.prototype.bind_controls = function () {
            ko.cleanNode(this.root.find('form')[0]);
            if (this.props.adr) {
                this.root.find('.bfh-countries').val(this.props.adr['country']);
                ko.applyBindings(this.props.adr, this.root.find('form')[0]);
            }
        };
        EditAddress.prototype.slide_up = function () {
            this.props.owner['editform_opened'] = false;
            this.root.slideUp();
        };
        EditAddress.prototype.save = function () {
            if (this.props.adr) {
                return this.internal_save('put');
            }
            else {
                return this.internal_save('post');
            }
        };
        EditAddress.prototype.internal_save = function (method) {
            var _this = this;
            var d = Q.defer();
            utils.spin(this.root);
            var country = this.root.find('.bfh-countries').val();
            var city = this.root.find('#txtCity').val();
            var address = this.root.find('#txtAddress').val();
            var phone = this.root.find('#txtPhone').val();
            if (!country || !city || !address) {
                toastr.error('Vous devez saisir un pays, une ville et une adresse (rue, numero, code postal)');
                utils.unspin(this.root);
                return Q['reject'](false);
            }
            var account_id = this.app.get_account()['id'];
            var obj = {
                address1: address,
                address2: phone,
                city: city,
                country: country
            };
            var params = ['/accounts/{0}/addresses/'.format(account_id), obj];
            if (this.props.adr) {
                params = ['/accounts/{0}/addresses/{1}'.format(account_id, this.props.adr['id']), obj];
            }
            schema.call({
                fn: method,
                params: params
            }).then(function (res) {
                _this.props.owner.notify('update-list');
                d.resolve(res.response);
            }).fail(function (err) {
                toastr.error(err['message']);
                d.reject(false);
            }).finally(function () {
                utils.unspin(_this.root);
            });
            return d.promise;
        };
        return EditAddress;
    }(jx.Views.ReactView));
});
//# sourceMappingURL=C:/afriknet/Zando.Web/Zando.Web/js/views/account/account_addresses.js.map