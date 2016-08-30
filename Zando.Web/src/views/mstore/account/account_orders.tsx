// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');
import base = require('../lib/app_page');
import prof = require('./account_profile');
import cartlist = require('../cart/cart_itemlist');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../../lib/controls';
import old_prof = require('../../account/account_profile');


export class AccountOrdersView extends base.BasePage {

    get_pagecontent() {

        return <InternalView />
    }


    componentDidMount() {

        super.componentDidMount();


        $.getScript('/mstore/js/mimity.js', () => {

            jx.carts.display_cart(false);

            $('.navigation > li').removeClass('active');

            $('.li-orders').removeClass('hidden')

            $('.li-orders').addClass('active');
        });
    }

}


class InternalView extends jx.Views.ReactView {

    render() {

        var html =
            <div>

                <div className="col-md-9">

                    <AccountOrdersList owner={this} />
                   
                </div>
                
                <cartlist.NewArrivals col="col-md-3" />

            </div>

        return html;
    }    
}




interface AccountOrdersListState extends jx.Views.ReactState {
}
interface AccountOrdersListProps extends jx.Views.ReactProps {
}
class AccountOrdersList extends jx.Views.ReactView {

    props: AccountOrdersListProps;
    state: AccountOrdersListState;
    data: any[];

    constructor(props: AccountOrdersListProps) {
        super(props);
        this.state.loading = true;
    }


    render() {

        var html =
            <div>
                <div className={"table-responsive" } style={{ minHeight:300 }}>
                    <table className="table"/>
                </div>  
            </div>

        return html;
    }


    componentDidMount() {

        super.componentDidMount();
        this.forceUpdate();
    }


    componentDidUpdate() {

        super.componentDidUpdate();

        if (this.state.loading) {

            utils.spin(this.root);

            this.load_data()
                .then(() => {
                    this.internal_init_datatable();
                })
                .finally(() => {

                    utils.unspin(this.root);

                });

        }
    }


    load_data(): Q.Promise<any> {

        var d = Q.defer();

        var id = this.app.get_account()['id'];

        schema.call({
            fn: 'get',
            params: ['/orders', {
                where: {
                    account_id: id
                },
                //sort: 'date_created desc'
            }]
        }).then(res => {

            this.data = res.response['results'];

            d.resolve(true);

        })

        return d.promise;

    }


    internal_init_datatable() {

        var that = this;

        if (this['table']) {
            this['table'].destroy();
        }


        this['table'] = this.root.find('table').DataTable({

            data: this.data,

            //lengthChange: false,

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
                title: 'No', data: 'number', width: '10%', createdCell: (cell, data) => {
                    $(cell).empty();
                    $(cell).append($('<a href="#" class="text-info">{0}</a>'.format(data)));
                }
            },
            {
                title: 'Date', data: 'date_created', width: '15%', createdCell: (cell, data) => {
                    $(cell).empty();
                    var date = moment(data);
                    $(cell).html(date.format('ll')).css('text-transform', 'none');
                }
            },
            {
                title: 'Items', data: 'item_quantity', width: '10%'
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
                    $(cell).append($('<a href="javascript:void(0)" class="btn btn-default">View</a>'));

                    $(cell).find('.btn').click((e) => {

                        //this.open_order($(e.currentTarget).closest('tr').attr('data-rowid'))
                    });
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
}