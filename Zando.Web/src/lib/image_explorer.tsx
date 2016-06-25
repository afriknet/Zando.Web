/// <reference path="controls.tsx" />
/// <reference path="jx.tsx" />
/// <reference path="imageload.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');
var b = require('react-bootstrap');
import jx = require('./jx');
import img = require('./imageload');
import ctrls = require('./controls');



export interface ImageExplorerProps extends jx.Views.ReactProps {
    productid: string,
    load_data: () => Q.Promise<any>
}
export class ImageExplorer extends jx.Views.ReactView {

    props: ImageExplorerProps;
    images: any[];

    constructor(props: ImageExplorerProps) {
        super(props);
        this.state.loading = true;
        this.images = [];
    }



    render() {

        if (this.state.loading) {
            return <div style={{ minHeight:300 }}></div>
        }

        var images = ["/server/images/product-1.jpg", "/server/images/product-1.jpg","/server/images/product-2.jpg"];

        var that = this;

        var html = <div className="mt10" style={{ maxHeight:840 }}>

                        <b.Row >
                            <b.Col xs={12}>
                                <b.Button id="btn-open-dz" bsStyle="info" onClick={() => { that.open_dropzone() } }>Upload new image</b.Button>
                                <b.Button id="btn-close-dz" bsStyle="warning" className="ml10 hidden" onClick={() => { that.close_dropzone() } }><ctrls.Ficon icon="times" ></ctrls.Ficon> close</b.Button>
                            </b.Col>

                            <b.Col xs={12} className="image-dropzone" style={{ display: 'none' }}>
                                <div className="mt10">
                                    <img.ImageLoader on_file_added={ (file) => { return that.on_img_added(file) } } />
                                </div>

                            </b.Col>

                        </b.Row>

                        <hr />

                        <b.Row>
                            <b.Col xs={12}>
                                <ImageList owner={this} images={this.images} />
                            </b.Col>
                        </b.Row>

                   </div>      

        return html;
    }


    componentDidMount() {

        super.componentDidMount();

        if (this.state.loading) {
            this.load_images();
        }
    }


    componentDidUpdate() {

        if (this.state.loading) {
            this.load_images();
        }
    }



    load_images() {

        utils.spin(this.root);

        this.props.load_data().then(data => {

            this.images = data;

            this.setState({
                loading: false
            });

        }).finally(() => {

            utils.unspin(this.root);

        });

    }



    on_img_added(file: img.ImageFileInfo): Q.Promise<any> {

        var d = Q.defer();

        var model = Backendless.Persistence.of('images');

        var defaults = {
            filename: file.name,
            is_main: false,
            productid: this.props.productid
        }

        var img = null;// ko['mapping'].toJS( meta.toEntity('images', defaults));

        model.save(img, new Backendless.Async(res => {

            this.setState({
                loading: true
            });

            d.resolve(true);

        }, err => {

            d.reject(err);
        }));


        return d.promise;
    }


    set_main_image(objectId: string) {

        var d = Q.defer();

        utils.spin(this.root);

        this.unset_previous().then(() => {

            this.set_main(objectId).then(() => {
                
                this.setState({
                    loading: true
                });

                utils.unspin(this.root);
                
            });

        });

        return d.promise;
    }


    set_main(objectId: string) {

        var d = Q.defer();

        var model = Backendless.Persistence.of('images');
        
        model.findById(objectId, new Backendless.Async(res => {

            res['is_main'] = true;

            model.save(res, new Backendless.Async(res1 => {
                d.resolve(true);
            }));

        }));

        return d.promise;

    }


    unset_previous() {

        var d = Q.defer();

        var model = Backendless.Persistence.of('images');

        var qry = new Backendless.DataQuery();

        qry.condition = "(is_main=true)";

        model.find(qry, new Backendless.Async( (res:any) => {

            if (res.data.length > 0) {

                var prev = res.data[0];

                prev['is_main'] = false;

                model.save(prev, new Backendless.Async(res1 => {
                    d.resolve(true);
                }));

            } else {

                d.resolve(true);
            }

        }));

        return d.promise;
    }


    unset_main_image() {

        var d = Q.defer();

        utils.spin(this.root);

        this.unset_previous().then(() => {

            this.setState({
                loading: true
            });

        }).finally(() => {

            utils.unspin(this.root);
        });

        return d.promise;
    }


    remove_image(objectId: string) {

        var d = Q.defer();

        var model = Backendless.Persistence.of('images');

        utils.spin(this.root);

        model.findById(objectId, new Backendless.Async(res => {
            
            model.remove(res, new Backendless.Async(res1 => {

                this.setState({
                    loading: true
                });

                d.resolve(true);

            }, err1 => {

                utils.unspin(this.root);

                d.reject(err1);

            }));

        }, err => {

            utils.unspin(this.root);

            d.reject(err);

        }));

        return d.promise;
    }



    open_dropzone() {
        this.root.find('.image-dropzone').slideDown();
        this.root.find('#btn-close-dz').removeClass('hidden');
    }


    close_dropzone() {
        this.root.find('.image-dropzone').slideUp();
        this.root.find('#btn-close-dz').addClass('hidden');
    }
}



export interface ImageListProps extends jx.Views.ReactProps {
    images: any[]
}
export class ImageList extends jx.Views.ReactView {

    props: ImageListProps;

    constructor(props: ImageListProps) {
        super(props);
    }

    //img_id={_.result(img, 'is_main') } is_main={_.result(img, 'is_main') } img_url={img_url}

    render() {

        var html=   <b.Row>

                        { _.map(this.props.images, (img: any) => {

                                var img_url = '/server/images/{0}'.format(_.result(img,'filename'));

                                return <div data-img-id={_.result(img, 'objectId') }>
                                            <ImageThumbnail owner={this} img_obj={img} img_url={img_url}  />
                                        </div>
                        })}
                        
                    </b.Row>   



        return html;

    }

    

    on_img_checked(id: string) {        
        this.props.owner['set_main_image'](id);
    }


    on_img_unchecked(id: string) {
        this.props.owner['unset_main_image'](id);        
    }


    on_img_remove(id: string) {
        this.props.owner['remove_image'](id);
    }
}




export interface ImageThumbnailProps extends jx.Views.ReactProps{
    img_obj:any
    //img_id: string,
    img_url: string,
    //is_main: boolean
}
export class ImageThumbnail extends jx.Views.ReactView {

    props: ImageThumbnailProps;

    constructor(props: ImageThumbnailProps) {
        super(props);
    }

    get is_main(): boolean {
        return _.result(this.props.img_obj, 'is_main') as any
    }

    render() {
        

        var check_props: ctrls.CheckBoxProps = {
            is_checked: this.is_main,
            onchecked: (id) => {
                this.on_img_checked(id)
            },
            onunchecked: (id) => {
                this.on_img_unchecked(id);
            }
        }


        var html = <div className="col-lg-3 col-md-4 col-xs-6 thumb" >
            
                        <a className="thumbnail" href="#">
                            <img className="img-responsive" src={this.props.img_url} alt="" />
                        </a>


                        <div className="pull-right actions" style={{ display:'none' }}>
                            <b.Button bsStyle="default" bsSize="xs" className="btn-remove"><ctrls.Ficon icon="times"></ctrls.Ficon> delete </b.Button>
                        </div>    


                        <div className="pull-left info">

                            <div style={{ display: 'table' }}>

                                <div style={{ display: 'table-cell' }}>
                                    <ctrls.CheckBox {...check_props} />
                                </div>

                                <div style={{ display: 'table-cell', paddingLeft: 10 }}>

                                    <div className={"img-caption {0}".format(this.set_is_main()) }>
                                        is main
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                        
                   </div>


        return html;

    }


    set_is_main() {

        return this.is_main ? null : 'hidden'
    }


    on_img_checked(id: string) {    

        (this.props.owner as ImageList).on_img_checked(id);        
    }


    on_img_unchecked(id: string) {

        (this.props.owner as ImageList).on_img_unchecked(id);        
    }


    componentDidMount() {

        super.componentDidMount();

        this.root.hover(() => {
            this.root.find('.actions').fadeIn();            
        }, () => {
            this.root.find('.actions').fadeOut();            
        });


        this.root.find('.btn-remove').click(() => {

            (this.props.owner as ImageList).on_img_remove(_.result(this.props.img_obj, 'objectId') as any);
        });

    }

}