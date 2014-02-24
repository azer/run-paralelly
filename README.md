## run-paralelly

Run given commands as parallel processes

```js
run = require('run-paralelly')

run(['apt-get install foo', 'apt-get install bar', 'just fail', 'apt-get install qux'], function (errors, stdouts, stderrs) {
  if (errors) {
    errors[0]
    // => { command: 'just fail', index: 2, error: 'Command not found: "just fail"' }
  }

  stdouts[0]
  // => "Installed foo"

  stderrs[0]
  // undefined

  stderrs[1]
  // => "bar not found in package registry"
})
```

## Install

```bash
$ npm install run-paralelly
```
