/// <reference path="jx.tsx" />
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX


import React = require('react');
import ReactDOM = require('react-dom');

import jx = require('./jx');

declare var Dropzone;


export interface ImageFileInfo {
    name: string,
    size: number,
    type: string,
    status?: boolean,
    error?: string;
}
export interface ImageLoaderPorps extends jx.Views.ReactProps {
    on_file_added?: (file: ImageFileInfo) => Q.Promise<any>
}
export class ImageLoader extends jx.Views.ReactView {

    dropzone: any;
    props: ImageLoaderPorps;
    files: Array<ImageFileInfo>;

    constructor(props: ImageLoaderPorps) {
        super(props);
        this.files = [];
    }

    render() {

        var html = <div className="row">
                        <div className="col-lg-12">
                            <form action="hn_fileupload.ashx" name="upload-file" className="dropzone" id="dropzone" />
                        </div>
                   </div> 


        return html;

    }


    componentDidMount() {

        super.componentDidMount();

        var __url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

        __url = '{0}/hn_fileupload.ashx'.format(__url);

        Dropzone.autoDiscover = false;

        var $drop:any = this.root.find('.dropzone');

        var that = this;

        this.dropzone = $drop.dropzone({

            withCredentials: true,

            url: __url,

            init: function () {

                this.on('addedfile', (file: ImageFileInfo) => {
                    that.add_file(file);
                });

                this.on('success', (file: ImageFileInfo) => {
                    file['previewElement'].classList.add("dz-success");
                    that.file_uploaded(file);
                });

                this.on('canceled', (files: ImageFileInfo[]) => {

                });

                this.on('complete', (args) => {

                });

            }

        });
    }


    private add_file(file: ImageFileInfo) {

        var files: any = this.files;

        var found: boolean = _.find(files, (f: ImageFileInfo) => {
            return f.name === file.name;
        }) != undefined;

        if (!found) {

            var _file: ImageFileInfo = {
                name: file.name,
                size: file.size,
                type: file.type
            }

            this.files.push(_file);

            if (this.props.on_file_added) {
                this.props.on_file_added(_file);
            }
        }
   }


    private file_uploaded(file: ImageFileInfo) {

        var files: any = this.files;

        var f: any = _.find(files, (fl:any) => {
            return fl.name === file.name;
        });
        
        f.status = true;
    }

}

