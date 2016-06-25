// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


export module DataSchema {

    export class DataObj {

        constructor(values: any) {
            _.extend(this, values);
        }

    }


    export interface BaseData {

        objectId?: string
        ownerId?: string
        created?: Date
        updated?:Date
    }

    

    export interface Product extends BaseData {
        title: string
        stock_status: number
        sale_price: number
        sku: string
        stock_level: number
        slug: string
        require_shipping: boolean
        price: number
        description
    }


    

}