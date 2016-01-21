# electrum-compiler

[![NPM version](https://img.shields.io/npm/v/electrum-compiler.svg)](https://www.npmjs.com/package/electrum-compiler)
[![Build Status](https://travis-ci.org/epsitec-sa/electrum-compiler.svg?branch=master)](https://travis-ci.org/epsitec-sa/electrum-compiler)
[![Build status](https://ci.appveyor.com/api/projects/status/olcw73cohae726aw?svg=true)](https://ci.appveyor.com/project/epsitec/electrum-compiler)

This is a run-time compiler for Electrum-enabled React components, based on
**Babel** and relying on [babel-standalone](https://github.com/Daniel15/babel-standalone).

# The Compiler class

## Transform JavaScript to ES2015

```javascript
let input = 'const greet = x => `Hello ${x}.`;';
let compiler = new Compiler ();
let source = compiler.transform (input);
// ES2015 compatible source
```

## Build Electrum-enabled React component

```javascript
let input = 'class extends React.Component { render() { return <div>Hi.</div>; } }';
let compiler = new Compiler ();
let output = compiler.build ('Foo', input);
// Component in output.component
```

If the source code needs to reference external symbols (for instance other
components), they must be registered before calling `build()`:

```javascript
let input = `
class extends React.Component {
  render() {
    return <Button>{text}</Button>;
  }
}`;

let compiler = new Compiler ();

compiler.register (Button);
compiler.register ('text', 'Hello')

let output = compiler.build ('Foo', input);
// Component in output.component
```

The output of `build()` is an object with following properties:

* `name` &rarr; name of the component.
* `code` &rarr; source code used to produce the component.
* `component` &rarr; the component.
* `error` &rarr; the error (if there was an error).

Properties `code` and `component` are only present if the call to `build()`
was successful. Otherwise, the error message is stored in `error`.

Note that the position in the error message will be offset by one line, as
`build()` prepends some code to the given input source.
