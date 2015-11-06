# string-placeholder

[![Build Status](https://travis-ci.org/crysalead-js/string-placeholder.png?branch=master)](https://travis-ci.org/crysalead-js/string-placeholder)

A small library that replaces placeholders from string templates.

## API

### Replacing some variable placeholders

```js
template('My name is ${name} and I am ${age} years old.', {
  name: 'Bob',
  age: '65'
});
// My name is Bob and I am 65 years old.
```

or by using an array:

```js
template('My name is ${0} and I am ${1} years old.', ['Bob', '65']);
// My name is Bob and I am 65 years old.
```

### Cleaning placeholders

Using the `'clean'` option cleans up undefined placeholders.

```js
template('Choose between: ${a}, ${b} or ${c}.', { a: 'option1' }, { clean: true });
// Choose between: option1.
```

You can configure the regular expression matching gaps with the `'gap'` option.


### Custom placeholders

The placeholder delimiters can be configured through the `'before'` and `'after'` options like the following:

```js
template('My name is [:name] and I am [:age] years old.', {
  name: 'Bob',
  age: '65'
}, {
  before: '[:',
  after: ']'
});
// My name is Bob and I am 65 years old.
```

### Escape char

By default the escape char is `'\\'` but you can configure it using the `'espace'` option.
