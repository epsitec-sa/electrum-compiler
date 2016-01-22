'use strict';

import {expect} from 'mai-chai';
import {Compiler} from '../index.js';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import reactElementToJSXString from 'react-element-to-jsx-string';

/******************************************************************************/

describe ('Compiler', () => {
  describe ('eval()', () => {
    it ('evaluates expression and returns the result', () => {
      const compiler = new Compiler ();
      expect (compiler.eval ('3+4')).to.equal (7);
    });

    it ('evaluates JSX and returns the result', () => {
      const compiler = new Compiler ();
      const result = compiler.eval ('<div></div>');
      expect (result).to.equalJSX (<div />);
    });
  });
});

/******************************************************************************/
