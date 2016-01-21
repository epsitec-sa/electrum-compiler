# electrum-compiler

Run-time compiler for Electrum-enabled React components.

# The Compiler class

## Transform JavaScript to ES2015

```javascript
let compiler = new Compiler ();
let source = compiler.transform ('const greet = x => `Hello ${x}.`;')
// ES2015 compatible source
```

## Build Electrum-enabled React component

```javascript
let compiler = new Compiler ();
let output = compiler.build ('Foo', 'class extends React.Component { render() { return <div>Hi.</div>; } }');
// Component in output.component
```
