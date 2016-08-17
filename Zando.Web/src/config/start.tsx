// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

import { Application } from "../lib/jx";

declare var Schema;

export function start() {

    Application.InitApplication();

}


start();