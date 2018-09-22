'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const DEFAULT_TEMPLATE = 'schol-template-default';
const DEFAULT_CITATION_STYLE = 'apa-5th-edition';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this._template = DEFAULT_TEMPLATE;
    this._citationStyle = DEFAULT_CITATION_STYLE;
  }
  // No prompts yet...
  // prompting() {
  //   // Have Yeoman greet the user.
  //   this.log(
  //     yosay(`Welcome to the tremendous ${chalk.red('generator-schol-template-default')} generator!`)
  //   );

  //   const prompts = [
  //     {
  //       type: 'confirm',
  //       name: 'someAnswer',
  //       message: 'Would you like to enable this option?',
  //       default: true
  //     }
  //   ];

  //   return this.prompt(prompts).then(props => {
  //     // To access props later use this.props.someAnswer;
  //     this.props = props;
  //   });
  // }

  writing() {
    this.fs.copyTpl(this.templatePath('scholfile.yaml'), this.destinationPath('scholfile.yaml'), {
      template: this._template,
      citationStyle: this._citationStyle
    });

    this.fs.copyTpl(this.templatePath('scholfile.yaml'), this.destinationPath('scholfile.yaml'), {
      // Just defaults for now.
      template: 'schol-template-default'
      citationStyle: 'apa-5th-edition'
    });
  }

  install() {
    this.installDependencies();
  }

  end() {
    // Grab template document(s) from template package
    this.fs.copyTpl(require.resolve('')this.destinationPath('scholfile.yaml'), this.destinationPath('node_modulesscholfile.yaml'), {
      // Just defaults for now.
      template: 'schol-template-default'
      citationStyle: 'apa-5th-edition'
    });
  }
};
