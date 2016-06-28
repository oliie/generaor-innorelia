var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting: function () {
        this.prompt([
            {
                type    : 'input',
                name    : 'subgen',
                message: 'Choose: `page`, `filter`, `widget`',
                default: this.appname
            }
        ]).then(function (answer) {
            if (answer.subgen === 'page') {
                this.composeWith("aurelia-ts-pug:page");
            } else if (answer.subgen === 'filter') {
                this.composeWith("aurelia-ts-pug:filter");
            } else if (answer.subgen === 'widget') {
                this.composeWith("aurelia-ts-pug:widget");
            }
        }.bind(this));
    }
})