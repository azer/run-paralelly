var run = require("../");

it('runs given commands paralelly', function(done){
  run(['cat test/foo', 'node test/err.js', 'node notexisting.js', 'cat test/bar'], function (errors, stdouts, stderrs) {
    expect(errors.length).to.equal(1);
    expect(errors[0].command).to.equal('node notexisting.js');

    expect(stdouts[0]).to.equal('this is foo\nand this is second line\n');
    expect(stdouts[1]).to.equal('');
    expect(stdouts[2]).to.not.exist;
    expect(stdouts[3]).to.equal('this is bar\nand second line at bar\nbye\n:)\n');

    expect(stderrs[1]).to.equal('I just exit with error');
    done();
  });
});
