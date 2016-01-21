'use strict';

import {expect} from 'mai-chai';
import {Compiler} from '../index.js';

/******************************************************************************/

describe ('Compiler', () => {
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
