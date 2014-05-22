jQuery.hash
=====
The jQuery plugin for manipulating with hash in url address

Usage
-----
### Set value of a hash key
Structure:
```
/**
 * @param {String} key The hash key will be set value
 * @param {String|Number} value The value of key
 */
$.hash.set(key, value);
```

Example:
```
$.hash.set('name', 'bobkhin');
```

### Set value of hash keys
Structure:
```
/**
 * @param {Object} set The set of pair of key and value
 */
$.hash.set({
	key1: value1,
	key2: value2,
	key3: value3,
	...
});
```

Example:
```
$.hash.set({
	name: 'bobkhin',
	skype: 'ducdhm',
	email: 'ducdhm@gmail.com',
	age: 24
});
```

### Get value of a hash key
Structure:
```
/**
 * @param {String} key The hash key will be got
 * @returns {String|Number|Undefined} The value of hash key
 */
$.hash.get(key)
```

Example:
```
$.hash.get('name'); // return `bobkhin`
```

### Get value of all hash keys
Structure:
```
/**
 * @return {Object}
 */
$.hash.getAll();
```

### Remove hash key(s)
Structure:
```
/**
 * @param {String|Array} key The key or array of keys will be removed from hash
 */
$.hash.remove(key);
```

Example:
```
$.hash.remove('age');

// or

$.hash.remove(['skype', 'email']);
```
License
-----
### MIT License

Copyright (c) 2014 Duc Doan Hoang Minh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.