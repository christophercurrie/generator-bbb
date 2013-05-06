/**
 * BBB generator for Yeoman
 */

"use strict";
var util = require("util");
var path = require("path");
var _ = require("lodash");
var grunt = require("grunt");
var BBBGenerator = require("../base/bbb-generator");
var BBBCli = require("../base/cli");

/**
 * Module exports
 */

module.exports = Generator;

/**
 * BBB Generator constructor
 * Extend Yeoman base generator
 * Launch packages manager once the installation ends
 */

function Generator(args, options, config) {
  BBBGenerator.apply(this, arguments);
}

util.inherits(Generator, BBBGenerator);

/**
 * Command prompt questions
 * Extend defaults and options based on user answers
 */

Generator.prototype.askFor = function askFor() {
  var done = this.async();

  console.log(
    "\n    .-~0~-." +
    "\n   /   ___ \\ " +
    "\n   |  ( _ )|       ~~ Backbone-Boilerplate ~~" +
    "\n .-' (C) (C)`-  Welcome to the project generator" +
    "\n   |   .---.           Have a good time!" +
    "\n   |  / .-. \\ " +
    "\n   |  \\ `-' / " +
    "\n   |   `---'" +
    "\n __|_______|___ \n"
  );

  var questions = [];

  !this.bbb.name && questions.push({
    name: "name",
    message: "Your project name:",
    default: this.appname // Default to current folder name
  });

  !this.bbb.testFramework && questions.push({
    name: "testFramework",
    type: "list",
    message: "Which test framework do you want to use?",
    choices: [ "QUnit", "Mocha", "Jasmine" ],
    default: 1
  });

  !this.bbb.packageManager && questions.push({
    name: "packageManager",
    type: "list",
    message: "Which package manager do you want to use?",
    choices: [ "Jam", "Bower", "None" ],
    default: 1
  });

  !this.bbb.indent && questions.push({
    name: "indent",
    type: "list",
    message: "What about indentation?",
    choices: [{
      name: "Spaces (2)",
      value: {
        type: "space",
        qte: 2
      }
    }, {
      name: "Spaces (4)",
      value: {
        type: "space",
        qte: 4
      }
    }, {
      name: "Tab",
      value: {
        type: "tab"
      }
    }],
    default: 1
  });

  BBBCli.questionPrompt(questions, function (err, props) {
    if (err) {
      return this.emit("error", err);
    }

    _.each(props, function(prop) {
      this.bbb[prop.name] = prop.value;
    }, this);

    this.pkg.name = this.bbb.name;

    done();
  }.bind(this));
};

/**
 * Save the current configuration inside `.bbbrc` files so sub-generator can use it too
 */

Generator.prototype.saveConfig = function saveConfig() {
  this.dest.write(".bbb-rc.json", this.helper.normalizeJSON(this.bbb));
};
