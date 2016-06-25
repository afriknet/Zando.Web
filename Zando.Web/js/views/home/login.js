// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../lib/jx'], function (require, exports, jx) {
    var LoginPage = (function (_super) {
        __extends(LoginPage, _super);
        function LoginPage() {
            _super.apply(this, arguments);
        }
        LoginPage.prototype.render = function () {
            return null;
        };
        LoginPage.prototype.componentDidMount = function () {
            var _this = this;
            $('#page-content').load('/html/login.html', function () {
                _this.init_actions();
            });
        };
        LoginPage.prototype.init_actions = function () {
            var _this = this;
            var that = this;
            this.root.find('.btn-login').click(function () {
                if (that.root.find('form').valid()) {
                    utils.spin(that.root);
                    var _email = _this.root.find('[type="email"]').val();
                    var _pass = _this.root.find('[type="password"]').val();
                    _this.app.login(_email, _pass).then(function (usr) {
                        toastr.success('Logged in successfully');
                        _this.app.router.navigate('/');
                    }).fail(function (err) {
                        toastr.error(err.message);
                    }).finally(function () {
                        utils.unspin(that.root.find('form'));
                    });
                }
            });
        };
        return LoginPage;
    })(jx.Views.HomePage);
    exports.LoginPage = LoginPage;
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/views/home/login.js.map