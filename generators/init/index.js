'use strict';
const Generator = require('yeoman-generator');
// Const chalk = require('chalk');
// const yosay = require('yosay');
const path = require('path');
const dateformat = require('dateformat');

const DEFAULT_TEMPLATE = 'schol-template-default';
const DEFAULT_CITATION_STYLE = 'apa-5th-edition';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this._template = DEFAULT_TEMPLATE;
    this._citationStyle = DEFAULT_CITATION_STYLE;
  }

  writing() {
    // Extend or create package.json file in destination path
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    // Add any templates
    // For now, just the default
    var pkg = {
      dependencies: {}
    };
    pkg.dependencies[this._template] = '*';
    this.fs.extendJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.npmInstall();
  }

  end() {
    // Copy starter document(s) from template package
    var starters = path.resolve(
      path.dirname(require.resolve(this._template)),
      'starters'
    );
    this.fs.copyTpl(starters, this.destinationPath('src'), {
      template: this._template,
      citationStyle: this._citationStyle,
      date: dateformat('isoDate')
    });
  }
};
