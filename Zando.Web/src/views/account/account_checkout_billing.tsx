// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';


interface AccountCheckoutBillingState extends jx.Views.ReactState {
    selected_billing_address_id: string
    selected_shipping_address_id: string
}

export interface AccountCheckoutBillingProps extends jx.Views.ReactProps {
    
}


export class AccountCheckoutBilling extends jx.Views.ReactView {

    props: AccountCheckoutBillingProps;
    state: AccountCheckoutBillingState;

    item: any;
    billing_address: any;
    shipping_address: any;

    constructor(props: AccountCheckoutBillingProps) {
        super(props);
        this.state.loading = true;
    }


    render() {
        var html =
            <div >

                <div className="col-xs-12">
                    <div className="page-header">
                        <h4>Billing information</h4>
                    </div>
                    {this.fill_with_controls()}
                </div>


            </div>;

        return html;
    }


    fill_with_controls() {

        if (!this.state.loading) {

            var obj = this.app.get_account();

            var html = [

                <TextControl label="First Name" field="first_name" obj={obj} />,
                <TextControl label="Last Name" field="last_name" obj={obj} />
            ];


            return html;

        }
    }


    componentDidMount() {

        super.componentDidMount();

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState({
                    loading:false
                });

                //this.bind_data(this.root.find('.billing-content'), this.billing_address);
                //this.bind_data(this.root.find('.shipping-content'), this.shipping_address);
            });
        }
    }


    componentDidUpdate() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState({
                    loading: false
                });

                //this.bind_data(this.root.find('.billing-content'), this.billing_address);
                //this.bind_data(this.root.find('.shipping-content'), this.shipping_address);
            });
        }
    }


    //select_billing_addr() {

    //    var _modal: IModalDialog = (this.refs['modal'] as any) as IModalDialog;

    //    _modal.onSave = () => {

    //        var $sel = $('.modal').find('[type="checkbox"].selected');

    //        var address_id = $sel.closest('tr').attr('data-rowid');

    //        this.setState(_.extend(this.state, {
    //            loading: true,
    //            selected_address_id: address_id
    //        }));


    //        return Q.resolve(true);
    //    };

    //    (this.refs['modal'] as Modal).show(<AccountAddressList owner={this} select={true} />);
    //}


    //select_shipping_adr() {

    //    var _modal: IModalDialog = (this.refs['modal'] as any) as IModalDialog;

    //    _modal.onSave = () => {

    //        var $sel = $('.modal').find('[type="checkbox"].selected');

    //        var address_id = $sel.closest('tr').attr('data-rowid');

    //        this.setState(_.extend(this.state, {
    //            loading: true,
    //            selected_shipping_address_id: address_id
    //        }));


    //        return Q.resolve(true);
    //    };

    //    (this.refs['modal'] as Modal).show(<AccountAddressList owner={this} select={true} />);
    //}


    bind_data($root: JQuery, address: any) {

        _.each($root.find('.account'), el => {

            var field = $(el).attr('data-field');

            if (field) {
                $(el).val(_.result(this.item, field));
                $(el).text(_.result(this.item, field));
            }
        });


        _.each($root.find('.address'), el => {

            var field = $(el).attr('data-field');

            if (field) {

                switch (field) {

                    case 'country':
                        {
                            var country = window['BFHCountriesList'][_.result(address, field)]
                            $(el).val(country);
                            $(el).text(country);
                        } break;
                    default:
                        $(el).val(_.result(address, field));
                        $(el).text(_.result(address, field));
                        break;
                }
            }
        });

    }


    load_data() {

        var that = this;

        var d = Q.defer();

        var id = this.app.get_account()['id']

        utils.spin(this.root);

        schema.call({
            fn: 'get',
            params: ['/accounts/{0}'.format(id), { expand: 'addresses' }]
        }).then(res => {

            this.item = res.response;

            if (res.response['addresses'].results && res.response['addresses'].results.length > 0) {

                that.billing_address = that.shipping_address = res.response['addresses'].results[0];

                if (this.state.selected_billing_address_id) {

                    that.billing_address = _.find(res.response['addresses'].results, addr => {
                        return addr['id'] === this.state.selected_billing_address_id
                    });

                    this.state.selected_billing_address_id = null;
                }


                if (this.state.selected_shipping_address_id) {

                    that.shipping_address = _.find(res.response['addresses'].results, addr => {
                        return addr['id'] === this.state.selected_shipping_address_id
                    });

                    this.state.selected_shipping_address_id = null;
                }

                that.props.owner['data']['billing_address'] = that.billing_address;
                that.props.owner['data']['shipping_address'] = that.shipping_address;

                if (that.props.owner['onAddressChange']) {
                    that.props.owner['onAddressChange']();
                }
            }
            
            d.resolve(true);

        }).finally(() => {
            utils.unspin(this.root);
        });

        return d.promise;
    }
}




interface TextControlProps extends jx.Views.ReactProps {
    label: string,
    obj: any,
    field: string
}
class TextControl extends jx.Views.ReactView {

    props: TextControlProps;

    render() {

        var html =
            <div className="form-group col-sm-6 col-xs-12">
                <label htmlFor="">{this.props.label}</label>
                <input type="text" className="form-control" id=""/>
            </div>


        return html;
    }

    componentDidMount() {
        this.root.find('input').val(_.result(this.props.obj, this.props.field));
    }

    componentDidUpdate() {
        this.root.find('input').val(_.result(this.props.obj, this.props.field));
    }
}