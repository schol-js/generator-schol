'use strict';
const Generator = require('yeoman-generator');
const path = require('path');

const DEFAULT_TEMPLATE = 'schol-template-default';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this._template = opts.template || DEFAULT_TEMPLATE;
  }

  writing() {
    // Npm clobbers .gitignore files when publishing, so needs to be renamed
    this.fs.copy(
      this.templatePath('.gitignore.torename'),
      this.destinationPath('.gitignore')
    );
    // Extend or create package.json file in destination path
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    // Add any templates
    var pkg = {
      dependencies: {}
    };
    pkg.dependencies[this._template] = 'latest';
    this.fs.extendJSON(this.destinationPath('package.json'), pkg);
  }

  install() {
    this.npmInstall();
  }

  end() {
    // Copy starter src document(s) from template package
    var templatePath = path.dirname(
      require.resolve(this._template, { paths: [this.destinationPath()] })
    );
    this.fs.copyTpl(path.resolve(templatePath, '../src'), this.destinationPath('src'));
  }
};
