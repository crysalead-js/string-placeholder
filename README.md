# string-placeholder

[![Build Status](https://travis-ci.org/crysalead-js/string-placeholder.png?branch=master)](https://travis-ci.org/crysalead-js/string-placeholder)

A small library that replaces some variable placeholders into a string template.

## API

### Replacing some variable placeholders

```php
t('My name is ${name} and I am ${age} years old.', {
  name: 'Bob',
  age: '65'
});
```
