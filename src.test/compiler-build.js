'use strict';

import {expect} from 'mai-chai';
import {Compiler} from 'electrum-compiler';

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

    it ('produces \'Unexpected token\' on error', () => {
      const compiler = new Compiler ();
      const source = 'clasx extends React.Component {render () {return <div>Hi.</div>;}}';
      //              0123456
      //                    ^ Unexpected token here
      const result = compiler.build ('Foo', source);

      expect (result.component).to.not.exist ();
      expect (result.error).to.startWith ('unknown: Unexpected token (2:6)');
    });
  });

  describe ('register() and build()', () => {

    class Bar extends React.Component {
      render () {
        return <span>{this.props.message}</span>;
      }
    }

    class Button extends React.Component {
      render () {
        return <div>{this.props.children}</div>;
      }
    }

    const source = 'class extends React.Component {render () {return <Bar message="?"/>;}}';

    it ('builds Electrum component from class, using external component <Bar>', () => {
      const compiler = new Compiler ();
      compiler.register (Bar);

      const Foo = compiler.build ('Foo', source).component;
      const html = ReactDOMServer.renderToStaticMarkup (<Foo />);

      expect (html).to.equal ('<span>?</span>');
    });

    it ('builds Electrum component from class, using external component {\'Bar\', <Bar>}', () => {
      const compiler = new Compiler ();
      compiler.register ('Bar', Bar);

      const Foo = compiler.build ('Foo', source).component;
      const html = ReactDOMServer.renderToStaticMarkup (<Foo />);

      expect (html).to.equal ('<span>?</span>');
    });

    it ('builds Electrum component from class, using external component <Button> and variable \'text\'', () => {
      const source = 'class extends React.Component { render() { return <Button>{text}</Button>; }}';
      const compiler = new Compiler ();
      compiler.register (Button);
      compiler.register ('text', 'Hello');

      const Foo = compiler.build ('Foo', source).component;
      const html = ReactDOMServer.renderToStaticMarkup (<Foo />);

      expect (html).to.equal ('<div>Hello</div>');
    });

    it ('builds Electrum component from class, overriding external component', () => {
      const source = 'class extends React.Component { render() { return <Button message="x"/>; }}';
      const compiler = new Compiler ();
      compiler.register ('Button', Button);

      // Replace Button with <Bar>
      const Foo = compiler.build ('Foo', source, {Button: Bar}).component;
      const html = ReactDOMServer.renderToStaticMarkup (<Foo />);

      expect (html).to.equal ('<span>x</span>');
    });

  });
});

/******************************************************************************/
