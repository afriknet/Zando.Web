define(["require", "exports"], function (require, exports) {
    var Metadata = [];
    function __metadata_exists(entity) {
        var metadata = _.find(Metadata, function (m) {
            return m.entity === entity;
        });
        return metadata != undefined;
    }
    function __build_entity(entity) {
        var meta = _.find(Metadata, function (m) {
            return m.entity === entity;
        });
    }
    var DataSource = (function () {
        function DataSource(url) {
            this.url = url;
        }
        DataSource.prototype.fetch_data = function (entity, where, options) {
            var _this = this;
            if (!__metadata_exists(entity)) {
                return this.fetch_metadata(entity).then(function () {
                    return _this.get(entity, where, options);
                });
            }
            else {
                return this.get(entity, where, options);
            }
        };
        DataSource.prototype.fetch_metadata = function (entity) {
            var d = Q.defer();
            this.get(entity, 'metadata').then(function (meta) {
                Metadata.push({
                    entity: entity,
                    data: meta
                });
                d.resolve(meta);
            });
            return d.promise;
        };
        DataSource.prototype.get = function (entity, where, options) {
            var d = Q.defer();
            var __url = this.url + entity;
            $.ajax({
                type: 'POST',
                url: __url,
                data: {
                    method: 'get',
                    entity: entity,
                    where: where,
                    options: options
                },
                dataType: 'json',
                cache: false,
                success: function (res) {
                    d.resolve(res);
                },
                error: function (err) {
                    d.reject(err);
                }
            });
            return d.promise;
        };
        DataSource.prototype.build_entity = function (entity, values) {
            var obj = __build_entity(entity);
        };
        return DataSource;
    })();
    exports.DataSource = DataSource;
});
//# sourceMappingURL=C:/afriknet/afriknet.bigbag/afriknet.bigbag/js/lib/server.js.map