// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX



import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import { BigLabel, BigLabelProps} from '../../lib/controls';


interface AccountCheckoutBillingState extends jx.Views.ReactState {
}

export interface AccountCheckoutBillingProps extends jx.Views.ReactProps {
    
}


export class AccountCheckoutBilling extends jx.Views.ReactView {

    props: AccountCheckoutBillingProps;
    state: AccountCheckoutBillingState;

    item: any;
    private __account: any;

    get account(): any {
        if (!this.__account) {
            this.__account = this.props.owner['data'] = ko['mapping'].fromJS(this.item);
        }
        return this.__account;
    }

    private __address: any;
    get address(): any {

        if (!this.__address) {
            // temprary, this must be properly resolved
            this.__address = this.props.owner['address'] = ko['mapping'].fromJS(this.item['addresses'].results[0]);
        }
        return this.__address;
    }
    

    constructor(props: AccountCheckoutBillingProps) {
        super(props);
        this.state.loading = true;
    }


    render() {
        var html =
            <div >

                <div className="col-xs-12">
                    <div className="page-header">
                        <h4>Billing</h4>                        
                    </div>

                    {this.fill_with_controls()}
                </div>


            </div>;

        return html;
    }


    fill_with_controls() {

        if (!this.state.loading) {
                       

            var html = [

                <TextControl label="First Name" field="first_name" obj={this.account} />,
                <TextControl label="Last Name" field="last_name" obj={this.account} />,
                <TextControl label= "Email" type="email" field= "email" obj= { this.account } />,
                <TextControl label= "Telephone" field= "address2" obj= { this.address} />,

                <TextControl label= "Address" field= "address1" obj= { this.address} />,
                <TextControl label= "City" field= "city" obj= { this.address } />,

                <CountryControl label= "Country" field= "country" obj= { this.address }/>
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
            });
        }
    }


    componentDidUpdate() {

        if (this.state.loading) {

            this.load_data().then(() => {

                this.setState({
                    loading: false
                });                
            });
        }
    }


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

            this.item = that.props.owner['data'] = res.response;
            
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
    field: string,
    property?: string,
    type?: string
}
class TextControl extends jx.Views.ReactView {

    props: TextControlProps;

    render() {

        var property = this.props.property ? this.props.property :'textInput';
        
        var type = this.props.type ? this.props.type:'text';
        
        var html =
            <div className="form-group col-sm-6 col-xs-12">

                <label htmlFor="">{this.props.label}</label>

                <input type="text" data-bind={"{0}:{1}".format(property, this.props.field) }
                    className="form-control" id="" style={{ fontSize: 18 }}/>
            </div>


        return html;
    }

    componentDidMount() {

        this.bind();
    }

    componentDidUpdate() {

        this.bind();
    }


    bind() {

        ko.cleanNode(this.root[0]);
        ko.applyBindings(this.props.obj, this.root[0]);

    }
}



class CountryControl extends TextControl {


    render() {

        var html =
            <div className="form-group col-sm-6 col-xs-12">
                <label htmlFor="">{this.props.label}</label>
                <select  id="" type="text" className="form-control bfh-countries"/>
            </div>

        return html;
    }

    componentDidMount() {

        this.root.find('.bfh-countries')['bfhcountries']();

        var that = this;

        this.root.find('.bfh-countries').change(() => {
            that.props.obj['country'](this.root.find('.bfh-countries').val());            
        });

        this.bind();
    }
    

    bind() {

        if (this.props.obj['country']()) {
            this.root.find('.bfh-countries').val(this.props.obj['country']());
        }
    }

}