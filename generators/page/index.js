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

        var promptPageName = {
            type    : 'input',
            name    : 'name',
            message : 'Provide page name (ex: my-page)',
            default : this.appname // Default to current folder name
        }

        var promptRoute = {
            type    : 'confirm',
            name    : 'route',
            message : 'Would you like to provide a route?'
        }

        var promptSass = {
            type    : 'confirm',
            name    : 'sass',
            message : 'Would you like to provide a SASS-file?'
        }

        !hasArgument && prompts.push(promptPageName);
        prompts.push(promptRoute, promptSass);

        this.prompt(prompts).then(function (answers) {
            answers.name = hasArgument ? this.arguments[0] : answers.name;

            var destinationPath = 'src/App/Views/' + answers.name;

            this.fs.copyTpl(
                this.templatePath('page.pug'),
                this.destinationPath(destinationPath + '.pug'),
                { spacedWord: nameConventions.spacedWords(answers.name) }
            );

            this.fs.copyTpl(
                this.templatePath(answers.route ? 'page-route.ts' : 'page.ts'),
                this.destinationPath(destinationPath + '.ts'),
                {
                    name: answers.name,
                    camelCased: nameConventions.camelCased(answers.name),
                    spacedWord: nameConventions.spacedWords(answers.name)
                }
            );

            if (answers.sass) {
                this.fs.copyTpl(
                    this.templatePath('page.scss'),
                    this.destinationPath('src/Sass/Views/' + answers.name + '.scss')
                );
            }

            done();
        }.bind(this));
    }
})