import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';

@autoinject
export class <%= camelCased %> {
    constructor(
        private API: APIService
    ) { }

    canActivate() {
        return this.API.isTokenValid();
    }
}