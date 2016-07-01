
/// <reference path="account_home.tsx" />
/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
/// <reference path="account_addresses.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';

declare var numeral;

export class AccountCart extends jx.Views.ReactView {

    cart: any;
    products: any[];

    constructor(props?: any) {
        super(props);
        this.state.loading = true;
    }


    render() {


        var html =

            <div className="animated fadeInUp" style={{ color: 'gray' }}>

                <BigLabel label="Cart items" />
            
                <hr />

                <div className="row">

                    <div className="col-xs-12">

                        <div className="cartListInner">

                            <div className="table-responsive">

                                    <table className="table" style={{ fontSize:18 }} >

                                    </table>

                            </div>

                            <br />

                        </div>

                    </div>

                    <div className="cartListInner">

                        <div className="col-xs-12 totalAmountArea" style={{ border: 'none', fontSize:18 }}>

                            <hr />

                            <div className="col-sm-4 col-sm-offset-8 col-xs-12">
                                <ul className="list-unstyled">
                                    <li>Sub Total <span data-curr="sub_total"></span></li>
                                    <li className="hidden">Taxes <span data-curr="tax_included_total"></span></li>
                                    <li>Shipment <span data-curr="shipment_total"></span></li>
                                    <li className="">Discount <span data-curr="discount_total"></span></li>                                    
                                    <li>Total <span data-curr="grand_total" className="grandTotal"></span></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    
                </div>

            </div>

        return html;
    }


    value(field: string) {

        //if (!this.cart) {
        //    return null;
        //}

        //return numeral(this.cart[field]).format('€0,0.00')

    }


    componentDidMount() {

        super.componentDidMount();

        if (this.state.loading) {

            this.load_items().then(() => {

                this.setState({
                    loading: false
                });
                
            });
        }        
    }


    currencyfy() {

        var that = this;

        this.jget('[data-curr]').each((i, el) => {

            $(el)['autoNumeric']('init',{ 'aSign': '€' });

            var field = $(el).attr('data-curr');

            $(el)['autoNumeric']('set', that.cart[field]);

        });
    }
    

    componentDidUpdate() {

        if (this.state.loading) {

            this.load_items().then(() => {

                this.setState({
                    loading: false
                });
                
            });

        } else {

            this.state.loading = false;

            this.currencyfy();

            this.init_datatable();
        }

    }


    load_items() {

        var d = Q.defer();

        utils.spin(this.root);

        this.fetch_carts().finally(() => {

            utils.unspin(this.root);
            
            d.resolve(true);
        });

        return d.promise;
    }


    fetch_items_of_carts() {

        var d = Q.defer();


        var item_ids = [];


        _.each(this.cart['items'], (item: any) => {
            item_ids.push(item.product_id);
        });


        schema.call({
            fn: 'get',
            params: ['/products', { 'id': { $in: item_ids } }]
        }).then(res => {

            this.products = [];

            if (res.response && res.response.results) {
                this.products = res.response.results;
            }

            d.resolve(true);

        }).fail(err => {

            d.reject(false);
        });

        return d.promise;
    }


    fetch_carts() {

        var d = Q.defer();

        var id = this.app.get_account()['id'];

        schema.call({
            fn: 'get',
            params: ['/carts', {
                where: {
                    account_id: id,
                    status: 'active'
                    //processed: false
                }
            }]
        }).then(res => {
            
            if (res.response && res.response.results) {
                this.cart = res.response.results[0];
            }

            this.fetch_items_of_carts().finally(() => {

                d.resolve(true);
            });

        });

        return d.promise;
    }


    init_datatable() {

        var that = this;

        if (this['table']) {
            this['table'].destroy();
        }


        this['table'] = this.root.find('table').DataTable({

            data: this.cart['items'],

            lengthChange: false,

            searching: false,

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

        var that = this;

        var cols: DataTables.ColumnSettings[] = [
            {
                title: '', data: null, width: '10%', createdCell: (cell: Node, data: any) => {

                    $(cell).empty();

                    var prod = _.find(this.products, p => {
                        return p['id'] === data['product_id']
                    });


                    var img = null;

                    if (prod.images && prod.images.length > 0) {

                        var url = prod.images[0].file.url;

                        $(cell).append($('<div class="cartImage" style="width:100%"><img class="responsive-img" src="{0}" style="width:100%" alt="image"></img></div>'.format(url)));


                    } else {
                        // add empty image
                        //img = <span className="cartImage"></span>;
                    }

                    //ReactDOM.render(img, $(cell)[0]);
                }
            },
            {
                title: 'Product', data: null, createdCell: (cell: Node, data: any) => {

                    $(cell).empty();

                    var prod = _.find(this.products, p => {
                        return p['id'] === data['product_id']
                    });

                    $(cell).html(prod.name);
                }
            },
            {
                title: 'Unit price', data: null, createdCell: (cell: Node, data: any) => {

                    $(cell).empty();

                    var prod = _.find(this.products, p => {
                        return p['id'] === data['product_id']
                    });

                    $(cell).append($('<span>{0}</span>'.format(prod.price)));

                    $(cell).find('span')['autoNumeric']('init');//, { 'aSign': '€' }
                    
                    $(cell).find('span')['autoNumeric']('set', prod.price);

                }
            },
            {
                title: 'Quantity', data: 'quantity'
            },

            {
                title: 'Total', data: 'price_total', createdCell: (cell: Node, data: any) => {

                    $(cell).empty();

                    $(cell).append($('<span></span>'));

                    $(cell).find('span')['autoNumeric']('init');//, { 'aSign': '€' }

                    $(cell).find('span')['autoNumeric']('set', data);
                }
            }
        ];

        return cols;
    }
    
}
