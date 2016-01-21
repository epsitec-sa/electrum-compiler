'use strict';

import {expect} from 'mai-chai';
import {Compiler} from '../index.js';

describe ('Compiler', () => {
  describe ('compile()', () => {
    it ('accepts source code', () => {
      const compiler = new Compiler ();
      expect (compiler.compile ()).to.exist ();
    });
  });
});
