/// <reference path="../../lib/jx.tsx" />
/// <reference path="../../../typings/react/react.d.ts" />
/// <reference path="../../../typings/react/react-dom.d.ts" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'react', 'react-dom', '../../lib/jx'], function (require, exports, React, ReactDOM, jx) {
    var HomePage = (function (_super) {
        __extends(HomePage, _super);
        function HomePage(props) {
            _super.call(this, props);
            this.featured = [];
        }
        HomePage.prototype.render = function () {
            return React.createElement("div", {"id": "home-page", "className": "hidden"});
        };
        HomePage.prototype.componentDidMount = function () {
            var _this = this;
            this.root.load('/html/home.html', function () {
                ReactDOM.render(React.createElement(FeaturedProductItemList, null), $('.featured-products')[0]);
                _this.root.removeClass('hidden');
            });
        };
        return HomePage;
    })(jx.Views.HomePage);
    exports.HomePage = HomePage;
    var FeaturedProductItemList = (function (_super) {
        __extends(FeaturedProductItemList, _super);
        function FeaturedProductItemList(props) {
            _super.call(this, props);
            this.state.loading = true;
        }
        FeaturedProductItemList.prototype.render = function () {
            var html = React.createElement("div", {"className": "owl-carousel featuredProductsSlider"}, this.fill_with_products());
            return html;
        };
        FeaturedProductItemList.prototype.fill_with_products = function () {
            var count = 0;
            var views = _.map(this.items, function (prod) {
                return React.createElement(FeaturedProductItem, {"product": prod, "ref": "product-no-{0}".format(++count)});
            });
            return views;
        };
        FeaturedProductItemList.prototype.componentDidMount = function () {
            var _this = this;
            this.set_dimensions();
            this.load_featured_items().then(function () {
                _this.setState(_.extend(_this.state, {
                    loading: false
                }));
            });
        };
        FeaturedProductItemList.prototype.set_dimensions = function () {
            $('.current-cart').attr('data-gotox', $('.current-cart').offset().left);
            $('.current-cart').attr('data-gotoy', $('.current-cart').offset().top);
            $('.current-cart').attr('data-width', $('.current-cart').width() / 2);
            $('.current-cart').attr('data-height', $('.current-cart').height() / 2);
        };
        FeaturedProductItemList.prototype.componentDidUpdate = function () {
            var owl = $('.owl-carousel.featuredProductsSlider');
            owl['owlCarousel']({
                loop: true,
                margin: 28,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplayHoverPause: true,
                nav: true,
                moveSlides: 4,
                dots: false,
                responsive: {
                    320: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    }
                }
            });
        };
        FeaturedProductItemList.prototype.load_featured_items = function () {
            var _this = this;
            var d = Q.defer();
            schema.call({
                fn: 'get',
                params: ['/products', {
                        where: { active: true },
                        limit: 8
                    }]
            }).then(function (res) {
                _this.items = res.response.results;
                d.resolve(true);
            }).finally(function () {
                utils.unspin(_this.root);
            });
            return d.promise;
        };
        return FeaturedProductItemList;
    })(jx.Views.ReactView);
    var FeaturedProductItem = (function (_super) {
        __extends(FeaturedProductItem, _super);
        function FeaturedProductItem(props) {
            _super.call(this, props);
        }
        FeaturedProductItem.prototype.render = function () {
            var that = this;
            var html = React.createElement("div", {"className": "slide"}, React.createElement("div", {"className": "productImage clearfix"}, this.fill_in_images(), React.createElement("div", {"className": "productMasking"}, React.createElement("ul", {"className": "list-inline btn-group", "role": "group"}, React.createElement("li", null, React.createElement("a", {"data-toggle": "modal", "href": ".login-modal", "className": "btn btn-default"}, React.createElement("i", {"className": "fa fa-heart"}))), React.createElement("li", null, React.createElement("a", {"href": "javascript:void(0)", "onClick": function () { that.add_to_cart(); }, "className": "btn btn-default rippler rippler-inverse"}, React.createElement("i", {"className": "fa fa-shopping-cart"}))), React.createElement("li", null, React.createElement("a", {"data-toggle": "modal", "href": ".quick-view", "className": "btn btn-default"}, React.createElement("i", {"className": "fa fa-eye"})))))), React.createElement("div", {"className": "productCaption clearfix"}, React.createElement("a", {"href": "/"}, React.createElement("h5", null, this.props.product['name'])), React.createElement("h3", {"data-decimal": this.props.product['price']}, "€{0}".format(this.props.product['price']))));
            return html;
        };
        FeaturedProductItem.prototype.componentDidMount = function () {
            this.root.find('img').css({
                'max-height': '285px',
                'max-width': '264px',
                'width': 'auto',
                'height': 'auto'
            });
            this.root.find(".rippler")['rippler']({
                effectClass: 'rippler-effect',
                effectSize: 0 // Default size (width & height)
                ,
                addElement: 'div' // e.g. 'svg'(feature)
                ,
                duration: 400
            });
        };
        FeaturedProductItem.prototype.add_to_cart = function () {
            //this.root.find('.fa-shopping-cart').addClass('faa-burst animated fa-4x faa-fast');
            //setTimeout(() => {
            //    this.root.find('.fa-shopping-cart').removeClass('faa-burst animated fa-4x faa-fast');
            //}, 800);
        };
        FeaturedProductItem.prototype.fill_in_images = function () {
            if (!this.props.product.images || this.props.product.images.length === 0) {
                return React.createElement("img", {"src": "/img/home/featured-product/product-13.jpg", "alt": "featured-product-img"});
            }
            var url = this.props.product.images[0].file.url;
            return React.createElement("img", {"src": url, "alt": "featured-product-img"});
        };
        return FeaturedProductItem;
    })(jx.Views.ReactView);
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/views/home/home.js.map