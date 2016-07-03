/// <reference path="../../lib/controls.tsx" />

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');
import ReactB = require('react-bootstrap');
var b: any = ReactB;

import { BigLabel, BigLabelProps} from '../../lib/controls';


enum WorkflowState { Mounted, Idle, DataFetching, DataFetched, CardOpened }
enum WorkflowAction { FetchData, InitTable, OpenCard, CloseCard }

interface Workflow {
    state: WorkflowState,
    payload?: any
}

interface AccountOrdersPageState extends jx.Views.ReactState {    
    workflow_state?: WorkflowState,
    workflow_payload?: any 
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
        
        this.state = {
            workflow_state: WorkflowState.Idle
        };
    }


    exec_action(action: WorkflowAction, payload?:any): Q.Promise<any> {

        switch (action) {

            case WorkflowAction.FetchData: {
                return this.do_fetch_data()
            }

            case WorkflowAction.InitTable: {
                return this.do_init_table();
            }

            case WorkflowAction.OpenCard: {
                return this.open_card(payload);
            }
                
            default:
                return Q.resolve(true);
        }
    }


    private cloase_card() {

        return this.exec_action(WorkflowAction.FetchData);
        
    }


    private open_card(id:any) {

        this.set_workflow({
            state: WorkflowState.CardOpened,
            payload: {
                order_id: id
            }
        });

        return Q.resolve(true);

    }


    private do_fetch_data(): Q.Promise<any> {

        this.set_workflow({ state: WorkflowState.DataFetching });

        return this.load_data().then((data) => {

            return this.set_workflow({
                state: WorkflowState.DataFetched,
                payload: data
            });
        });
    }


    private do_init_table(): Q.Promise<any> {

        this.internal_init_datatable();

        this.reset_workflow({ state: WorkflowState.Idle });

        return Q.resolve(true);
    }


    set_workflow(next_workflow: Workflow): Workflow {
             
        this.setState(_.extend({}, this.state, {
            workflow_state: next_workflow.state,
            workflow_payload: next_workflow.payload
        } ));

        return next_workflow;
    }


    reset_workflow(workflow: Workflow) {

        _.extend(this.state, {
            workflow_state: workflow.state,
            workflow_payload: workflow.payload
        });
    }


    get_workflow(): Workflow {
        return {
            state: this.state.workflow_state,
            payload: this.state.workflow_payload
        } as Workflow;
    }
    


    render() {
        
        var html =
            <div className={"orderBox animated fadeInUp" }>

                <BigLabel label="My orders" />
                
                <hr/>

                {this.display_content() }
                
                
             </div>

        return html;
    }


    display_content() {

        switch (this.get_workflow().state) {

            case WorkflowState.Mounted: {
                
            } break;

            case WorkflowState.DataFetching: {

                return <div className="row" style={{ textAlign: 'right' }}>
                            <i className="fa fa-spin fa-spinner fa-2x"></i>
                       </div> 
            } 

            case WorkflowState.DataFetched: {

                var animate = null;

                if (this.state['re-animate']) {
                    animate = 'animated fadeInUp';
                    delete this.state['re-animate'];
                }

                return <div className={"table-responsive {0}".format(animate) }>
                            <table className="table" style={{ fontSize: 15 }}/>
                       </div>

            } 

            case WorkflowState.CardOpened: {

                return <ViewOrder owner={this} order_id={null} slidedown={false}  />               

            } 

        }
    }
    

    componentDidMount() {
        this.set_workflow({ state: WorkflowState.Mounted });        
    }


    componentDidUpdate() {

        switch (this.get_workflow().state) {
            
            case WorkflowState.Mounted: {
                this.exec_action(WorkflowAction.FetchData);
            } break;

            case WorkflowState.DataFetched: {
                this.exec_action(WorkflowAction.InitTable);                
            } break;
            
        }
        
    }


    internal_init_datatable() {

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
                    $(cell).append($('<a href="javascript:void(0)" class="btn btn-default">View</a>'));

                    $(cell).find('.btn').click((e) => {

                        this.open_order($(e.currentTarget).closest('tr').attr('data-rowid'))
                    });
                }
            }
        ];

        
        return cols;
    }


    display_order_view() {

        //if (this.state.open_order) {

        //    return <ViewOrder order_id={this.state.order_id} owner={this} slidedown={true} />
        //}
    }



    open_order(order_id: any) {
        this.exec_action(WorkflowAction.OpenCard, order_id);        
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

        //ReactDOM.render(<ViewOrder slidedown={!this.editform_opened} owner={this} />, this.root.find('.edit-placeholder')[0]);

    }


    edit_address(rowid: string) {

        var adr = _.find(this.data, d => {
            return d['id'] === rowid;
        });

        //this.scrollToObj('body', 0, 1000);
        
        ReactDOM.unmountComponentAtNode(this.root.find('.edit-placeholder')[0]);

        ReactDOM.render(<ViewOrder order_id={adr} owner={this} slidedown={!this.editform_opened}/>, this.root.find('.edit-placeholder')[0]);

    }


    scrollToObj(target, offset, time) {
        $('html, body').animate({ scrollTop: $(target).offset().top - offset }, time);
    }


    notify(cmd: string, data?: any) {

        switch (cmd) {

            case 'update-list': {

                this.load_data().then(() => {

                    this.internal_init_datatable();

                });

            } break;

            case 'close_card': {

                this.state['re-animate'] = true;

                this.exec_action(WorkflowAction.FetchData);

            } break;
        }

        return Q.resolve(true);
    }
}



interface ViewOrderState extends jx.Views.ReactState {
}
interface ViewOrderProps extends jx.Views.ReactProps {
    order_id: any,
    slidedown?: boolean
}
class ViewOrder extends jx.Views.ReactView {

    props: ViewOrderProps;
    state: ViewOrderState;
    order: any;

    constructor(props: ViewOrderProps) {
        super(props);
        this.state.loading = true;
    }

    render() {

        var __style = {
        }

        if (this.props.slidedown) {
            __style['display'] = 'none';
        }
        

        var html =

            <div className="row commentsForm animated fadeInUp" style={__style} >

                <div className="row" style={{ paddingLeft: 20, paddingRight: 20 }}>

                    <button type="button" className="btn btn-primary btn-back pull-right"><i className="fa fa-times"></i> Refermer</button>

                </div>

                <div className="row" style={{ paddingLeft: 20, paddingRight:20 }}>

                    <br/>

                    <b.Col lg={6} style={{paddingLeft:20, paddingRight:20}} >

                        <BigLabel label="Order code" p_style={{ marginBottom: 15 }} />

                        <p>{this.order ? this.order['number'] : null}</p>

                    </b.Col >

                </div>
                
                <hr />

            </div>

        return html;
    }


    componentDidMount() {

        this.jget('.btn-back').click(() => {

            this.props.owner['notify']('close_card');

        });
        
    }

    //componentWillReceiveProps() {

    //    this.setState(_.extend({}, this.state, {
    //        loading: true
    //    }));

    //}


    //componentDidUpdate() {

    //    if (this.state.loading) {

    //        this.load_order().then(() => {

    //            this.setState(_.extend({}, this.state, {
    //                loading: false
    //            }));
    //        });

    //    } else {

    //        if (this.props.slidedown) {
    //            this.root.slideDown();
    //        }

    //    }
        
    //}


    load_order() {

        var d = Q.defer();

        utils.spin(this.root);

        schema.call({
            fn: 'get',
            params: ['/orders/{0}'.format(this.props.order_id)]
        }).then(res => {

            this.order = res.response;

            d.resolve(true);

        }).finally(() => {
            utils.unspin(this.root);
        });

        return d.promise;
    }
    

    bind_controls() {

        ko.cleanNode(this.root.find('form')[0]);

        if (this.props.order_id) {

            this.root.find('.bfh-countries').val(this.props.order_id['country']);

            ko.applyBindings(this.props.order_id, this.root.find('form')[0]);
        }
    }


    slide_up() {

        this.props.owner['editform_opened'] = false;

        this.root.slideUp();
    }


}


interface TextControlProps extends jx.Views.ReactProps {
    label: string,
    obj: any,
    field: string,
    property?: string,
    type?: string,
    required?: boolean
}
class TextControl extends jx.Views.ReactView {

    props: TextControlProps;

    render() {

        var property = this.props.property ? this.props.property : 'textInput';

        var type = this.props.type ? this.props.type : 'text';

        var _props: any = {
        }

        if (this.props.required) {
            _props.required = true;
        }


        var html =

            <div className="form-group col-sm-6 col-xs-12">

                <label htmlFor="">{this.props.label}</label>

                <input type="text" {..._props} name={this.props.field} data-bind={"{0}:{1}".format(property, this.props.field) }
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

        if (this.props.obj) {
            ko.cleanNode(this.root[0]);
            ko.applyBindings(this.props.obj, this.root[0]);
        }

    }
}
