'use strict';

import {expect} from 'mai-chai';
import {Compiler} from '../index.js';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

/******************************************************************************/

describe ('Compiler', () => {
  describe ('build()', () => {
    it ('builds Electrum component from class', () => {
      const compiler = new Compiler ();
      const source = 'class extends React.Component {render () {return <div>Hi.</div>;}}';
      const result = compiler.build ('Foo', source);

      expect (result.component).to.exist ();
      expect (result.component).to.have.property ('displayName', 'Foo');

      const Foo = result.component;
      const html = ReactDOMServer.renderToStaticMarkup (<Foo />);

      expect (html).to.equal ('<div>Hi.</div>');
    });
  });

  describe ('transform()', () => {
    it ('transforms ES2016 to ES2015', () => {
      const compiler = new Compiler ();
      const source = 'const getMessage = () => "hello";';
      const result = compiler.transform (source);

      expect (result).to.equal (
        '"use strict";\n\n' +
        'var getMessage = function getMessage() {\n' +
        '  return "hello";\n' +
        '};');
    });

    it ('JSX produces ES2015 output', () => {
      const compiler = new Compiler ();
      const source = 'const element = <div>hello</div>';
      const result = compiler.transform (source);

      expect (result).to.equal (
        '"use strict";\n\n' +
        'var element = React.createElement(\n' +
        '  "div",\n' +
        '  null,\n' +
        '  "hello"\n' +
        ');');
    });
  });
});

/******************************************************************************/
