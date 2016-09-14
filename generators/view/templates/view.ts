// Copy route to app.ts and remove it from here.
{
    route: '<%= camelCased %>',
    name: '<%= camelCased %>',
    moduleId: 'App/Views/<%= name %>',
    nav: true/false,
    title: '<%= spacedWord %>',
    settings: {
        role: // Add role {int}
    }
}

import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/api-service';

@autoinject
export class <%= camelCased %> {
    // Variables goes here

    constructor(
        private API: APIService
    ) { }

}