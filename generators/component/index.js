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

        var promptComponentName = {
            type    : 'input',
            name    : 'name',
            message : 'Provide component name (ex: my-component)',
            default : this.appname // Default to current folder name
        }

        var promptFiles = {
            type    : 'input',
            name    : 'files',
            message : 'Choose one of following: ts, pug, both',
            default : this.appname
        }

        var promptSass = {
            type    : 'confirm',
            name    : 'sass',
            message : 'Would you like to provide a SASS-file?'
        }

        !hasArgument && prompts.push(promptComponentName);
        prompts.push(promptFiles, promptSass);

        this.prompt(prompts).then(function (answers) {
            answers.name = hasArgument ? this.arguments[0] : answers.name;
            var destinationPath = 'src/App/Components/' + answers.name;
            var self = this;

            function provideTs() {
                self.fs.copyTpl(
                    self.templatePath('component.ts'),
                    self.destinationPath(destinationPath + '.ts'),
                    {
                        camelCased: nameConventions.camelCased(answers.name)
                    }
                );
            }

            function providePug() {
                self.fs.copyTpl(
                    self.templatePath('component.pug'),
                    self.destinationPath(destinationPath + '.pug'),
                    { }
                );
            }

            function provideBoth() {
                provideTs();
                providePug();
            }

            if (answers.files === 'ts') {
                provideTs();
            } else if (answers.files === 'pug') {
                providePug();
            } else {
                provideBoth();
            }

            if (answers.sass) {
                this.fs.copyTpl(
                    this.templatePath('component.scss'),
                    this.destinationPath('src/Sass/Components/' + nameConventions.camelCased(answers.name) + '.scss')
                );
            }

            done();
        }.bind(this));
    }
})