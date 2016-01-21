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
  constructor () {
    this._items = {};
  }

  transform (source) {
    const result = Babel.transform (source, {
      presets: ['stage-0', 'es2015', 'react']
    });
    return result.code;
  }

  build (name, source) {
    var Electrum = imports.Electrum;
    var React = imports.React;
    var components = this._items;
    var sourceVar =
      components.justToMakeSureThisDoesNotGetOptimizedAway ||
      Electrum.justToMakeSureThisDoesNotGetOptimizedAway ||
      React.justToMakeSureThisDoesNotGetOptimizedAway ||
      '';

    for (let key of Object.keys (components)) {
      sourceVar = sourceVar + `const ${key} = components.${key};`;
    }

    try {
      // In this scope, we need Electrum, React, components and sourceVar.
      // They are referenced from within the source code passed to eval and
      // must therefore exist in the scope.
      const input  = `${sourceVar}Electrum.wrap ("${name}", (\n${source}));`;
      const output = this.transform (input);
      const result = eval (output); // jshint ignore:line
      return {
        name: name,
        component: result,
        code: output
      };
    } catch (e) {
      if (e instanceof SyntaxError || e instanceof TypeError) {
        return {
          error: e.message,
          name: name
        };
      }
      throw e;
    }
  }

  register (item) {
    if (typeof item === 'function') {
      this._items[item.name] = item;
    } else if (typeof item === 'string' &&
        arguments.length === 2) {
      this._items[item] = arguments[1];
    } else {
      throw new Error ('Invalid arguments');
    }
  }
}

/******************************************************************************/
