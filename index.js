var iter = require("iter");
var exec = require("child_process").exec;

module.exports = parallel;
module.exports.run = run;

function parallel (commands, callback) {
  run(iter.parallel, commands, callback);
}

function run (iterator, commands, callback) {
  var errors = undefined;
  var stdouts = [];
  var stderrs = [];

  iterator(commands.length)
    .error(error)
    .done(done)
    .run(each);

  function each (done, i) {
    var cmd = commands[i];
    exec(cmd, function (error, stdout, stderr) {
      if (error) return done(error);

      stdouts[i] = stdout;
      stderrs[i] = stderr;

      done();
    });
  }

  function error (error, i) {
    if (!errors) errors = [];
    errors.push({
      error: error,
      index: i,
      command: commands[i]
    });
  }

  function done () {
    callback(errors, stdouts, stderrs);
  }

}
