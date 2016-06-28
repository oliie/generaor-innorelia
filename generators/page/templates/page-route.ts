// Copy route to app.ts and remove it from here.
{
    route: '<%= camelCased %>',
    name: '<%= name %>',
    moduleId: 'App/Views/<%= name %>',
    nav: true,
    title: '<%= spacedWord %>',
    settings: {
        roles: [/* Add roles */]
    }
}

import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';

@autoinject
export class <%= camelCased %> {
    constructor(
        private API: APIService
    ) { }


}