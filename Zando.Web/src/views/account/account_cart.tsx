
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


export class AccountCart extends jx.Views.ReactView {

    cart: any;
    products: any[];

    constructor(props?: any) {
        super(props);
        this.state.loading = true;
    }


    render() {


        var html =
            <div>

                <BigLabel label="Cart items" />
            
                <hr />

                <div className="row">

                    <div className="col-xs-12">

                        <div className="cartListInner">

                            <form action="#">

                                <div className="table-responsive">

                                    <table className="table" >
                                        
                                    </table>

                                </div>

                            </form>

                            <br />

                        </div>

                    </div>
                </div>

            </div>

        return html;

    }


    componentDidMount() {

        super.componentDidMount();

        if (this.state.loading) {

            this.load_items().then(() => {

                this.state.loading = false;

                this.init_datatable();
                
            });
        }

        //lang.localize();
    }
    

    componentDidUpdate() {

        if (this.state.loading) {

            this.load_items().then(() => {

                this.state.loading = false;

                this.init_datatable();

            });

        } else {

            this.state.loading = false;

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

        var cols: DataTables.ColumnSettings[] = [
            {
                title: '', data: null, width:'10%', createdCell: (cell: Node, data: any) => {
                    
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
            }
        ];

        /*

        // 1. add image column if exists
        if (prod.images && prod.images.length > 0) {
            var url = prod.images[0].file.url;
            tds.push(<td className="col-xs-1"><img src={url} alt="" className="img-response" ></img></td>);
        } else {
            // add empty image
            tds.push(<td className="col-xs-1"></td>);
        }

        */

        //if (this.props.select) {

        //    var that = this;

        //    cols.unshift({
        //        title: 'Select', data: null, createdCell: (cell: Node, cellData: any) => {

        //            $(cell).empty();

        //            var label = $('<label></label>').appendTo($(cell));
        //            var input = $('<input type="checkbox" />').appendTo(label);

        //            iCheck.icheck({

        //                $el: input,

        //                onChecked: (e) => {

        //                    var $el = $(e.currentTarget);

        //                    that.root.find('table [type="checkbox"]').removeClass('selected');

        //                    $el.addClass('selected')

        //                    that.root.find('table [type="checkbox"]').not('.selected')['iCheck']('Uncheck');

        //                    //$el['iCheck']('Check');

        //                }
        //            })

        //        }
        //    });

        //} else {

        //    cols.push({
        //        title: '', width: '15%', data: null, createdCell: (cell: Node, cellData: any) => {

        //            $(cell).empty();

        //            var btn_edit = $('<button type="button" class="btn btn-default"><i class="fa fa-pencil" ></i></button>').appendTo($(cell));
        //            var btn_delete = $('<button type="button" class="btn btn-default"><i class="fa fa-times" ></i></button>').appendTo($(cell));

        //            $(btn_edit).click(() => {
        //                this.edit_address($(btn_edit).closest('tr').attr('data-rowid'));
        //            });

        //            $(btn_delete).click(() => {

        //                utils.can_delete().then(() => {

        //                    this.delete_address($(btn_edit).closest('tr').attr('data-rowid')).then(() => {

        //                        this.notify('update-list');
        //                    });

        //                });
        //            });

        //        }
        //    });
        //}

        return cols;
    }
    
}


/*
<thead>
    <tr>
        <th></th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Sub Total</th>
    </tr>
</thead>
<tbody>

    <tr>
        <td className="col-xs-2">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times; </span>
            </button>
            <span className="cartImage"><img src="/img/products/cart-image.jpg" alt="image"/></span>
        </td>
        <td className="col-xs-4">Italian Winter Hat</td>
        <td className="col-xs-2">$ 99.00</td>
        <td className="col-xs-2"><input type="text" placeholder="1"/></td>
        <td className="col-xs-2">$ 99.00</td>
    </tr>
    <tr>
        <td className="col-xs-2">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times; </span>
            </button>
            <span className="cartImage"><img src="/img/products/cart-image.jpg" alt="image"/></span>
        </td>
        <td className="col-xs-4">Italian Winter Hat</td>
        <td className="col-xs-2">$ 99.00</td>
        <td className="col-xs-2"><input type="text" placeholder="1"/></td>
        <td className="col-xs-2">$ 99.00</td>
    </tr>

</tbody>
*/