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

        var promptViewName = {
            type    : 'input',
            name    : 'name',
            message : 'Provide view name (ex: my-view)',
            default : this.appname // Default to current folder name
        }

        var promptSass = {
            type    : 'confirm',
            name    : 'sass',
            message : 'Would you like to provide a SASS-file?'
        }

        !hasArgument && prompts.push(promptViewName);
        prompts.push(promptSass);

        this.prompt(prompts).then(function (answers) {
            answers.name = hasArgument ? this.arguments[0] : answers.name;

            var destinationPath = 'src/App/Views/' + answers.name;

            this.fs.copyTpl(
                this.templatePath('view.pug'),
                this.destinationPath(destinationPath + '.pug'),
                { spacedWord: nameConventions.spacedWords(answers.name) }
            );

            this.fs.copyTpl(
                this.templatePath('view.ts'),
                this.destinationPath(destinationPath + '.ts'),
                {
                    name: answers.name,
                    camelCased: nameConventions.camelCased(answers.name),
                    spacedWord: nameConventions.spacedWords(answers.name)
                }
            );

            if (answers.sass) {
                this.fs.copyTpl(
                    this.templatePath('view.scss'),
                    this.destinationPath('src/Sass/Views/_' + answers.name + '.scss')
                );
            }

            done();
        }.bind(this));
    }
})