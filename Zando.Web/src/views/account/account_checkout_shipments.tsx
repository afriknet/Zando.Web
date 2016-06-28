// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps, CheckBox} from '../../lib/controls';




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
            <div >

                <div className="col-xs-12">
                    <div className="page-header">
                        <h4>Shipments</h4>                        
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
        return Q.resolve(true);
    }
}