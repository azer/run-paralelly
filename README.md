## run-paralelly

Run given commands as child processes paralelly

See also [run-serially](http://github.com/azer/run-paralelly)

## Install

```bash
$ npm install run-serially
```

## Usage

```js
run = require('run-paralelly')

run(['apt-get install foo', 'apt-get install bar', 'just fail'], function (errors, stdouts, stderrs) {
  if (errors) {
    errors[0]
    // => { command: 'just fail', index: 2, error: 'Command not found: "just fail"' }
  }

  stdouts[0]
  // => "Installed foo"

  stderrs[0]
  // ''

  stderrs[1]
  // => "bar not found in package registry"
})
```
