var commander = require("commander");
var grunt = require("grunt");
var _ = require("lodash");
var async = grunt.util.async;

var cli = module.exports;

var list = function(question, cb) {
  var choices = _.map(question.choices, function(val) {
    if (_.isString(val)) {
      return val;
    }
    return val.name;
  });

  grunt.log.writeln(question.message);
  commander.choose(choices, function(i) {
    cb(null, {
      name: question.name,
      value: question.choices[i].value || question.choices[i]
    });
  });
};

var input = function(question, cb) {
  commander.prompt(question.message + " (default \"" + question.default + "\") ", function(value) {
    if (!value.length) {
      value = question.default;
    }
    cb(null, {
      name: question.name,
      value: value
    });
  });
};

cli.questionPrompt = function prompt(questions, cb) {
  async.mapSeries(questions, function(question, done) {
    if (question.type === "list") {
      list(question, done);
    } else {
      input(question, done);
    }
  }, cb);
};

