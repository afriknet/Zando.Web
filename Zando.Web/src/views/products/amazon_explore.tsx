// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import React = require('react');
import ReactDOM = require('react-dom');
import jx = require('../../lib/jx');

import rdx = require('../../lib/redux/reducers');
import fl = require('../../lib/redux/workflow');
import gn = require('../../lib/redux/generic_workflow');
import { BigLabel, BigLabelProps, Modal, ModalProps} from '../../lib/controls';



interface AmazonExploreState extends jx.Views.ReactState {
    item_imgs: any[],
    items:any[]
}



interface BrowseNode_Real {
    Ancestors?: BrowseNode_Fake[],
    BrowseNodeId: number[],
    Name: string[],
    IsCategoryRoot?: number[]
}


interface BrowseNode_Fake {
    BrowseNode: BrowseNode_Real[]
}


interface BrowseNode_Flatten {
    KeyId: number,
    ParentId: number,
    Name: string,
    IsRoot: boolean
}


export class AmazonExplore extends jx.Views.ReactView {

    constructor(props?: any) {
        super(props);
        this.state.item_imgs = [];
    }


    selected_search_index: any;


    state: AmazonExploreState;


    get sideBar():AmazonSideBar{
        return this['__sidebar']
    }


    get searchBox(): AmazonSearchBox {
        return this['__searchbar']
    }


    render() {

        var html =

            <div className="productsContent">

                <LightSection />

                <section className="mainContent clearfix animated fadeInUp">

                    <div className="container">

                        <div className="row">

                            <AmazonSideBar owner={this} items={this.state.items} />

                            <div className="col-md-9 col-sm-8 col-xs-12">

                                {/*
                                <div className="row filterArea" style={{ width:'100%' }}>

                                    {this.display_search_indexes()} 
                                    
                                </div>
                                */}

                                <AmazonSearchBox owner={this} />

                                <br />

                                <div className="col-xs-12 items-list" style={{ padding: 0 }}>
                                    <AmazonGridList owner={this} items={this.state.item_imgs} />
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        return html;
    }


    componentDidMount() {

        super.componentDidMount();

        //this.root.find('.btn-index').css('width','!inherited');
    }


    search_item(keyword: string) {

        aws.call({
            fn: 'itemSearch',
            params: [{
                SearchIndex: this.selected_search_index,
                Keywords: keyword,
                responseGroup: 'Images,ItemAttributes,BrowseNodes', 
                //sort: 'salesrank',
                domain: 'webservices.amazon.fr',
            }]
        }).then(res => {

            if (res.response && $.isArray(res.response)) {
                this.populate_with_items(res.response as any);
            }

        }).fail(err => {


        });
    }


    populate_with_items(items: any[]) {

        var data = _.filter(items, itm => {
            return itm['LargeImage'] != undefined;
        });

        var images = _.map(data, d => {
            return {
                img_url: d['LargeImage'][0].URL[0]
            }
        })

        this.setState(_.extend(this.state, {
            item_imgs: images,
            items: data
        }));

    }


    display_search_indexes() {

        var indexes_views = _.map(Object.keys(AmazonExplore.searchIndex), index => {

            var val = AmazonExplore.searchIndex[index];

            return <button className="btn btn-default btn-index" type="button"
                        onClick={this.onClick.bind(this)}
                        style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10, width: 'inherit' }}>
                            <span data-index-val={val} style={{ textTransform:'none' }} >{index}</span>
                   </button>
        });


        return <div role="group" className="btn-group">
                    {indexes_views}        
               </div> 
    }


    onClick(e: Event) {

        var btn = $(e.currentTarget);

        this.root.find('.btn-index').removeClass('active');

        this.selected_search_index = $(btn).find('[data-index-val]').attr('data-index-val');

        $(btn).addClass('active');

    }



    static searchIndex = {

        "Vêtements et accessoires": "Apparel",

        'Bagages': 'Luggage',

        'Beauté et Parfum': 'Beauty',

        'Bijoux': 'Jewelry',

        'Bébés': 'Baby',

        'Chaussures et Sacs': 'Shoes',

        'High-Tech': 'Electronics',

        'Informatique': 'PCHardware',

        'Montres': 'Watches',

        'Musique ': 'Music'
    }

}



class LightSection extends jx.Views.ReactView {

    render() {

        var html =
            <section className="lightSection clearfix pageHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="page-title">
                                <h2 style={{ textTransform:'none' }}>Explore amazon products</h2>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <ol className="breadcrumb pull-right">
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li className="active">
                                    Amazon
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>;

        return html;
    }
}




interface AmazonSideBarProps extends jx.Views.ReactProps {
    items:any[]
}

interface AmazonBarState extends jx.Views.ReactState {
    flatten_list: BrowseNode_Flatten[],
    build_menu_hierarchy: boolean
}

class AmazonSideBar extends jx.Views.ReactView {

    props: AmazonSideBarProps;
    state: AmazonBarState;

    menus_updating: boolean;

    constructor(props?: jx.Views.ReactProps) {
        super(props);
        props.owner['__sidebar'] = this;
        this.state.flatten_list = [];
    }


    render() {

        var count: number = 0;

        var html = 
            <div className="col-md-3 col-sm-4 col-xs-12 sideBar">
                <div className="panel panel-default">
                    <div className="panel-heading">Product categories</div>
                    <div className="panel-body">
                        <div className="collapse navbar-collapse navbar-ex1-collapse navbar-side-collapse">
                            <ul className="nav navbar-nav side-nav nodes">
                                {this.build_menus()}                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default priceRange">
                    <div className="panel-heading">Filter by Price</div>
                    <div className="panel-body clearfix">
                        <div className="price-slider-inner">
                            <span className="amount-wrapper">
                                Price:
                                <input type="text" readOnly id="price-amount-1" />
                                <strong>-</strong>
                                <input type="text" readOnly id="price-amount-2" />
                            </span>
                            <div id="price-range" />
                        </div>
                        <input type="submit" defaultValue="Filter" className="btn btn-default" />
                        {/* <span class="priceLabel">Price: <strong>$12 - $30</strong></span> */}
                    </div>
                </div>
                <div className="panel panel-default filterNormal">
                    <div className="panel-heading">filter by Color</div>
                    <div className="panel-body">
                        <ul className="list-unstyled">
                            <li><a href="#">Black<span>(15) </span></a></li>
                            <li><a href="#">White<span>(10) </span></a></li>
                            <li><a href="#">Red<span>(7) </span></a></li>
                            <li><a href="#">Blue<span>(12) </span></a></li>
                            <li><a href="#">Orange<span>(12) </span></a></li>
                        </ul>
                    </div>
                </div>
                <div className="panel panel-default filterNormal">
                    <div className="panel-heading">filter by Size</div>
                    <div className="panel-body">
                        <ul className="list-unstyled clearfix">
                            <li><a href="#">Small<span>(15) </span></a></li>
                            <li><a href="#">Medium<span>(10) </span></a></li>
                            <li><a href="#">Large<span>(7) </span></a></li>
                            <li><a href="#">Extra Large<span>(12) </span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        
        return html;

    }


    build_menus() {

        var count: number = 0;

        if (!this.state.flatten_list || this.state.flatten_list.length === 0) {

            return _.map([
                ["Vetements et accessoires", 'Apparel'],
                ["Auto et Moto"],
                ["Bijoux"],
                ["Chaussures et Sacs"],
                ["Hightech"],
                ["Informatique"],
                ["Montres"]], menu => {
                    return this.build_li(menu, count++);
                })

        } else {

            var root_nodes = _.filter(this.state.flatten_list, f => {

                return f.IsRoot;
            });

            var menus = _.map(root_nodes, root => {
                return this.build_li([root.Name], count++); 
            });


            return menus;

        }
    }


    add_submenus(menu: string) {

        var sub = <ul className="collapse collapseItem" id={menu}>
            <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Accessories <span>(6) </span></a></li>
            <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bag <span>(6) </span></a></li>
            <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Cloths <span>(25) </span></a></li>
            <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Bed &amp; Bath <span>(2) </span></a></li>
            <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Swimming costume <span>(5) </span></a></li>
            <li><a href="#"><i aria-hidden="true" className="fa fa-caret-right" />Sport Tops &amp; Shoes <span>(3) </span></a></li>
        </ul>

        return sub;
    }


    build_li(values: any[], menu_count: number) {
        
        var menu = 'menu-{0}'.format(menu_count);

        var searchIndex = values.length > 1 ? values[1] : '';

        var li =
            <li data-menu={menu}>

                <a className="node-link" data-searchindex={searchIndex} data-menucount={menu_count} data-target={"#submenu-{0}".format(menu_count) } data-toggle="collapse" href="javascript:void(0)">
                    <span>
                        <span className="fa fa-hand-o-right arrow-right hidden" style={{ marginRight: 10 }} /><span>{values[0]}</span>
                    </span>
                    <i className="fa fa-plus" />
                </a>
                {this.add_submenus("submenu-{0}".format(menu_count)) }
            </li>

        return li;
    }


    componentDidMount() {

        this.jget('.nodes li').first().addClass('active');

        this.jget('.nodes li .arrow-right').first().removeClass('hidden');

        var that = this;

        this.jget('.node-link').click((e) => {

            this.jget('.nodes li').remove('active');

            $(e.currentTarget).closest('li').addClass('active');

            this.jget('.node-link .arrow-right').addClass('hidden');

            $(e.currentTarget).find('.arrow-right').removeClass('hidden');

            var menucount = $(e.currentTarget).attr('data-menucount');

            that.jget('.collapse.in').removeClass('in');

            $('.submenu-{0}'.format(menucount)).addClass('in');

        });

        this.state.build_menu_hierarchy = false;

        this.store_menus_hierarchy();
    }


    componentDidUpdate() {

        if (this.state.build_menu_hierarchy) {

            this.store_menus_hierarchy();

        } else {

            this.state.build_menu_hierarchy = true;
        }
    }


    get_active_searchIndex() {
        var index = 'Apparel,Books'; //this.jget('li.active .node-link').attr('data-searchindex')
        return index;
    }


    store_menus_hierarchy() {

        function add_flatten_node(flatten_list: BrowseNode_Flatten[], base_fake_node: BrowseNode_Fake, is_root?: boolean) {

            var base_real_node: BrowseNode_Real = base_fake_node.BrowseNode[0];
            
            var node_flatten: BrowseNode_Flatten = {
                KeyId: base_real_node.BrowseNodeId[0],
                Name: base_real_node.Name[0],
                ParentId: undefined,
                IsRoot: false
            }

            flatten_list.push(node_flatten);

            if (is_root) {

                node_flatten.IsRoot = true;

                return;

            }

            if ($.isArray(base_real_node.Ancestors) && (base_real_node.Ancestors.length > 0)) {

                var parent_fake_node: BrowseNode_Fake = base_real_node.Ancestors[0];

                var parent_real_node = parent_fake_node.BrowseNode[0];

                node_flatten.ParentId = parent_real_node.BrowseNodeId[0]

                if (!parent_real_node.IsCategoryRoot) {

                    add_flatten_node(flatten_list, parent_fake_node);

                } else {

                    var fake_root_node = parent_real_node.Ancestors[0];

                    add_flatten_node(flatten_list, fake_root_node, true)
                    
                }
                
            }
        }

        var tmp_flatten_list: BrowseNode_Flatten[] = [];

        _.each(this.props.items, item => {

            var base_fake_node: BrowseNode_Fake = item.BrowseNodes[0];

            add_flatten_node(tmp_flatten_list, base_fake_node);

        });


        var flatten_list: BrowseNode_Flatten[] = [];

        _.each(tmp_flatten_list, node => {

            var found = _.find(flatten_list, _n => {

                return _n.KeyId === node.KeyId

            }) != undefined;

            if (!found) {

                flatten_list.push(node);
            }

        });

        tmp_flatten_list = undefined;

        this.state.build_menu_hierarchy = false;

        this.setState(_.extend(this.state, {

            flatten_list: flatten_list,
            
        } as AmazonBarState));
    }
    
}



class AmazonSearchBox extends jx.Views.ReactView {

    constructor(props?: jx.Views.ReactProps) {
        super(props);
        props.owner['__searchbar'] = this;
    }

    render() {

        var html =

            <div className="row">
                
                <div id="custom-search-input">

                    <div className="form-group col-xs-12" style={{ padding: 0 }}>                        

                        <div className="inner-addon right-addon">

                            <i className="glyphicon glyphicon-search text-primary pointer" style={{ marginTop: 6, fontSize: 18 }}/>

                            <input type="text" placeholder="Search" className="form-control ie-no-clear search-query" style={{ padding: 10 }} />

                        </div>

                    </div>
                    
                </div>

            </div>
            
        
        return html;
    }


    componentDidMount() {

        this.jget('input').css('padding', '10px!important');
        
        this.jget('.glyphicon-search').click(() => {
            this.search_items();
        });
        
    }


    search_items() {

        this.props.owner['search_item'](this.jget('.search-query').val());
        
    }
}




interface AmazonGridListProps extends jx.Views.ReactProps {
    items:any[]
}
class AmazonGridList extends jx.Views.ReactView {

    props: AmazonGridListProps;

    constructor(props: AmazonGridListProps) {
        super(props);
    }


    render_item(item: any) {

        //className="col-xs-12"

        var html =
            <div className="col-sm-4 col-xs-12">
                <div className="productBox">
                    <div className="productImage clearfix img-thumbnail" style={{ height: 300 }}>
                        <div style={{ display: 'table', height: 300 }}>
                            <div style={{ display: 'table-cell', verticalAlign: 'middle'}}>
                                <img alt="products-img" className="" src={item['img_url']} style={{ display: 'inline-block', verticalAlign: 'middle' }} /> 
                            </div>                            
                        </div>
                        
                        <div className="productMasking">
                            <ul role="group" className="list-inline btn-group">
                                <li><a className="btn btn-default" href=".login-modal" data-toggle="modal"><i className="fa fa-heart" /></a></li>
                                <li><a className="btn btn-default" href="cart-page.html"><i className="fa fa-shopping-cart" /></a></li>
                                <li><a href=".quick-view" data-toggle="modal" className="btn btn-default"><i className="fa fa-eye" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="productCaption clearfix">
                        <a href="#">
                            <h5 className="item-title">Nike Sportswear</h5>
                        </a>
                        <h3>$199</h3>
                    </div>
                </div>
            </div>

        return html;
    }


    render() {

        var html =
            <div className="col-xs-12" style={{ padding:0 }}>
                <div className="row filterArea">
                    <div className="col-xs-6">
                        <select className="select-drop" id="guiest_id1" name="guiest_id1">
                            <option value="0">Default sorting</option>
                            <option value="1">Sort by popularity</option>
                            <option value="2">Sort by rating</option>
                            <option value="3">Sort by newness</option>
                            <option value="4">Sort by price</option>
                        </select>
                    </div>
                    <div className="col-xs-6">
                        <div role="group" className="btn-group pull-right">
                            <button className="btn btn-default active" type="button"><i aria-hidden="true" className="fa fa-th" /><span>Grid</span></button>
                            <button className="btn btn-default" type="button"><i aria-hidden="true" className="fa fa-th-list" /><span>List</span></button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {_.map(this.props.items, itm => {
                        return this.render_item(itm);
                    })}
                </div>
            </div>


        return html;
    }


    componentDidMount() {

        //this.fix_img_vertical_align()
    }


    componentDidUpdate() {

        //this.fix_img_vertical_align()
        
    }


    fix_img_vertical_align() {

        _.each($('[alt="products-img"]'), img => {

            var img_height = $(img).outerHeight(true);

            var outer_height = $(img).closest('.productImage').outerHeight(true);

            //$(img).closest('.productBox').find('.item-title').html('img_height:{0}, outer_height:{1}'.format(img_height, outer_height))

            //if (img_height < outer_height ) {

            //    var diff = (outer_height - img_height) / 3;

            //    var top = (diff / outer_height) * 100;

            //    $(img).css('position', 'relative');

            //    $(img).css('top', '{0}%'.format(top));

            //    $(img).closest('.productBox').find('.item-title').html('img_height:{0}, outer_height:{1}, diff:{2}, top:{3}'.format(img_height, outer_height, diff, top))
            //}

        });
    }

}