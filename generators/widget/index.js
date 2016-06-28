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

        var promptWidgetName = {
            type    : 'input',
            name    : 'name',
            message : 'Provide widget name (ex: my-widget)',
            default : this.appname // Default to current folder name
        }

        var promptFiles = {
            type    : 'input',
            name    : 'files',
            message : 'Choose one of following `ts`, `pug`, `both`',
            default : this.appname
        }

        var promptSass = {
            type    : 'confirm',
            name    : 'sass',
            message : 'Would you like to provide a SASS-file?'
        }

        !hasArgument && prompts.push(promptWidgetName);
        prompts.push(promptFiles, promptSass);

        this.prompt(prompts).then(function (answers) {
            answers.name = hasArgument ? this.arguments[0] : answers.name;
            var destinationPath = 'src/App/Widgets/' + answers.name;
            var self = this;

            function provideTs() {
                self.fs.copyTpl(
                    self.templatePath('widget.ts'),
                    self.destinationPath(destinationPath + '.ts'),
                    {
                        camelCased: nameConventions.camelCased(answers.name)
                    }
                );
            }

            function providePug() {
                self.fs.copyTpl(
                    self.templatePath('widget.pug'),
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
                    this.templatePath('widget.scss'),
                    this.destinationPath('src/Sass/Widgets/' + nameConventions.camelCased(answers.name) + '.scss')
                );
            }

            done();
        }.bind(this));
    }
})