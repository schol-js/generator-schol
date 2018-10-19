'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-schol', () => {
  beforeAll(() => {
    helpers.run(path.join(__dirname, '../generators/app'));
  });
  it('creates files', () => {
    assert.file(['package.json', '.gitignore']);
  });
});
