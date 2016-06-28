import { autoinject } from 'aurelia-framework';

@autoinject
export class <%= camelCased %>CustomAttribute {
    constructor(
        private: element: Element
    ) { }
}