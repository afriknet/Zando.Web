

interface MetadataInfo {
    entity: string,
    data:any
}


var Metadata: MetadataInfo[] = [];


function __metadata_exists(entity: string) {

    var metadata = _.find(Metadata, m => {

        return m.entity === entity

    });
    
    return metadata != undefined;
}


function __build_entity(entity: string) {

    var meta = _.find(Metadata, m => {
        return m.entity === entity;
    });



}



export class DataSource {

    private url: string

    constructor(url: string) {

        this.url = url;
    }


    fetch_data(entity: string, where?: any, options?: any): Q.Promise<any> {
        
        if (!__metadata_exists(entity)) {

            return this.fetch_metadata(entity).then(() => {

                return this.get(entity, where, options);

            });

        } else {

            return this.get(entity, where, options);
        }        
    }


    fetch_metadata(entity: string): Q.Promise<any> {

        var d = Q.defer();

        this.get(entity, 'metadata').then(meta => {

            Metadata.push({
                entity: entity,
                data: meta
            });

            d.resolve(meta);
        });
        
        return d.promise;

    }
    

    private get(entity: string, where: any, options?: any): Q.Promise<any> {

        var d = Q.defer();

        var __url = this.url + entity ;

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
            success: res => {

                d.resolve(res);

            },

            error: err => {

                d.reject(err);

            }
            
        });

        return d.promise;

    }


    build_entity(entity: string, values: any) {

        var obj = __build_entity(entity);

    }
}