/// <reference path="../../lib/controls.tsx" />

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import ReactB = require('react-bootstrap');
var b: any = ReactB;

import { BigLabel, BigLabelProps} from '../../lib/controls';


interface AccountOrdersPageState extends jx.Views.ReactState {
}
export interface AccountOrdersPageProps extends jx.Views.ReactProps {
    select?: boolean,
}
export class AccountOrdersPage extends jx.Views.ReactView {

    props: AccountOrdersPageProps;
    state: AccountOrdersPageState;
    data: any[];
    editform_opened: boolean;

    constructor(props?: AccountOrdersPageProps) {
        super(props);
        this.state.loading = true;
        this.editform_opened = false;
    }


    render() {

        var that = this;

        var html =
            <div className="orderBox animated fadeInUp">

                <BigLabel label="My orders" />
                
                <hr/>

                <div className="edit-placeholder"/>
                    
                <div className="table-responsive">
                        <table className="table" style={{ fontSize:15 }}/>
                    </div>

                </div>

        return html;
    }


    componentDidMount() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.state.loading = false;

                this.init_datatable();

            });
        }
    }


    componentDidUpdate() {

        this.state.loading = false;

        this.init_datatable();
    }


    init_datatable() {

        var that = this;

        if (this['table']) {
            this['table'].destroy();
        }


        this['table'] = this.root.find('table').DataTable({

            data: this.data,

            lengthChange: false,
            
            createdRow: (row: Node, data: any[] | Object, dataIndex: number) => {
                $(row).attr('data-rowid', data['id']);
            },

            initComplete: () => {
                this.root.find('table').find('th').css('height', '40px');
                this.root.find('table tbody').find('tr').css('height', '55px');
            },

            columns: this.init_columns()

        }) as any;
    }


    init_columns(): DataTables.ColumnSettings[] {

        var cols: DataTables.ColumnSettings[] = [
            {
                title: 'No', data: 'number', width:'10%'
            },
            {
                title: 'Date', data: 'date_created', width:'15%', createdCell: (cell, data) => {
                    $(cell).empty();
                    var date = moment(data);
                    $(cell).html(date.format('ll')).css('text-transform', 'none');
                }        
            },
            {
                title: 'Items', data: 'item_quantity', width:'10%'
            },
            {
                title: 'Total price', data: 'grand_total', createdCell: (cell, price) => {

                    $(cell).empty();

                    $(cell).append($('<span>{0}</span>'.format(price)));

                    $(cell).find('span')['autoNumeric']('init', { 'aSign': '€ ' });//, { 'aSign': '€' }
                    
                    $(cell).find('span')['autoNumeric']('set', price);
                }
            },
            {
                title: 'Status', data: 'status', createdCell: (cell, status) => {

                    $(cell).empty();

                    $(cell).append($('<span class="label {0}">{1}</span>'.format(this.resolve_status(status), status.toLowerCase())));
                    
                }
            },
            {
                title: '', data: null, createdCell: (cell) => {
                    $(cell).empty();
                    $(cell).append($('<a href="#" class="btn btn-default">View</a>'));
                }
            }
        ];

        
        return cols;
    }


    resolve_status(status: string) {

        switch (status.toLowerCase()) {

            case 'draft':
            case 'hold':
                return 'label-info';
            
            case 'pending':
            case 'payment_pending':
            case 'delivery_pending':
                return 'label-warning';

            case 'completed':
                return 'label-success';

            case 'canceled':
                return 'label-danger';
            
            default:
                return 'label-info';
        }
    }


    delete_address(address_id: string) {

        utils.spin(this.root);

        var acc_id = this.app.get_account()['id'];

        var d = Q.defer();

        schema.call({
            fn: 'delete',
            params: ['/accounts/{0}/addresses/{1}'.format(acc_id, address_id)]
        }).then(res => {

            d.resolve(true);

        }).fail(err => {
            toastr.error(err);
        }).finally(() => {
            utils.unspin(this.root);
        });

        return d.promise;
    }


    resolve_country(cell: Node, data: any) {

        $(cell).empty();

        var country = window['BFHCountriesList'][data.country];

        var html =
            <div>
                <h5 className="text-muted"><span>{country}</span></h5>
                </div>

        ReactDOM.render(html, $(cell)[0]);
    }


    load_data() {

        var that = this;

        var d = Q.defer();

        var id = this.app.get_account()['id']

        utils.spin(this.root);

        schema.call({
            fn: 'get',
            params: ['/orders', {
                where: {
                    account_id: id
                }
            }]
        }).then(res => {

            that.data = res.response['results'];

            d.resolve(true);

        }).finally(() => {
            utils.unspin(this.root);
        });

        return d.promise;
    }


    add_address() {

        ReactDOM.unmountComponentAtNode(this.root.find('.edit-placeholder')[0]);

        ReactDOM.render(<EditAddress slidedown={!this.editform_opened} owner={this} />, this.root.find('.edit-placeholder')[0]);

    }


    edit_address(rowid: string) {

        var adr = _.find(this.data, d => {
            return d['id'] === rowid;
        });

        //this.scrollToObj('body', 0, 1000);
        
        ReactDOM.unmountComponentAtNode(this.root.find('.edit-placeholder')[0]);

        ReactDOM.render(<EditAddress adr={adr} owner={this} slidedown={!this.editform_opened}/>, this.root.find('.edit-placeholder')[0]);

    }


    scrollToObj(target, offset, time) {
        $('html, body').animate({ scrollTop: $(target).offset().top - offset }, time);
    }


    notify(cmd: string, data?: any) {

        switch (cmd) {

            case 'update-list': {

                this.load_data().then(() => {

                    this.init_datatable();

                });

            } break;
        }

        return Q.resolve(true);
    }
}


interface EditAddressProps extends jx.Views.ReactProps {
    adr?: any,
    slidedown?: boolean
}
class EditAddress extends jx.Views.ReactView {

    props: EditAddressProps;

    constructor(props: EditAddressProps) {
        super(props);
    }

    render() {

        var __display = {
        }

        if (this.props.slidedown) {
            __display['display'] = 'none';
        }

        var html =

            <div className="row cartListInner" style={__display}>

                <div className="col-lg-12 updateArea" style={{ border: 'none!important' }}>

                    <BigLabel label="Edit address" />

                    <form>

                        <b.FormGroup controlId="txtAddress" className="col-lg-6 col-sm-12">
                            <b.ControlLabel>Address</b.ControlLabel>
                            <b.FormControl type="text" data-bind="textInput:address1" placeholder="Enter an address"/>
                            </b.FormGroup>

                        <b.FormGroup controlId="txtPhone" className="col-lg-6 col-sm-12">
                            <b.ControlLabel>Phone</b.ControlLabel>
                            <b.FormControl type="phone" data-bind="textInput:address2"  placeholder="Enter an phone number"/>
                            </b.FormGroup>

                        <b.FormGroup controlId="txtCity" className="col-lg-6 col-sm-12">
                            <b.ControlLabel>Ville</b.ControlLabel>
                            <b.FormControl type="text"  data-bind="textInput:city"  placeholder="Enter an address"/>
                            </b.FormGroup>

                        <b.FormGroup controlId="txtCountry" className="col-lg-6 col-sm-12">
                            <b.ControlLabel>Pays</b.ControlLabel>
                            <select  id="countries" type="text" className="form-control bfh-countries"/>
                            </b.FormGroup>

                        </form>

                    <a href="#" className="btn pull-right" onClick={() => { this.slide_up(); } } style={{ marginLeft: 10 }}>Close</a>
                    <a href="#" className="btn pull-right" onClick={() => { this.save(); } } >Save</a>

                    <br />

                    </div>

                </div>

        return html;
    }


    componentDidMount() {

        this.root.find('.bfh-countries')['bfhcountries']();

        this.bind_controls();

        if (this.props.slidedown) {

            this.props.owner['editform_opened'] = true;

            this.root.slideDown();
        }
    }

    componentDidUpdate() {

        this.bind_controls();

        if (this.props.slidedown) {

            this.props.owner['editform_opened'] = true;

            this.root.slideDown();
        }
    }


    bind_controls() {

        ko.cleanNode(this.root.find('form')[0]);

        if (this.props.adr) {

            this.root.find('.bfh-countries').val(this.props.adr['country']);

            ko.applyBindings(this.props.adr, this.root.find('form')[0]);
        }
    }


    slide_up() {

        this.props.owner['editform_opened'] = false;

        this.root.slideUp();
    }


    save(): Q.Promise<Boolean> {

        if (this.props.adr) {

            return this.internal_save('put');

        } else {

            return this.internal_save('post');
        }
    }


    internal_save(method: string) {

        var d = Q.defer<Boolean>();

        utils.spin(this.root);

        var country = this.root.find('.bfh-countries').val();
        var city = this.root.find('#txtCity').val();
        var address = this.root.find('#txtAddress').val();
        var phone = this.root.find('#txtPhone').val();

        if (!country || !city || !address) {

            toastr.error('Vous devez saisir un pays, une ville et une adresse (rue, numero, code postal)');

            utils.unspin(this.root);

            return Q['reject'](false) as any;
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
        }).then(res => {

            this.props.owner.notify('update-list');

            d.resolve(res.response as any);

        }).fail(err => {

            toastr.error(err['message'])

            d.reject(false);

        }).finally(() => {

            utils.unspin(this.root);

        });

        return d.promise;

    }

}
