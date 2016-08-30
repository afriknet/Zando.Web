// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../../lib/jx');


interface BrowseNode {
    BrowseNodeId: string,
    Name: string,
    AncestorId?: string
}


var pl20 = { paddingLeft: 20 };

declare var noUiSlider;


interface ProductGridFiltersState extends jx.Views.ReactState {    
}
export class ProductGridFilters extends jx.Views.ReactView {


    state: ProductGridFiltersState;


    render() {
        
        var html =

            <div className="col-sm-3">

                <PriceFilter title="Prix" owner={this} />

                <div className="filter-sidebar">
                    <div className="title"><span>Enabled Filters</span></div>
                    <ul>
                        <li>Categories: T-Shirts <a href="#" className="remove-filter"><i className="fa fa-remove" /></a></li>
                        <li>Availability: In Stock <a href="#" className="remove-filter"><i className="fa fa-remove" /></a></li>
                        <li>Brand: Brand Name 1 <a href="#" className="remove-filter"><i className="fa fa-remove" /></a></li>
                    </ul>
                </div>

                <CategoriesFilters title="Categories" owner={this} />

                <BrandsFilter title="Marques" owner={this} />
                
                <div className="filter-sidebar hidden">
                    <div className="title"><span>Size</span></div>
                    <ul>
                        <li>
                            <div className="checkbox" style={pl20}><input type="checkbox" id="SCheckbox" /><label htmlFor="SCheckbox">S (11) </label></div>
                        </li>
                        <li>
                            <div className="checkbox" style={pl20}><input type="checkbox" id="MCheckbox" /><label htmlFor="MCheckbox">M (12) </label></div>
                        </li>
                        <li>
                            <div className="checkbox" style={pl20}><input type="checkbox" id="LCheckbox" /><label htmlFor="LCheckbox">L (13) </label></div>
                        </li>
                        <li>
                            <div className="checkbox" style={pl20}><input type="checkbox" id="XLCheckbox" /><label htmlFor="XLCheckbox">XL (14) </label></div>
                        </li>
                    </ul>
                </div>

            </div>

        return html;

    }


    componentDidMount() {

        super.componentDidMount();
        
    }
    
}




interface BaseGridFilterProps extends jx.Views.ReactProps {
    title: string
}

interface BaseGridFilterState extends jx.Views.ReactState {    
}
class BaseGridFilter extends jx.Views.ReactView {

    props: BaseGridFilterProps;
    state: BaseGridFilterState;

    render() {
        
        var html =
            <div className="filter-sidebar">
                <div className="title"><span>{this.props.title}</span></div>
                {this.get_content()} 
            </div>

        return html;
    }


    get_content() {

        return null;
    }

}


interface BrandsFilterState extends BaseGridFilterState {
    brands: any[]
}
class BrandsFilter extends BaseGridFilter {

    state: BrandsFilterState;


    get_content() {

        var html: any = _.map(this.state.brands, brand => {

            var _id = 'cb-{0}'.format(utils.guid());

            var view =
                <li>
                    <div className="checkbox" key={utils.guid() } style={pl20}><input type="checkbox" id={_id }
                        defaultValue="checked" />
                        <label htmlFor={_id}>{brand}</label>
                    </div>
                </li>

            return view;
        });


        return <ul>{html}</ul>;
    }


    componentDidMount() {

        super.componentDidMount();

        jx.pubsub.subscribe(jx.constants.subpub.products_grid.on_products_loaded, (msg, data) => {

            this.build_filters(data);

        });
    }


    build_nodes_tree(nodes: any[], child: BrowseNode, tree: any[]) {

        _.each(nodes, node => {

            if (node['Brand']) {

                tree.push(node['Brand'][0]);
            }

        });
    }


    build_filters(input_data: any[]) {

        var _data: any[] = [];

        _.each(input_data, d => {
            this.build_nodes_tree(d['ItemAttributes'], null, _data);
        });

        _data = _.uniq(_data, false, (d, key) => {
            return d
        });

        this.setState(_.extend(this.state, {
            brands: _data
        }));

    }

}


interface CategoriesFiltersState extends BaseGridFilterState {
    categories: any[]
}
class CategoriesFilters extends BaseGridFilter {
    
    state: CategoriesFiltersState;


    get_content() {

        var html: any = _.map(this.state.categories, cat => {

            var _id = 'cb-{0}'.format(utils.guid());

            var view =
                <li>
                    <div className="checkbox" key={utils.guid()} style={pl20}><input type="checkbox" id={_id }
                        defaultValue="checked" />
                        <label htmlFor={_id}>{cat.Name}</label>
                    </div>
                </li>

            return view;
        });


        return <ul>{html}</ul>;
    }


    componentDidMount() {

        super.componentDidMount();

        jx.pubsub.subscribe(jx.constants.subpub.products_grid.on_products_loaded, (msg, data) => {

            this.build_filters(data);

        });
    }


    build_nodes_tree(nodes: any[], child: BrowseNode, tree: BrowseNode[]) {

        _.each(nodes, node => {

            var stop = (node['IsCategoryRoot'] && node['IsCategoryRoot'][0] === 1);

            if (!stop) {

                var obj = node['BrowseNode'][0];

                var info: BrowseNode = {
                    BrowseNodeId: obj['BrowseNodeId'][0],
                    Name: obj['Name'][0]
                }

                tree.push(info);

                if (child) {
                    child.AncestorId = info.BrowseNodeId;
                }

                if (obj['Ancestors']) {

                    var ancestors: any[] = obj['Ancestors'];

                    this.build_nodes_tree(ancestors, info, tree);
                }
            }
        });
    }


    build_filters(data: any[]) {

        var tree: BrowseNode[] = [];

        _.each(data, d => {
            this.build_nodes_tree(d['BrowseNodes'], null, tree);
        });

        var roots = _.filter(tree, t => {
            return !t.AncestorId
        });


        roots = _.uniq(roots, false, (d, key) => {
            return d['Name']
        });

        this.setState(_.extend(this.state, {
            categories: roots
        }));

    }
    
}


class PriceFilter extends BaseGridFilter {

    min_val: number;
    max_val: number;
    initialized: boolean;

    get_content() {

        var html: any =
            <div>
                <div id="range-value">Range: <span id="min-price" /> - <span id="max-price" /></div>
                <input type="hidden" name="min-price" defaultValue="" />
                <input type="hidden" name="max-price" defaultValue="" />
                <div className="price-range">
                    <div id="price" />
                </div>
            </div>


        return html;
    }

    componentDidMount() {

        super.componentDidMount();

        this.initialized = false;

        jx.pubsub.subscribe(jx.constants.subpub.products_grid.on_products_loaded, (msg, data) => {

            if (!this.initialized) {

                this.initialized = true;

                this.initialize_slider(data);

            }
            
        });
    }


    initialize_slider(data: any[]) {

        var base = 50;
        var _min = 10;

        var el_price: any = this.root.find('#price')[0];
        
        var _max = data.length > 0 ? _.max(data, d => {
            return d['price']
        }) : { price: base }

        _max = _max ? _max['price'] : 100;
        
        _max = Math.round(_max);

        if (_max < base) {
            _max = base;
        } else {

            var new_max = Math.floor(_max / base) * base;

            var decimal_part = _max % base;

            _max = new_max;

            if (decimal_part > 0)
            {
                _max += base;
            }            
        }

        this.min_val = _min;
        this.max_val = _max;


        if (el_price['noUiSlider']) {

            el_price['noUiSlider']['updateOptions']({
                behaviour: 'hover-snap',
                range: {
                    'min': 0,
                    'max': _max
                }
            });

        } else {

            noUiSlider.create(el_price, {
                start: [_min, _max],
                connect: true,
                behaviour: 'hover-snap',
                range: {
                    'min': 0,
                    'max': _max
                }
            });

        }

        
        el_price.noUiSlider.off('update');
        el_price.noUiSlider.on('update', (values, handle) => {
            
            var value = values[handle];

            if (handle) {
                $('#max-price').text(Math.round(value) + ' $');
                $('input[name="max-price"]').text(Math.round(value));                
            } else {
                $('#min-price').text(Math.round(value) + ' $');
                $('input[name="min-price"]').text(Math.round(value));                
            }
            
        });


        el_price.noUiSlider.off('change');
        el_price.noUiSlider.on('change', (values, handle) => {

            if (handle) {
                this.max_val = Math.round(values[handle])
            } else {
                this.min_val = Math.round(values[handle])
            }
            

            jx.pubsub.publish(jx.constants.subpub.products_grid.on_filter_applied, {
                type: jx.constants.subpub.products_grid.filter_price_range,
                min: Math.round(values[0]),
                max: Math.round(values[1])
            });
        });
    }
}