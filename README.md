#TOC

[TOC](http://projects.jga.me/toc/) is a jQuery plugin for automatically generating a table of contents. 

For more information, check out the [documentation](http://projects.jga.me/toc/).

Developing on this project
===

### Install Grunt

From the command line:

1. Install `grunt-cli` globally with `npm install -g grunt-cli`.
2. Navigate to the root `/bootstrap` directory, then run `npm install`. npm will look at [package.json](package.json) and automatically install the necessary local dependencies listed there.

When completed, you'll be able to run the various Grunt commands provided from the command line.

**Unfamiliar with `npm`? Don't have node installed?** That's a-okay. npm stands for [node packaged modules](http://npmjs.org/) and is a way to manage development dependencies through node.js. [Download and install node.js](http://nodejs.org/download/) before proceeding.

### Available Grunt commands

#### Build - `grunt`
Run `grunt` to run tests locally and compile the JavaScript. 

#### Watch - `grunt watch`
This is a convenience method for watching JavaScript files and building them whenever you save.

### Troubleshooting dependencies

Should you encounter problems with installing dependencies or running Grunt commands, uninstall all previous dependency versions (global and local). Then, rerun `npm install`.

### Install Bower Components

#### Install the dependencies listed in the current directory's bower.json

```
bower install
```

### Running Tests

Tests will run automatically with the ```grunt``` commands. Tests are located in the ```/test``` directory.
