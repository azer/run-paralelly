var iter = require("iter").parallel;
var exec = require("child_process").exec;

module.exports = run;

function run (commands, callback) {
  var errors = undefined;
  var stdouts = [];
  var stderrs = [];

  iter(commands.length)
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
