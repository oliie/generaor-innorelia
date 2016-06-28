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
                this.composeWith("innorelia:page");
            } else if (answer.subgen === 'filter') {
                this.composeWith("innorelia:filter");
            } else if (answer.subgen === 'widget') {
                this.composeWith("innorelia:widget");
            }
        }.bind(this));
    }
})