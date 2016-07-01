// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, CheckBox} from '../../lib/controls';

declare var chance;


export interface AccountCheckoutShipmentsProps extends jx.Views.ReactProps {
    index: number
}
export class AccountCheckoutShipments extends jx.Views.ReactView {

    props: AccountCheckoutShipmentsProps;
    services: any[];


    constructor(props: AccountCheckoutShipmentsProps) {

        super(props);

        this.state.loading = true;

        this.props.owner['pages'].push({
            index: this.props.index, 
            view: this
        });
    }

    get account(): any {        
        return this.props.owner['data'];
    }


    render() {
        var html =
            <div className=" animated fadeInUp">

                <div className="col-xs-12 no-p">
                    <div className="page-header">
                        <h4>Shipments</h4>  
                        <h2 style={{ textTransform: 'none' }}><small>Select a shipping method</small></h2>                      
                     </div>                    
                </div>

                <br/>

                <div className="orderBox">

                    <div className="table-responsive">

                        <table className="table">

                            
                        </table>

                    </div>

                </div>

            </div>;

        return html;
    }


    componentDidMount() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState({
                    loading: false
                });
            });
        }
    }


    componentDidUpdate() {

        if (!this.state.loading) {

            if (this['data']) {
                (this['data'] as DataTables.DataTable).destroy();
            }

            this['data'] = this.root.find('table').DataTable({
                data: this.services,
                lengthChange: false,
                searching: false,

                createdRow: (row: Node, data: any) => {
                    $(row).attr('data-rowid', data['id']);
                },

                columns: [
                    {
                        title: '', data: null, createdCell: (cell, data) => {
                            $(cell).empty();
                            ReactDOM.render(<CheckBox is_checked={false} onchecked={(row) => { this.on_checked(row) } } />, $(cell)[0]);
                        }
                    },
                    {
                        title: 'Service', data: 'name', createdCell: (cell, data) => {
                            $(cell).empty();
                            $(cell).append($('<span style="color:gray!important; font-size:18px!important">{0}</span>'.format(data)));
                        }
                    },

                    {
                        title: 'Price', data: 'price', createdCell: (cell, data) => {                            
                            $(cell).empty();
                            var span = $('<span style="color:gray!important; font-size:18px!important">{0}</span>'.format(data)).appendTo($(cell));                            
                            (span as any).autoNumeric('init', { aSign:'€'});
                        }
                    },

                    {
                        title: 'Price type', data: 'price_type', createdCell: (cell, data) => {
                            $(cell).empty();
                            $(cell).css('text-align', 'left');
                            $(cell).append($('<span style="color:gray!important; font-size:18px!important">{0}</span>'.format(data)));
                        }
                    }
                    
                ]

            });

        }
    }


    on_checked(row: JQuery) {

        this.root.find('table [type="checkbox"]')['iCheck']('Uncheck');

        $(row).find('[type="checkbox"]')['iCheck']('check');

        var service_id = $(row).attr('data-rowid');

        this.jget('table').attr('data-service_id', service_id);
    }
    

    load_data() {

        var d = Q.defer();

        utils.spin(this.root);

        schema.call({
            fn: 'get',
            params: ['/settings/shipments']
        }).then(res => {

            this.services = _.filter(res.response['services'], (srv:any) => {
                return srv.price != undefined;
            });

            
            d.resolve(true);

            }).finally(() => {
                utils.unspin(this.root);
        });


        return d.promise;
    }


    can_go_next(): Q.Promise<boolean> {

        var has_selection = _.find(this.root.find('table [type="checkbox"]'), p => {
            return $(p).prop("checked") === true;
        }) != undefined;

        if (has_selection) {

            return this.update_cart();

        } else {

            toastr.error('You must select one shipment method', null, {
                "positionClass": "toast-bottom-full-width"
            });

            return Q.reject(false) as any;
        }
        
    }


    update_cart(): Q.Promise<boolean> {

        var d = Q.defer<boolean>();

        utils.spin(this.root);

        var srv_id = this.jget('table').attr('data-service_id');

        var srv_obj = _.find(this.services, srv => {
            return srv['id'] === srv_id;
        });


        schema.call({
            fn: 'put',
            params: ['/carts/{0}'.format(this.props.owner['cart']['id']), {
                
                shipping: {

                    account_address_id: this.props.owner['address']['id'],

                    address1: this.props.owner['address']['address1'],
                    city: this.props.owner['address']['city'],
                    country: this.props.owner['address']['country'],
                    name: 'shipment-address-{0}'.format(this.app.get_account()['id']),
                    phone: this.props.owner['address']['address2'],

                    service: srv_id,
                    service_name: srv_obj['name']
                }
            }]
        }).then(() => {

            d.resolve(true);

        }).fail(() => {

            d.reject(false);

        }).finally(() => {

            utils.unspin(this.root);
        });


        return d.promise;

    }
}