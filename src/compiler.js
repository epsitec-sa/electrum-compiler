'use strict';

import React from 'react';
import Electrum from 'electrum';
import {transform} from 'babel-standalone';

/******************************************************************************/

const imports = {
  Electrum,
  React
};

const Babel = {
  transform
};

/******************************************************************************/

export default class Compiler {
  transform (source) {
    try {
      const result = Babel.transform (source, {
        presets: ['stage-0', 'es2015', 'react']
      });
      return result.code;
    } catch (e) {
      console.error (e.message);
    }
  }

  build (name, source) {
    var Electrum = imports.Electrum;
    var React = imports.React;
    var sourceVar =
      Electrum.justToMakeSureThisDoesNotGetOptimizedAway ||
      React.justToMakeSureThisDoesNotGetOptimizedAway ||
      'var foo = \'FOO\';';

    try {
      const input  = `${sourceVar}\nElectrum.wrap ("${name}", (${source}));\n`;
      const output = this.transform (input);
      const result = eval (output); // jshint ignore:line
      return {
        code: output,
        component: result
      };
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.error (e.message);
        return {
          error: e.message
        };
      } else if (e instanceof TypeError) {
        console.error (e.message);
        return {
          error: e.message
        };
      } else {
        throw e;
      }
    }
    return null;
  }
}

/******************************************************************************/
