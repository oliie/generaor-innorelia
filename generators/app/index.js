var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting: function () {
        this.prompt([
            {
                type    : 'input',
                name    : 'subgen',
                message: 'Choose: component, service, valueconverter, view',
                default: this.appname
            }
        ]).then(function (answer) {
            if (answer.subgen === 'view') {
                this.composeWith("innorelia:view");
            } else if (answer.subgen === 'valueconverter') {
                this.composeWith("innorelia:valueconverter");
            } else if (answer.subgen === 'component') {
                this.composeWith("innorelia:component");
            }
        }.bind(this));
    }
})