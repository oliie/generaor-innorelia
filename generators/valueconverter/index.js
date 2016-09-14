var generators = require('yeoman-generator');
var nameConventions = require('../../NameConventions.js');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
    },

    prompting: function () {
        var prompts = [];
        var done = this.async();
        var hasArgument = !!this.arguments[0];

        var promptValueConverterName = {
            type    : 'input',
            name    : 'name',
            message : 'Provide ValueConverters name (ex: reversed-text)',
            default : this.appname // Default to current folder name
        }

        !hasArgument && prompts.push(promptValueConverterName);

        this.prompt(prompts).then(function (answers) {
            answers.name = hasArgument ? this.arguments[0] : answers.name;

            var destinationPath = 'src/App/ValueConverters/' + answers.name;

            this.fs.copyTpl(
                this.templatePath('valueconverter.ts'),
                this.destinationPath(destinationPath + '.ts'),
                { camelCased: nameConventions.camelCased(answers.name) }
            );

            done();
        }.bind(this));
    }
})