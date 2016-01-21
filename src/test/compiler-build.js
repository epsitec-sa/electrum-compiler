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
});

/******************************************************************************/
