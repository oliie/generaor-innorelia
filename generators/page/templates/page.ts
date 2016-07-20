// Copy route to app.ts and remove it from here.
{
    route: '<%= camelCased %>',
    name: '<%= camelCased %>',
    moduleId: 'App/Views/<%= name %>',
    nav: true/false,
    title: '<%= spacedWord %>',
    settings: {
        role: // Add role
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