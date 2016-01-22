'use strict';

import {expect} from 'mai-chai';
import {Compiler} from '../index.js';

/******************************************************************************/

describe ('Compiler', () => {
  describe ('catalog', () => {
    it ('by default returns a read-only empty object', () => {
      const compiler = new Compiler ();
      expect (compiler.catalog).to.deep.equal ({});
      expect (compiler.catalog).to.be.frozen ();
    });

    it ('returns a read-only point in time copy of the registered components', () => {
      const compiler = new Compiler ();
      const a = {x: 1};
      compiler.register ('a', a);
      const catalog1 = compiler.catalog;
      expect (catalog1).to.equal (compiler.catalog);
      expect (catalog1).to.be.frozen ();
      expect (catalog1).to.contain.property ('a');
      expect (catalog1.a).to.have.property ('x', 1);
    });

    it ('returns a new catalog whenenver it changes', () => {
      const compiler = new Compiler ();
      const a = {x: 1};
      const b = {y: 2};
      compiler.register ('a', a);
      const catalog1 = compiler.catalog;
      compiler.register ('b', b);
      const catalog2 = compiler.catalog;
      expect (catalog1).to.contain.property ('a');
      expect (catalog1).to.not.contain.property ('b');
      expect (catalog2).to.equal (compiler.catalog);
      expect (catalog2).to.be.frozen ();
      expect (catalog2).to.contain.property ('a');
      expect (catalog2).to.contain.property ('b');
      expect (catalog2.a).to.have.property ('x', 1);
      expect (catalog2.b).to.have.property ('y', 2);
    });
  });
});

/******************************************************************************/
